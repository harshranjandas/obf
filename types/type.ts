// Job type for listing cards (minimal fields)
export type Job = {
  id: string;
  title: string;
  subTitle?: string;
  location: string;
  locationType: string;
  type?: string;
  logo?: string;
  theRole?: string;
  whatYouDo?: string[];
  whatWereLookingFor?: string[];
  preferredExperience?: string[];
  notificationEmails?: string;
};

// Job type for form submission (minimal fields needed)
export type JobForForm = {
  id: string;
  title: string;
  location?: string;
  locationType?: string;
  notificationEmails?: string;
};
