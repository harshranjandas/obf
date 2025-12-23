import { NextRequest, NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.S3_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  },
});

const ADMIN_EMAIL = 'hello@t9l.com';
const DEFAULT_RECIPIENTS = ['arun@t9l.com'];

const RECIPIENT_EMAILS =
  process.env.SUBMIT_PORTFOLIO_RECIPIENTS?.split(',')
    .map((email) => email.trim())
    .filter(Boolean) ?? DEFAULT_RECIPIENTS;

function escapeHtml(value?: string | number | null): string {
  if (value === undefined || value === null) {
    return '';
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const firstName = formData.get('firstName')?.toString().trim() || '';
    const lastName = formData.get('lastName')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const phoneNumber = formData.get('phoneNumber')?.toString().trim() || '';
    const organization = formData.get('organization')?.toString().trim() || '';
    const role = formData.get('role')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !organization ||
      !role ||
      !message
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const recipients = RECIPIENT_EMAILS.length
      ? RECIPIENT_EMAILS
      : DEFAULT_RECIPIENTS;

    if (!recipients.length) {
      return NextResponse.json(
        { error: 'No recipients configured for notifications' },
        { status: 500 }
      );
    }

    const submittedAt = new Date();
    const formattedTimestamp = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    }).format(submittedAt);

    const emailHtml = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
      <html>
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      </head>
      <body>
      <div style="background:#f8f5f2; padding:24px;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 18px 35px rgba(20,16,12,0.08);">
          <div style="background:#15110d; padding:24px 32px;">
            <h1 style="margin:0; color:#ffd231; font-size:22px; letter-spacing:0.04em; text-transform:uppercase;">New Contact Form Submission</h1>
            <p style="margin:12px 0 0; color:#f7f1ea; font-size:15px; line-height:1.6;">
              A new message has been submitted via the contact form.
            </p>
            <p style="margin:6px 0 0; color:#d5cbbb; font-size:12px; letter-spacing:0.08em; text-transform:uppercase;">
              Submitted on ${formattedTimestamp} UTC
            </p>
          </div>
          <div style="padding:24px 32px;">
            <table style="width:100%; border-collapse:collapse; border:1px solid #ece7e1; border-radius:8px; overflow:hidden;">
              <tbody>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38; width: 140px;">First Name</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">${escapeHtml(firstName)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38;">Last Name</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">${escapeHtml(lastName)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38;">Email Address</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">
                    <a href="mailto:${escapeHtml(email)}" style="color:#15110d; text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38;">Phone Number</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">
                    <a href="tel:${escapeHtml(phoneNumber)}" style="color:#15110d; text-decoration:none;">${escapeHtml(phoneNumber)}</a>
                  </td>
                </tr>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38;">Organization/Affiliation</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">${escapeHtml(organization)}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ece7e1; background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38;">Role/Title</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px;">${escapeHtml(role)}</td>
                </tr>
                <tr style="background:#fff;">
                  <td style="padding: 14px 18px; font-weight: 600; color:#443f38; vertical-align:top;">Message</td>
                  <td style="padding: 14px 18px; color:#15110d; font-size:15px; line-height:1.6; white-space:pre-wrap;">${escapeHtml(message)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="background:#fbf7f2; padding:18px 32px; color:#7a7066; font-size:12px; text-align:center;">
            This message was submitted through the One Big Future contact form.
          </div>
        </div>
      </div>
      </body>
      </html>
    `;

    const plainTextBody = `New Contact Form Submission
Submitted on ${formattedTimestamp} UTC

First Name: ${firstName}
Last Name: ${lastName}
Email Address: ${email}
Phone Number: ${phoneNumber}
Organization/Affiliation: ${organization}
Role/Title: ${role}

Message:
${message}

---
This message was submitted through the One Big Future contact form.`;

    const command = new SendEmailCommand({
      Source: `"T9L Venture" <${ADMIN_EMAIL}>`,
      Destination: {
        ToAddresses: recipients,
      },
      Message: {
        Subject: {
          Data: `New Contact Form Submission • ${formattedTimestamp} UTC`,
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

    if (response?.MessageId) {
      return NextResponse.json({
        status: 'success',
        message: 'Email notification sent successfully',
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send email notification',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
