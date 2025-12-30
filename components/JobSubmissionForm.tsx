'use client';

import { useState } from 'react';
import Image from 'next/image';
import SuccessIcon from './icons/SuccessIcon';
import Button from './ui/Button';
import FormDropdown from './FormDropDown';
import { Job } from '@/types/type';

const noticePeriodOptions = [
  'Immediate Joining',
  '15 Days',
  '30 Days',
  'Over 30 Days',
] as const;
const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB in bytes

export default function JobSubmissionForm({ job }: { job: Job }) {
  const [selectedResume, setSelectedResume] = useState<File | null>(null);
  const [noticePeriod, setNoticePeriod] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: boolean;
    contactNumber?: boolean;
    email?: boolean;
    currentCompany?: boolean;
    noticePeriod?: boolean;
    currentLocation?: boolean;
    resume?: boolean;
    resumeSize?: boolean;
    portfolioUrl?: boolean;
  }>({});
  const [fileSizeError, setFileSizeError] = useState<string | null>(null);

  const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(
          'Resume file size exceeds 30MB limit. Please choose a smaller file.'
        );
        setSelectedResume(null);
        setFieldErrors((prev) => ({ ...prev, resumeSize: true }));
        event.target.value = ''; // Reset the input
        return;
      }
      setSelectedResume(file);
      setFileSizeError(null);
      if (fieldErrors.resume) {
        setFieldErrors((prev) => ({
          ...prev,
          resume: false,
          resumeSize: false,
        }));
      }
    } else {
      setSelectedResume(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!job.id) {
      setSubmitError(
        'Job reference missing. Please refresh the page and try again.'
      );
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const fullName = formData.get('fullName')?.toString().trim();
    const contactNumber = formData.get('contactNumber')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const currentCompany = formData.get('currentCompany')?.toString().trim();
    const currentLocation = formData.get('currentLocation')?.toString().trim();
    const portfolioUrl = formData.get('portfolioUrl')?.toString().trim();
    // Validate all required fields
    const errors: typeof fieldErrors = {};
    let hasErrors = false;

    if (!fullName || fullName.trim() === '') {
      errors.fullName = true;
      hasErrors = true;
    }
    if (!contactNumber || contactNumber.trim() === '') {
      errors.contactNumber = true;
      hasErrors = true;
    }
    if (!email || email.trim() === '') {
      errors.email = true;
      hasErrors = true;
    } else {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = true;
        hasErrors = true;
      }
    }
    if (!currentCompany || currentCompany.trim() === '') {
      errors.currentCompany = true;
      hasErrors = true;
    }
    if (!noticePeriod) {
      errors.noticePeriod = true;
      hasErrors = true;
    }
    if (!currentLocation || currentLocation.trim() === '') {
      errors.currentLocation = true;
      hasErrors = true;
    }
    if (!selectedResume) {
      errors.resume = true;
      hasErrors = true;
    }
    if (!portfolioUrl || portfolioUrl.trim() === '') {
      errors.portfolioUrl = true;
      hasErrors = true;
    }

    // Validate file sizes
    if (selectedResume && selectedResume.size > MAX_FILE_SIZE) {
      errors.resumeSize = true;
      hasErrors = true;
      setFileSizeError('Resume file size exceeds 30MB limit.');
    }

    if (hasErrors) {
      setFieldErrors(errors);
      setSubmitError(
        fileSizeError ||
          'Please fill in all required fields and ensure files are under 30MB.'
      );
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);
    setFileSizeError(null);

    try {
      formData.append('jobId', job.id);
      formData.set('noticePeriod', noticePeriod ?? '');

      if (selectedResume) {
        formData.set('resume', selectedResume);
      } else {
        formData.delete('resume');
      }

      const response = await fetch('/api/jobs/apply', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error || 'Failed to submit application. Please try again.'
        );
      }

      setIsSubmitted(true);
      setSelectedResume(null);
      setNoticePeriod(null);
      setFieldErrors({});
      setFileSizeError(null);
      formElement.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit application. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="bg-[#F3F1F0] p-12">
        <h3 className="mb-[30px] text-[20px] font-medium uppercase leading-[28px] text-black">
          Apply Here
        </h3>
        <form onSubmit={handleSubmit} className="space-y-[20px]">
          <div>
            <input
              name="fullName"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.fullName ? 'border-red-500' : 'border-[#DAD8D6]'
              }`}
              placeholder="Enter Full Name"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.fullName) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    fullName: false,
                  }));
                }
              }}
            />
          </div>
          <div>
            <input
              name="contactNumber"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.contactNumber
                  ? 'border-red-500'
                  : 'border-[#DAD8D6]'
              }`}
              placeholder="Contact Number"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.contactNumber) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    contactNumber: false,
                  }));
                }
              }}
            />
          </div>
          <div>
            <input
              name="email"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.email ? 'border-red-500' : 'border-[#DAD8D6]'
              }`}
              placeholder="Email ID"
              type="email"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    email: false,
                  }));
                }
              }}
            />
          </div>

          <div>
            <FormDropdown
              placeholder="Select Notice Period"
              value={noticePeriod}
              options={noticePeriodOptions}
              onSelect={(value) => {
                setNoticePeriod(value);
                if (fieldErrors.noticePeriod) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    noticePeriod: false,
                  }));
                }
              }}
              hasError={fieldErrors.noticePeriod}
            />
          </div>
          <div>
            <input
              name="currentLocation"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.currentLocation
                  ? 'border-red-500'
                  : 'border-[#DAD8D6]'
              }`}
              placeholder="Current Location (City & Country)"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.currentLocation) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    currentLocation: false,
                  }));
                }
              }}
            />
          </div>
          <div>
            <input
              name="currentCompany"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.currentCompany
                  ? 'border-red-500'
                  : 'border-[#DAD8D6]'
              }`}
              placeholder="Current Company & Designation"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.currentCompany) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    currentCompany: false,
                  }));
                }
              }}
            />
          </div>
          <div>
            <input
              name="portfolioUrl"
              className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                fieldErrors.portfolioUrl ? 'border-red-500' : 'border-[#DAD8D6]'
              }`}
              placeholder="Portfolio/Website URL"
              type="url"
              disabled={isSubmitting}
              onChange={() => {
                if (fieldErrors.portfolioUrl) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    portfolioUrl: false,
                  }));
                }
              }}
            />
          </div>
          <div>
            <div className="relative">
              <input
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
                id="resume"
                disabled={isSubmitting}
              />
              <label
                htmlFor="resume"
                className={`flex items-center gap-3 border bg-white px-4 py-3 transition-colors ${
                  fieldErrors.resume || fieldErrors.resumeSize
                    ? 'border-red-500'
                    : 'border-[#E8E8E8]'
                } ${
                  isSubmitting
                    ? 'cursor-not-allowed opacity-60'
                    : 'cursor-pointer hover:border-black'
                }`}
              >
                <Image src="/pin.svg" alt="Upload" width={24} height={24} />
                <span className="flex-1 text-[#999999]">
                  {selectedResume
                    ? selectedResume.name
                    : 'Attach Resume (max file size 30 MB, pdf/word doc supported)'}
                </span>
              </label>
            </div>
          </div>

          {fileSizeError && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {fileSizeError}
            </div>
          )}
          {submitError && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </Button>
          </div>
        </form>
      </div>
      {isSubmitted && (
        <div className="rounded-lg bg-[#FFFBF0] px-5 py-12 text-center">
          <div className="mb-4 flex justify-center">
            <SuccessIcon />
          </div>
          <h3 className="mb-2 text-[24px] font-semibold text-black">
            Thank You
          </h3>
          <p className="text-base leading-relaxed text-black">
            We&apos;ll review your application and get back to you soon.
          </p>
        </div>
      )}
    </>
  );
}
