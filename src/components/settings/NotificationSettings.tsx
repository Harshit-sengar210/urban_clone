"use client";

import { useState } from "react";
import { SettingsCard, SettingsRow, SettingsToggle } from "./SettingsLayout";
import { NotificationPreferences, MOCK_NOTIFICATIONS } from "@/data/settings";
import { useToast } from "@/components/bookings/Toast";

export function NotificationSettings() {
  const { showToast } = useToast();
  const [prefs, setPrefs] = useState(MOCK_NOTIFICATIONS);

  const toggle = (key: keyof NotificationPreferences) => {
    setPrefs(p => ({ ...p, [key]: !p[key] }));
    showToast("Preferences updated");
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)]">Notifications</h2>
        <p className="text-sm font-medium text-[var(--color-muted)] mt-1">Choose which updates you'd like to receive and how we reach you.</p>
      </div>

      <SettingsCard title="Notification Channels">
        <SettingsRow label="Push Notifications" description="Receive updates directly on your device." control={<SettingsToggle checked={prefs.channelPush} onChange={() => toggle("channelPush")} />} />
        <SettingsRow label="Email Notifications" description="Receive updates directly to your inbox." control={<SettingsToggle checked={prefs.channelEmail} onChange={() => toggle("channelEmail")} />} />
        <SettingsRow label="SMS Notifications" description="Receive text messages for important updates." control={<SettingsToggle checked={prefs.channelSms} onChange={() => toggle("channelSms")} />} />
        <SettingsRow label="WhatsApp" description="Get updates on WhatsApp." control={<SettingsToggle checked={prefs.channelWhatsapp} onChange={() => toggle("channelWhatsapp")} />} />
      </SettingsCard>

      <SettingsCard title="Booking Updates" description="Essential notifications about your active bookings.">
        <SettingsRow label="Booking Confirmed" control={<SettingsToggle checked={prefs.bookingConfirmed} onChange={() => toggle("bookingConfirmed")} disabled />} />
        <SettingsRow label="Professional Assigned" control={<SettingsToggle checked={prefs.professionalAssigned} onChange={() => toggle("professionalAssigned")} disabled />} />
        <SettingsRow label="Professional Arriving" control={<SettingsToggle checked={prefs.professionalArriving} onChange={() => toggle("professionalArriving")} />} />
        <SettingsRow label="Booking Completed" control={<SettingsToggle checked={prefs.bookingCompleted} onChange={() => toggle("bookingCompleted")} />} />
        <SettingsRow label="Rescheduled / Cancelled" control={<SettingsToggle checked={prefs.bookingCancelled} onChange={() => toggle("bookingCancelled")} disabled />} />
        <p className="text-[10px] text-[var(--color-muted)] mt-2">Some essential notifications cannot be disabled.</p>
      </SettingsCard>

      <SettingsCard title="Offers & Promotions" description="Marketing and promotional communications.">
        <SettingsRow label="New Offers" description="Get notified about flat discounts and cashbacks." control={<SettingsToggle checked={prefs.newOffers} onChange={() => toggle("newOffers")} />} />
        <SettingsRow label="Personalized Deals" description="Discounts tailored to your usage." control={<SettingsToggle checked={prefs.personalizedDeals} onChange={() => toggle("personalizedDeals")} />} />
        <SettingsRow label="Coupon Reminders" description="Reminders before your saved coupons expire." control={<SettingsToggle checked={prefs.couponReminders} onChange={() => toggle("couponReminders")} />} />
      </SettingsCard>
    </div>
  );
}
