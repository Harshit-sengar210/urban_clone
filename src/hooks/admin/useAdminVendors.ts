import { useState, useEffect } from "react";
import { AdminVendor } from "@/data/adminVendorsData";
import { subscribeToPendingApplications, subscribeToApprovedVendors } from "@/services/admin/adminVendorsService";

export const useAdminVendors = () => {
  const [pendingVendors, setPendingVendors] = useState<AdminVendor[]>([]);
  const [approvedVendors, setApprovedVendors] = useState<AdminVendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let pendingLoaded = false;
    let approvedLoaded = false;

    const checkLoading = () => {
      if (pendingLoaded && approvedLoaded) {
        setIsLoading(false);
      }
    };

    const unsubPending = subscribeToPendingApplications((vendors) => {
      setPendingVendors(vendors);
      pendingLoaded = true;
      checkLoading();
    });

    const unsubApproved = subscribeToApprovedVendors((vendors) => {
      setApprovedVendors(vendors);
      approvedLoaded = true;
      checkLoading();
    });

    return () => {
      unsubPending();
      unsubApproved();
    };
  }, []);

  return { pendingVendors, approvedVendors, isLoading };
};
