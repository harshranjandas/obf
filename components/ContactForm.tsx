'use client';

import { useState } from 'react';
import SuccessIcon from './icons/SuccessIcon';
import Button from './ui/Button';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    phoneNumber?: boolean;
    organization?: boolean;
    role?: boolean;
    message?: boolean;
  }>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const firstName = formData.get('firstName')?.toString().trim();
    const lastName = formData.get('lastName')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phoneNumber = formData.get('phoneNumber')?.toString().trim();
    const organization = formData.get('organization')?.toString().trim();
    const role = formData.get('role')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    // Validate all required fields
    const errors: typeof fieldErrors = {};
    let hasErrors = false;

    if (!firstName || firstName === '') {
      errors.firstName = true;
      hasErrors = true;
    }
    if (!lastName || lastName === '') {
      errors.lastName = true;
      hasErrors = true;
    }
    if (!email || email === '') {
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
    if (!phoneNumber || phoneNumber === '') {
      errors.phoneNumber = true;
      hasErrors = true;
    }
    if (!organization || organization === '') {
      errors.organization = true;
      hasErrors = true;
    }
    if (!role || role === '') {
      errors.role = true;
      hasErrors = true;
    }
    if (!message || message === '') {
      errors.message = true;
      hasErrors = true;
    }

    if (hasErrors) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact-us', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error || 'Failed to submit form. Please try again.'
        );
      }

      setIsSubmitted(true);
      setFieldErrors({});

      formElement.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        {!isSubmitted && (
          <div className="bg-[#F3F1F0] p-6 md:p-12">
            <h3 className="mb-[30px] text-[20px] font-medium uppercase leading-[28px] text-black">
              Reach Out to Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-[20px]">
              <div>
                <input
                  name="firstName"
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                    fieldErrors.firstName
                      ? 'border-red-500'
                      : 'border-[#DAD8D6]'
                  }`}
                  placeholder="First Name"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.firstName) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        firstName: false,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <input
                  name="lastName"
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                    fieldErrors.lastName ? 'border-red-500' : 'border-[#DAD8D6]'
                  }`}
                  placeholder="Last Name"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.lastName) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        lastName: false,
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
                  placeholder="Email Address"
                  type="email"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.email) {
                      setFieldErrors((prev) => ({ ...prev, email: false }));
                    }
                  }}
                />
              </div>
              <div>
                <input
                  name="phoneNumber"
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                    fieldErrors.phoneNumber
                      ? 'border-red-500'
                      : 'border-[#DAD8D6]'
                  }`}
                  placeholder="Phone Number"
                  type="tel"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.phoneNumber) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        phoneNumber: false,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <input
                  name="organization"
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                    fieldErrors.organization
                      ? 'border-red-500'
                      : 'border-[#DAD8D6]'
                  }`}
                  placeholder="Organization/Affiliation"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.organization) {
                      setFieldErrors((prev) => ({
                        ...prev,
                        organization: false,
                      }));
                    }
                  }}
                />
              </div>
              <div>
                <input
                  name="role"
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black ${
                    fieldErrors.role ? 'border-red-500' : 'border-[#DAD8D6]'
                  }`}
                  placeholder="Role/Title"
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.role) {
                      setFieldErrors((prev) => ({ ...prev, role: false }));
                    }
                  }}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  rows={5}
                  className={`w-full border bg-white px-4 py-3 text-base text-black placeholder:text-[#999999] focus:outline-none focus:ring-1 focus:ring-black resize-none ${
                    fieldErrors.message ? 'border-red-500' : 'border-[#DAD8D6]'
                  }`}
                  placeholder="Your message to us..."
                  disabled={isSubmitting}
                  onChange={() => {
                    if (fieldErrors.message) {
                      setFieldErrors((prev) => ({ ...prev, message: false }));
                    }
                  }}
                />
              </div>

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
        )}

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
      </div>
    </div>
  );
}
