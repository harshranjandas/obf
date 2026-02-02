import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const jobId = formData.get('jobId')?.toString()
    const fullName = formData.get('fullName')?.toString()
    const email = formData.get('email')?.toString()
    const contactNumber = formData.get('contactNumber')?.toString()
    const noticePeriod = formData.get('noticePeriod')?.toString()
    const currentLocation = formData.get('currentLocation')?.toString()
    const currentCompany = formData.get('currentCompany')?.toString()
    const portfolioUrl = formData.get('portfolioUrl')?.toString()
    const resumeFile = formData.get('resume') as File | null

    // Validate required fields
    if (!jobId || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, fullName, and email are required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Get the job to verify it exists and get the title
    const job = await payload.findByID({
      collection: 'jobs',
      id: parseInt(jobId, 10),
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    let resumeUploadId: number | null = null

    // Upload resume if provided
    if (resumeFile && resumeFile.size > 0) {
      try {
        // Convert File to Buffer
        const arrayBuffer = await resumeFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Create upload in Payload
        const uploadResult = await payload.create({
          collection: 'uploads',
          data: {
            alt: `Resume - ${fullName}`,
          },
          file: {
            data: buffer,
            mimetype: resumeFile.type,
            name: resumeFile.name,
            size: resumeFile.size,
          },
        })

        resumeUploadId = uploadResult.id as number
      } catch (uploadError) {
        console.error('Error uploading resume:', uploadError)
        // Continue without resume if upload fails
      }
    }

    // Create job application
    const application = await payload.create({
      collection: 'job-applications',
      data: {
        job: parseInt(jobId, 10),
        jobTitle: job.title,
        fullName,
        email,
        contactNumber: contactNumber || undefined,
        noticePeriod: noticePeriod || undefined,
        currentLocation: currentLocation || undefined,
        currentCompany: currentCompany || undefined,
        portfolioUrl: portfolioUrl || undefined,
        resume: resumeUploadId || undefined,
        status: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: application.id,
    })
  } catch (error) {
    console.error('Error submitting job application:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}
