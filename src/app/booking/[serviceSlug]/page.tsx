"use client";

import { useState, use, useEffect } from "react";
import { ALL_SERVICES } from "@/data/services";
import { notFound, useSearchParams, useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { DateTimeSelection } from "@/components/booking/DateTimeSelection";
import { AddressSelection, Address } from "@/components/booking/AddressSelection";
import { PaymentSelection, PaymentMethod } from "@/components/booking/PaymentSelection";
import { BookingReview } from "@/components/booking/BookingReview";
import { BookingSummary } from "@/components/booking/BookingSummary";
import { BookingSuccess } from "@/components/booking/BookingSuccess";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { db } from "@/backend/firebase";
import { collection, getDocs, addDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

// Default empty until fetched
const INITIAL_ADDRESSES: Address[] = [];

export default function BookingPage({ params }: { params: Promise<{ serviceSlug: string }> }) {
  const resolvedParams = use(params);
  const service = ALL_SERVICES.find((s) => s.slug === resolvedParams.serviceSlug);
  const searchParams = useSearchParams();
  const initialVariantId = searchParams.get("variant");

  if (!service) {
    notFound();
  }

  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  // Redirect to login if unauthenticated
  useEffect(() => {
    if (!isLoading && !user) {
      const redirectUrl = encodeURIComponent(window.location.pathname + window.location.search);
      router.push(`/login?redirect=${redirectUrl}`);
    }
  }, [isLoading, user, router]);

  // Booking State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(initialVariantId || service.pricingVariants?.[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Sync contact details from user/address
  useEffect(() => {
    if (!contactName && user?.displayName) setContactName(user.displayName);
    if (!contactPhone && (user as any)?.phoneNumber) setContactPhone((user as any).phoneNumber);
  }, [user]);

  useEffect(() => {
    if (selectedAddressId) {
      const addr = addresses.find(a => a.id === selectedAddressId);
      if (addr?.name) setContactName(addr.name);
      if (addr?.phone) setContactPhone(addr.phone);
    }
  }, [selectedAddressId, addresses]);

  // Fetch addresses on load
  useEffect(() => {
    if (!user) return;
    const fetchAddresses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users", user.uid, "addresses"));
        const fetchedAddresses: Address[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Address));
        setAddresses(fetchedAddresses);
        if (fetchedAddresses.length > 0) {
          setSelectedAddressId(fetchedAddresses[0].id);
        }
      } catch (err) {
        console.error("Error fetching addresses", err);
      }
    };
    fetchAddresses();
  }, [user]);

  const handleAddAddress = async (addr: Address) => {
    if (!user) return;
    try {
      const addressRef = doc(collection(db, "users", user.uid, "addresses"));
      await setDoc(addressRef, {
        type: addr.type,
        fullAddress: addr.fullAddress,
        city: addr.city,
        name: addr.name || "",
        phone: addr.phone || "",
      });
      const newAddress = { ...addr, id: addressRef.id };
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
    } catch (err) {
      console.error("Error adding address", err);
    }
  };

  // Derived state
  const selectedVariant = service.pricingVariants?.find(v => v.id === selectedVariantId);
  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  // Validation
  const canContinue = () => {
    switch (currentStep) {
      case 1: return !!selectedVariantId;
      case 2: return !!selectedDate && !!selectedTime;
      case 3: return !!selectedAddressId;
      case 4: return !!paymentMethod;
      case 5: return !!contactName.trim() && !!contactPhone.trim();
      default: return false;
    }
  };

  const handleNext = async () => {
    if (canContinue()) {
      if (currentStep === 5) {
        setIsSubmitting(true);
        try {
          const bookingData = {
            userId: user?.uid,
            userName: contactName.trim() || "Customer",
            userPhone: contactPhone.trim() || "+91 98765 43210",
            serviceSlug: service.slug,
            serviceName: service.name,
            variant: selectedVariant,
            date: selectedDate,
            time: selectedTime,
            address: selectedAddress,
            paymentMethod,
            status: "pending",
            createdAt: serverTimestamp(),
          };
          const docRef = await addDoc(collection(db, "bookings"), bookingData);
          setBookingId(docRef.id);
          setIsSuccess(true);
        } catch (err) {
          console.error("Error saving booking", err);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setCurrentStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.back();
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)]"></div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)]">
      <Navbar />
      
      <main className={`flex-grow ${isSuccess ? 'flex items-center justify-center py-8' : 'pt-24 pb-32'}`}>
        <div className="container mx-auto px-4 md:px-8 w-full">
          
          {!isSuccess && (
            <div className="max-w-5xl mx-auto mb-10">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors mb-6 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
              
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-8">Book your service</h1>
              
              <BookingSteps currentStep={currentStep} />
            </div>
          )}

          <div className="max-w-5xl mx-auto">
            {isSuccess ? (
              <BookingSuccess 
                serviceName={service.name}
                variant={selectedVariant!}
                date={selectedDate}
                time={selectedTime}
                address={selectedAddress!}
                bookingId={bookingId}
              />
            ) : (
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Column (Forms) */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[var(--color-border)] mb-8">
                    <AnimatePresence mode="wait">
                      {currentStep === 1 && (
                        <ServiceSelection 
                          key="step1"
                          variants={service.pricingVariants || []} 
                          selectedVariantId={selectedVariantId}
                          onSelect={setSelectedVariantId}
                        />
                      )}
                      
                      {currentStep === 2 && (
                        <DateTimeSelection 
                          key="step2"
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onDateSelect={setSelectedDate}
                          onTimeSelect={setSelectedTime}
                        />
                      )}
                      
                      {currentStep === 3 && (
                        <AddressSelection 
                          key="step3"
                          addresses={addresses}
                          selectedAddressId={selectedAddressId}
                          onSelect={setSelectedAddressId}
                          onAddAddress={handleAddAddress}
                        />
                      )}

                      {currentStep === 4 && (
                        <PaymentSelection
                          key="step4"
                          selectedMethod={paymentMethod}
                          onSelect={setPaymentMethod}
                        />
                      )}

                      {currentStep === 5 && selectedVariant && selectedAddress && (
                        <BookingReview 
                          key="step5"
                          variant={selectedVariant}
                          date={selectedDate}
                          time={selectedTime}
                          address={selectedAddress}
                          paymentMethod={paymentMethod}
                          contactName={contactName}
                          contactPhone={contactPhone}
                          onContactNameChange={setContactName}
                          onContactPhoneChange={setContactPhone}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Column (Summary) */}
                <div className="w-full lg:w-96 shrink-0 order-first lg:order-last mb-8 lg:mb-0">
                  <BookingSummary 
                    serviceName={service.name}
                    variant={selectedVariant}
                    date={selectedDate}
                    time={selectedTime}
                    address={selectedAddress}
                    currentStep={currentStep}
                  />
                </div>
                
              </div>
            )}
          </div>
          
        </div>
      </main>

      {/* Fixed Bottom Action Bar */}
      {!isSuccess && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-border)] p-4 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl flex justify-between items-center">
            <div className="hidden md:block">
              {currentStep < 5 && (
                <p className="text-[var(--color-muted)] text-sm">
                  {currentStep === 1 && "Please select a service variant to continue."}
                  {currentStep === 2 && "Please select a date and time slot."}
                  {currentStep === 3 && "Please select or add an address."}
                  {currentStep === 4 && "Please select a payment method."}
                </p>
              )}
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack} className="h-14 px-8 font-semibold flex-1 md:flex-none">
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                disabled={!canContinue() || isSubmitting}
                className="h-14 px-12 font-bold bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20 flex-1 md:flex-none"
              >
                {isSubmitting ? "Confirming..." : currentStep === 5 ? "Confirm Booking" : "Continue"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
