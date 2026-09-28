export enum UserRole {
  PLATFORM_ADMIN = "PLATFORM_ADMIN",

  OWNER = "OWNER",
  ADMIN = "ADMIN",
  ESTIMATOR = "ESTIMATOR",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  VIEWER = "VIEWER",

  BIDDER = "BIDDER"
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthRequestUser extends AuthUser {
  organizationId?: string;
  role?: UserRole;
}