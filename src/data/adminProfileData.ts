export type AdminAccountStatus =
  | "active"
  | "inactive"
  | "suspended"
  | "pending";

export type AdminRole =
  | "platform_admin"
  | "operations_admin"
  | "support_admin"
  | "finance_admin";

export type AdminActivityCategory =
  | "security"
  | "profile"
  | "sessions"
  | "preferences";

export type AdminActivityType =
  | "login"
  | "logout"
  | "password_changed"
  | "profile_updated"
  | "two_factor_enabled"
  | "two_factor_disabled"
  | "session_revoked"
  | "preferences_updated";

export type AdminSessionStatus =
  | "current"
  | "active";

export type AdminNotificationChannel =
  | "in_app"
  | "email"
  | "push";

export interface AdminProfile {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  role: AdminRole;
  status: AdminAccountStatus;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface AdminSession {
  id: string;
  device: string;
  browser: string;
  os: string;
  location: string;
  ip: string;
  lastActive: string;
  status: AdminSessionStatus;
}

export interface AdminActivity {
  id: string;
  type: AdminActivityType;
  category: AdminActivityCategory;
  title: string;
  description: string;
  timestamp: string;
  device?: string;
  browser?: string;
  ip?: string;
  result: "successful" | "failed";
}

export interface AdminSecurityPreferences {
  twoFactorEnabled: boolean;
  newLoginAlert: boolean;
  passwordChangedAlert: boolean;
  twoFactorChangedAlert: boolean;
  newDeviceAlert: boolean;
  suspiciousActivityAlert: boolean;
}

export interface AdminNotificationPreferences {
  bookingAlerts: Record<AdminNotificationChannel, boolean>;
  paymentAlerts: Record<AdminNotificationChannel, boolean>;
  vendorAlerts: Record<AdminNotificationChannel, boolean>;
  supportAlerts: Record<AdminNotificationChannel, boolean>;
  securityAlerts: Record<AdminNotificationChannel, boolean>;
  offerAlerts: Record<AdminNotificationChannel, boolean>;
  systemAlerts: Record<AdminNotificationChannel, boolean>;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  allowCriticalSecurity: boolean;
}

export interface AdminAppearancePreferences {
  theme: "system" | "light" | "dark";
  density: "comfortable" | "compact";
  animations: "full" | "reduced";
  language: "english" | "hindi";
  timezone: string;
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timeFormat: "12h" | "24h";
}

export interface AdminDashboardPreferences {
  defaultLandingPage: "dashboard" | "users" | "vendors" | "bookings" | "reports";
  defaultTableDensity: "comfortable" | "compact";
  showWelcomeMessage: boolean;
  rememberLastPage: boolean;
}

export const adminProfileData: {
  profile: AdminProfile;
  sessions: AdminSession[];
  activity: AdminActivity[];
  securityPreferences: AdminSecurityPreferences;
  notificationPreferences: AdminNotificationPreferences;
  appearancePreferences: AdminAppearancePreferences;
  dashboardPreferences: AdminDashboardPreferences;
} = {
  profile: {
    id: "ADM-001",
    firstName: "Alex",
    lastName: "Morgan",
    displayName: "Alex Morgan",
    email: "admin@example.com",
    phone: "+91 00000 00000",
    jobTitle: "Platform Administrator",
    department: "Operations",
    role: "platform_admin",
    status: "active",
    createdAt: "2026-01-12T10:00:00Z",
    updatedAt: "2026-09-24T14:28:00Z",
    lastLoginAt: "2026-09-26T10:42:00Z",
  },
  sessions: [
    {
      id: "sess-1",
      device: "Windows PC",
      browser: "Chrome",
      os: "Windows 11",
      location: "India",
      ip: "192.0.2.10",
      lastActive: "2026-09-26T10:42:00Z",
      status: "current"
    },
    {
      id: "sess-2",
      device: "MacBook Pro",
      browser: "Safari",
      os: "macOS",
      location: "India",
      ip: "192.0.2.45",
      lastActive: "2026-09-26T08:15:00Z",
      status: "active"
    }
  ],
  activity: [
    {
      id: "act-1",
      type: "login",
      category: "sessions",
      title: "Signed in",
      description: "Signed in from current device.",
      timestamp: "2026-09-26T10:42:00Z",
      device: "Windows PC",
      browser: "Chrome",
      ip: "192.0.2.10",
      result: "successful"
    },
    {
      id: "act-2",
      type: "password_changed",
      category: "security",
      title: "Password changed",
      description: "Account password was updated.",
      timestamp: "2026-09-26T10:40:00Z",
      device: "Windows PC",
      browser: "Chrome",
      ip: "192.0.2.10",
      result: "successful"
    }
  ],
  securityPreferences: {
    twoFactorEnabled: true,
    newLoginAlert: true,
    passwordChangedAlert: true,
    twoFactorChangedAlert: true,
    newDeviceAlert: true,
    suspiciousActivityAlert: true
  },
  notificationPreferences: {
    bookingAlerts: { in_app: true, email: true, push: false },
    paymentAlerts: { in_app: true, email: true, push: false },
    vendorAlerts: { in_app: true, email: true, push: false },
    supportAlerts: { in_app: true, email: true, push: true },
    securityAlerts: { in_app: true, email: true, push: true },
    offerAlerts: { in_app: true, email: false, push: false },
    systemAlerts: { in_app: true, email: true, push: false },
    quietHoursEnabled: false,
    quietHoursStart: "22:00",
    quietHoursEnd: "07:00",
    allowCriticalSecurity: true
  },
  appearancePreferences: {
    theme: "system",
    density: "comfortable",
    animations: "full",
    language: "english",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h"
  },
  dashboardPreferences: {
    defaultLandingPage: "dashboard",
    defaultTableDensity: "comfortable",
    showWelcomeMessage: true,
    rememberLastPage: true
  }
};
