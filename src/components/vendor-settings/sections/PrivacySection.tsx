"use client";

import { VendorPrivacySettings, VendorCustomerContactPreferences } from "@/types/vendor";
import { SectionCard, SettingsToggle } from "../shared/SettingsShared";

interface PrivacySectionProps {
  privacy: VendorPrivacySettings;
  contact: VendorCustomerContactPreferences;
  onPrivacyChange: (data: VendorPrivacySettings) => void;
  onContactChange: (data: VendorCustomerContactPreferences) => void;
}

export function PrivacySection({ privacy, contact, onPrivacyChange, onContactChange }: PrivacySectionProps) {
  return (
    <div className="space-y-5">
      <SectionCard title="Profile Visibility" description="Control what customers can see on your public profile." delay={0}>
        <SettingsToggle
          id="privacy-profile"
          checked={privacy.showProfessionalProfile}
          onChange={v => onPrivacyChange({ ...privacy, showProfessionalProfile: v })}
          label="Show Professional Profile"
          description="Allow customers to view your partner profile in search results and listings."
        />
        <SettingsToggle
          id="privacy-portfolio"
          checked={privacy.showPortfolio}
          onChange={v => onPrivacyChange({ ...privacy, showPortfolio: v })}
          label="Allow Customers to View Portfolio"
          description="Show your work samples and portfolio images on your public profile."
        />
        <SettingsToggle
          id="privacy-area"
          checked={privacy.showServiceArea}
          onChange={v => onPrivacyChange({ ...privacy, showServiceArea: v })}
          label="Show Service Area"
          description="Display your approximate service coverage area. Exact location is never shared."
        />
        <SettingsToggle
          id="privacy-avail"
          checked={privacy.showAvailability}
          onChange={v => onPrivacyChange({ ...privacy, showAvailability: v })}
          label="Show Availability"
          description="Let customers see your available time slots when booking."
        />
        <SettingsToggle
          id="privacy-exp"
          checked={privacy.showExperience}
          onChange={v => onPrivacyChange({ ...privacy, showExperience: v })}
          label="Show Experience"
          description="Display your years of experience and qualifications on your profile."
        />
      </SectionCard>

      <SectionCard title="Customer Communication" description="Manage how customers can reach you." delay={0.08}>
        <SettingsToggle
          id="contact-messages"
          checked={contact.allowMessages}
          onChange={v => onContactChange({ ...contact, allowMessages: v })}
          label="Allow Customer Messages"
          description="Let customers send you messages through the platform."
        />
        <SettingsToggle
          id="contact-calls"
          checked={contact.allowCalls}
          onChange={v => onContactChange({ ...contact, allowCalls: v })}
          label="Allow Booking-Related Calls"
          description="Allow customers to call you for confirmed bookings via the platform."
        />
        <SettingsToggle
          id="contact-svc"
          checked={contact.allowServiceMessages}
          onChange={v => onContactChange({ ...contact, allowServiceMessages: v })}
          label="Allow Service-Related Messages"
          description="Receive service update messages from UrbanClone regarding your bookings."
        />
      </SectionCard>
    </div>
  );
}
