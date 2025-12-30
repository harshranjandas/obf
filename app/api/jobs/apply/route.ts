import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import { jobs } from '@/lib/jobs';

export const runtime = 'nodejs';

const sesClient = new SESClient({
  region: process.env.S3_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

const DEFAULT_FROM_EMAIL = process.env.JOB_APPLICATION_FROM || 'arun@t9l.com';
const DEFAULT_RECIPIENTS =
  process.env.JOB_APPLICATION_FALLBACK_RECIPIENTS?.split(',')
    .map((email) => email.trim())
    .filter(Boolean) ?? ['arun@t9l.com'];

const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];

const escapeHtml = (value?: string | number | null): string => {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const formatField = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : '';

async function uploadFile(file: File, folder: string = 'job-applications') {
  const extension = `.${file.name.split('.').pop()?.toLowerCase() || ''}`;
  if (
    !ALLOWED_TYPES.includes(file.type) &&
    !ALLOWED_EXTENSIONS.includes(extension)
  ) {
    throw new Error(
      'Invalid file type. Allowed formats: PDF, DOC, DOCX, PPT, PPTX.'
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File exceeds the 30MB size limit.');
  }

  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const key = `${folder}/${uuidv4()}-${sanitizedName}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const putCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET || 't9l',
    Key: key,
    Body: buffer,
    ContentType: file.type || 'application/octet-stream',
  });

  await s3Client.send(putCommand);

  const getCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET || 't9l',
    Key: key,
  });

  const downloadUrl = await getSignedUrl(s3Client, getCommand, {
    expiresIn: 7 * 24 * 60 * 60,
  });

  return {
    downloadUrl,
    fileName: file.name,
    size: file.size,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobId = formatField(formData.get('jobId'));
    if (!jobId) {
      return NextResponse.json(
        { error: 'Missing job reference' },
        { status: 400 }
      );
    }

    const fullName = formatField(formData.get('fullName'));
    const email = formatField(formData.get('email'));
    const contactNumber = formatField(formData.get('contactNumber'));
    const noticePeriod = formatField(formData.get('noticePeriod'));
    const currentLocation = formatField(formData.get('currentLocation'));
    const currentCompany = formatField(formData.get('currentCompany'));
    const portfolioUrl = formatField(formData.get('portfolioUrl'));

    // Validate all required fields
    if (!fullName) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    if (!contactNumber) {
      return NextResponse.json(
        { error: 'Contact number is required.' },
        { status: 400 }
      );
    }

    if (!currentCompany) {
      return NextResponse.json(
        { error: 'Current company is required.' },
        { status: 400 }
      );
    }

    if (!noticePeriod) {
      return NextResponse.json(
        { error: 'Notice period is required.' },
        { status: 400 }
      );
    }

    // Validate notice period matches allowed values
    const validNoticePeriods: readonly string[] = [
      'Immediate Joining',
      '15 Days',
      '30 Days',
      'Over 30 Days',
    ];
    if (!validNoticePeriods.includes(noticePeriod)) {
      return NextResponse.json(
        { error: 'Invalid notice period selected.' },
        { status: 400 }
      );
    }

    if (!currentLocation) {
      return NextResponse.json(
        { error: 'Current location is required.' },
        { status: 400 }
      );
    }

    if (!portfolioUrl) {
      return NextResponse.json(
        { error: 'Portfolio/Website URL is required.' },
        { status: 400 }
      );
    }

    // Validate portfolio URL format
    try {
      new URL(portfolioUrl);
    } catch {
      return NextResponse.json(
        { error: 'Portfolio/Website URL must be a valid URL.' },
        { status: 400 }
      );
    }

    const resumeFile = formData.get('resume');
    if (!resumeFile || !(resumeFile instanceof File) || resumeFile.size === 0) {
      return NextResponse.json(
        { error: 'Resume file is required.' },
        { status: 400 }
      );
    }

    const resumeDetails = await uploadFile(resumeFile);

    const portfolioFile = formData.get('portfolio');
    const portfolioDetails =
      portfolioFile instanceof File && portfolioFile.size > 0
        ? await uploadFile(portfolioFile, 'job-applications/portfolio')
        : null;

    // Find job from static jobs array
    const job = jobs.find((j) => j.id === jobId);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Get recipients from environment variables
    const envRecipients =
      process.env.JOB_APPLICATION_RECIPIENTS?.split(',')
        .map((email) => email.trim())
        .filter(Boolean) ?? [];

    const recipients = envRecipients.length
      ? envRecipients
      : DEFAULT_RECIPIENTS;

    if (!recipients.length) {
      return NextResponse.json(
        { error: 'No recipients configured for this job.' },
        { status: 500 }
      );
    }

    const fields = [
      { label: 'Full Name', value: fullName },
      { label: 'Email', value: email },
      { label: 'Contact Number', value: contactNumber },
      { label: 'Current Company & Designation', value: currentCompany },
      { label: 'Notice Period', value: noticePeriod },
      { label: 'Current Location (City & Country)', value: currentLocation },
      { label: 'Portfolio/Website URL', value: portfolioUrl },
    ];

    const fieldsHtml = fields
      .filter((field) => field.value)
      .map(
        (field) => `
        <tr>
          <td style="padding:10px 14px; font-weight:600; color:#443f38; width:40%;">${escapeHtml(field.label)}</td>
          <td style="padding:10px 14px; color:#15110d;">${escapeHtml(field.value)}</td>
        </tr>
      `
      )
      .join('');

    const resumeHtml = resumeDetails
      ? `<tr>
          <td style="padding:10px 14px; font-weight:600; color:#443f38;">Resume</td>
          <td style="padding:10px 14px;">
            <a href="${escapeHtml(resumeDetails.downloadUrl)}" style="color:#15110d; font-weight:600; text-decoration:none;">
              ${escapeHtml(resumeDetails.fileName)} (${(resumeDetails.size / (1024 * 1024)).toFixed(2)} MB)
            </a>
          </td>
        </tr>`
      : '';

    const portfolioHtml = portfolioDetails
      ? `<tr>
          <td style="padding:10px 14px; font-weight:600; color:#443f38;">Portfolio/Additional Materials</td>
          <td style="padding:10px 14px;">
            <a href="${escapeHtml(portfolioDetails.downloadUrl)}" style="color:#15110d; font-weight:600; text-decoration:none;">
              ${escapeHtml(portfolioDetails.fileName)} (${(portfolioDetails.size / (1024 * 1024)).toFixed(2)} MB)
            </a>
          </td>
        </tr>`
      : '';

    const submittedAt = new Date();
    const timestamp = submittedAt.toUTCString();

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="background:#f8f5f2;padding:24px;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 18px 35px rgba(20,16,12,0.08);">
            <div style="background:#15110d;padding:24px 32px;color:#f7f1ea;">
              <h1 style="margin:0;font-size:20px;text-transform:uppercase;letter-spacing:0.08em;">New Job Application</h1>
              <p style="margin:12px 0 0;font-size:16px;font-weight:600;color:#ffd231;">${escapeHtml(
                job.title
              )}</p>
              <p style="margin:6px 0 0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Submitted on ${escapeHtml(
                timestamp
              )}</p>
            </div>
            <div style="padding:24px 32px;">
              <table style="width:100%;border-collapse:collapse;border:1px solid #ece7e1;">
                <tbody>
                  ${fieldsHtml || '<tr><td style="padding:12px;">No additional details provided.</td></tr>'}
                  ${resumeHtml}
                  ${portfolioHtml}
                </tbody>
              </table>
            </div>
            <div style="background:#fbf7f2;padding:18px 32px;color:#7a7066;font-size:12px;text-align:center;">
              Confidential: Application submitted via One Big Future job detail page.
            </div>
          </div>
        </body>
      </html>
    `;

    const plainTextBody = [
      `New job application submitted for ${job.title}`,
      `Submitted on: ${timestamp}`,
      '',
      ...fields
        .filter((field) => field.value)
        .map((field) => `${field.label}: ${field.value}`),
      '',
      resumeDetails
        ? `Resume: ${resumeDetails.fileName} (${resumeDetails.downloadUrl})`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    const command = new SendEmailCommand({
      Source: `"One Big Future Careers" <${DEFAULT_FROM_EMAIL}>`,
      Destination: {
        ToAddresses: recipients,
      },
      Message: {
        Subject: {
          Data: `Job Application • ${job.title} • ${fullName}`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailHtml,
            Charset: 'UTF-8',
          },
          Text: {
            Data: plainTextBody,
            Charset: 'UTF-8',
          },
        },
      },
    });

    const response = await sesClient.send(command);

    if (!response?.MessageId) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Job application error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unable to submit application at this time.',
      },
      { status: 500 }
    );
  }
}
