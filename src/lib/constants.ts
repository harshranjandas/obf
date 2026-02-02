export enum UserRole {
  ADMIN = 'admin',
  RECRUITER = 'recruiter',
}

export const isAdmin = (user: any): boolean => {
  return user?.role === UserRole.ADMIN
}

export const isRecruiter = (user: any): boolean => {
  return user?.role === UserRole.RECRUITER
}
