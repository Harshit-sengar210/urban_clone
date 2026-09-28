"use client";

import { VendorNotificationSettings, VendorNotificationChannels } from "@/types/vendor";
import { SectionCard, SettingsToggle } from "../shared/SettingsShared";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotificationsSectionProps {
  data: VendorNotificationSettings;
  channels: VendorNotificationChannels;
  onChange: (data: VendorNotificationSettings) => void;
  onChannelsChange: (c: VendorNotificationChannels) => void;
}

const groups: {
  title: string;
  items: { key: keyof VendorNotificationSettings; label: string; description: string }[];
}[] = [
  {
    title: "Bookings",
    items: [
      { key: "bookingRequests", label: "New Booking Requests", description: "Get notified when a new booking request arrives." },
      { key: "bookingAccepted", label: "Booking Accepted", description: "Confirmation when a booking is accepted." },
      { key: "bookingCancelled", label: "Booking Cancelled", description: "Alerts when a booking is cancelled by you or the customer." },
      { key: "bookingReminders", label: "Upcoming Booking Reminder", description: "Reminder before a scheduled booking." },
    ],
  },
  {
    title: "Services",
    items: [
      { key: "serviceUpdates", label: "Service Status Updates", description: "Updates when a service status changes." },
    ],
  },
  {
    title: "Profile & Verification",
    items: [
      { key: "verificationUpdates", label: "Verification Updates", description: "Updates on your partner verification status." },
      { key: "accountUpdates", label: "Account Updates", description: "Notifications about your partner account." },
    ],
  },
  {
    title: "Earnings",
    items: [
      { key: "earningsUpdates", label: "Earnings Updates", description: "New earnings from completed bookings." },
      { key: "payoutUpdates", label: "Payout Updates", description: "Updates on your payout transfers." },
    ],
  },
  {
    title: "Support",
    items: [
      { key: "supportUpdates", label: "Support Ticket Updates", description: "Replies and status changes on your support tickets." },
    ],
  },
];

export function NotificationsSection({ data, channels, onChange, onChannelsChange }: NotificationsSectionProps) {
  return (
    <div className="space-y-5">
      {groups.map((group, gi) => (
        <SectionCard key={group.title} title={group.title} delay={gi * 0.06}>
          {group.items.map(item => (
            <SettingsToggle
              key={item.key}
              id={`notif-${item.key}`}
              checked={data[item.key]}
              onChange={v => onChange({ ...data, [item.key]: v })}
              label={item.label}
              description={item.description}
            />
          ))}
        </SectionCard>
      ))}

      <SectionCard title="Notification Channels" description="Choose how you receive notifications." delay={groups.length * 0.06}>
        <div className="py-4 space-y-3">
          {(["inApp", "email", "push"] as const).map(channel => {
            const labels: Record<typeof channel, string> = { inApp: "In-App", email: "Email", push: "Push Notifications" };
            const descriptions: Record<typeof channel, string> = {
              inApp: "Notifications visible in the partner panel.",
              email: "Notifications sent to your registered email.",
              push: "Browser or device push notifications.",
            };
            return (
              <SettingsToggle
                key={channel}
                id={`channel-${channel}`}
                checked={channels[channel]}
                onChange={v => onChannelsChange({ ...channels, [channel]: v })}
                label={labels[channel]}
                description={descriptions[channel]}
              />
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
