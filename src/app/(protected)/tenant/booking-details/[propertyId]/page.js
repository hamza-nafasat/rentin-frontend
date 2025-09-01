'use client';
import Button from '@/components/shared/small/Button';
import Dropdown from '@/components/shared/small/Dropdown';
import Input from '@/components/shared/small/Input';
import BrowsePropertyCard from '@/components/tenant/browserProperty/BrowsePropertyCard';
import { bookingHouses } from '@/data/data';
import React, { useState, useEffect } from 'react';
import { useGetSinglePropertyQuery } from '@/features/property/propertyApi';
import { use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCreateBookingRequestMutation } from '@/features/booking/bookingRequestApi'; // adjust path as needed
import { toast } from 'react-hot-toast';
import { usePayRentMutation } from '@/features/stripe/stripeApi';

function BookingDetails() {
  const parms = useParams();
  console.log('param', parms);

  const [showInput1, setShowInput1] = useState(false);
  const [showInput2, setShowInput2] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingNationalities, setLoadingNationalities] = useState(true);
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [priceDetails, setPriceDetails] = useState(null);
  const [fullName, setFullName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [numOfOccupants, setNumOfOccupants] = useState('');
  const [customOccupants, setCustomOccupants] = useState('');
  const [purpose, setPurpose] = useState('');
  const [customPurpose, setCustomPurpose] = useState('');
  const [visaType, setVisaType] = useState('');
  const [customVisaType, setCustomVisaType] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const router = useRouter();

  const { data, error, isLoading } = useGetSinglePropertyQuery(parms.propertyId);
  const [createBookingRequest, { isLoading: isCreatingBooking }] = useCreateBookingRequestMutation();
  const [payRent, { isLoading: isPayingRent }] = usePayRentMutation();

  // Fetch countries and nationalities on component mount
  useEffect(() => {
    fetchCountries();
    fetchNationalities();
  }, []);

  useEffect(() => {
    console.log('State values updated:', {
      selectedCountry,
      selectedCity,
      selectedNationality,
      selectedOccupation,
    });
  }, [selectedCountry, selectedCity, selectedNationality, selectedOccupation]);
  // Fetch cities when country changes

  // Calculate rental details when dates change
  useEffect(() => {
    if (moveInDate && moveOutDate && data?.data) {
      calculateRentalDetails();
    }
  }, [moveInDate, moveOutDate, data]);

  // Handle payment success and create booking request
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const sessionId = urlParams.get('session_id');

    if (status === 'success' && sessionId) {
      const handlePaymentSuccess = async () => {
        try {
          // Get stored booking data
          const storedData = sessionStorage.getItem('bookingRequestData');
          if (storedData) {
            const bookingData = JSON.parse(storedData);

            // Now create the booking request
            const response = await createBookingRequest(bookingData).unwrap();
            toast.success('Payment successful! Booking request sent successfully!');

            // Clear stored data
            sessionStorage.removeItem('bookingRequestData');

            // Reset form
            setFullName('');
            setSelectedCountry('');
            setSelectedCountryCode('');
            setSelectedCity('');
            setSelectedNationality('');
            setSelectedOccupation('');
            setMoveInDate('');
            setMoveOutDate('');
            setNumOfOccupants('');
            setCustomOccupants('');
            setPurpose('');
            setCustomPurpose('');
            setVisaType('');
            setCustomVisaType('');
            setSpecialRequests('');
            setShowInput1(false);
            setShowInput2(false);
            setShowInput3(false);
            setBookingDetails(null);
            setPriceDetails(null);

            // Clean URL and redirect
            window.history.replaceState({}, document.title, window.location.pathname);
            router.push('/tenant');
          }
        } catch (error) {
          console.error('Error creating booking after payment:', error);
          toast.error('Payment successful but booking request failed. Please contact support.');
          sessionStorage.removeItem('bookingRequestData');
        }
      };

      handlePaymentSuccess();
    }
  }, [createBookingRequest, router]);

  // Fetch countries from REST Countries API
  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
      const data = await response.json();

      // Sort countries alphabetically and format for dropdown
      const formattedCountries = data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .map(country => ({
          option: country.name.common,
          value: country.cca2,
          code: country.cca2,
        }));

      setCountries(formattedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
      // Fallback to a basic list if API fails
      setCountries([
        { option: 'United States', value: 'US', code: 'US' },
        { option: 'Canada', value: 'CA', code: 'CA' },
        { option: 'United Kingdom', value: 'GB', code: 'GB' },
        { option: 'Australia', value: 'AU', code: 'AU' },
        { option: 'Germany', value: 'DE', code: 'DE' },
      ]);
    } finally {
      setLoadingCountries(false);
    }
  };

  // Fetch nationalities from REST Countries API
  const fetchNationalities = async () => {
    try {
      setLoadingNationalities(true);
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,demonyms');
      const data = await response.json();

      // Extract nationalities and format for dropdown
      const formattedNationalities = data
        .filter(country => country.demonyms && country.demonyms.eng)
        .map(country => {
          const nationality = country.demonyms.eng.m || country.demonyms.eng.f;
          return {
            option: nationality,
            value: nationality.toLowerCase().replace(/\s+/g, '_'),
            country: country.name.common,
          };
        })
        .filter(item => item.option) // Remove entries without nationality
        .sort((a, b) => a.option.localeCompare(b.option))
        // Remove duplicates
        .reduce((acc, current) => {
          const isDuplicate = acc.find(item => item.value === current.value);
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

      setNationalities(formattedNationalities);
    } catch (error) {
      console.error('Error fetching nationalities:', error);
      // Fallback to basic nationalities if API fails
      setNationalities([
        { option: 'American', value: 'american' },
        { option: 'British', value: 'british' },
        { option: 'Canadian', value: 'canadian' },
        { option: 'Chinese', value: 'chinese' },
        { option: 'French', value: 'french' },
        { option: 'German', value: 'german' },
        { option: 'Indian', value: 'indian' },
        { option: 'Japanese', value: 'japanese' },
        { option: 'Pakistani', value: 'pakistani' },
        { option: 'Thai', value: 'thai' },
        { option: 'Others', value: 'others' },
      ]);
    } finally {
      setLoadingNationalities(false);
    }
  };

  // Primary method: Using GeoNames API (free, no API key required)

  // Alternative method 1: Using REST Countries API for capitals + major cities

  // Get major cities for common countries (you can expand this list)

  // Final fallback method

  const calculateRentalDetails = () => {
    if (!moveInDate || !moveOutDate || !data?.data) return;

    const startDate = new Date(moveInDate);
    const endDate = new Date(moveOutDate);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate actual calendar months between dates
    const actualCalendarMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());

    // If there are remaining days beyond complete months, count as additional month
    const remainingDays = endDate.getDate() - startDate.getDate();
    const totalCalendarMonths = actualCalendarMonths + (remainingDays > 0 ? 1 : 0);

    if (daysDiff <= 0) return;

    const property = data.data;
    const dailyRate = property.contractRate?.rate || 50;
    const securityDeposit = property.contractRate?.securityDeposit || 450;
    const deals = property.deals || [];

    let totalRent = 0;
    let applicableDeal = null;
    let finalSecurityDeposit = securityDeposit;

    // Sort deals by duration (longest first)
    const sortedDeals = deals.slice().sort((a, b) => parseInt(b.duration) - parseInt(a.duration));

    // Find the applicable deal based on calendar months
    for (const deal of sortedDeals) {
      if (totalCalendarMonths >= parseInt(deal.duration)) {
        applicableDeal = deal;
        finalSecurityDeposit = deal.securityDeposit;
        break;
      }
    }

    if (applicableDeal) {
      const monthlyRate = applicableDeal.rent; // This is monthly rate

      // Calculate rent based on actual calendar months
      totalRent = totalCalendarMonths * monthlyRate;
    } else {
      // No deal applies, use daily rate
      totalRent = daysDiff * dailyRate;
    }

    const totalAmount = totalRent + finalSecurityDeposit;

    setBookingDetails({
      startDate: startDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      endDate: endDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      totalDays: daysDiff,
      totalMonths: totalCalendarMonths,
    });

    setPriceDetails({
      rentalAmount: totalRent,
      securityDeposit: finalSecurityDeposit,
      totalAmount: totalAmount,
      dealApplied: applicableDeal,
    });
  };

  const handleRentReasonChange1 = e => {
    const value = e.target.value;
    setShowInput1(e.target.id === 'rentOther1');
    setNumOfOccupants(value);
  };

  const handleRentReasonChange2 = e => {
    const value = e.target.value;
    setShowInput2(e.target.id === 'rentOther2');
    setPurpose(value);
  };

  const handleRentReasonChange3 = e => {
    const value = e.target.value;
    setShowInput3(e.target.id === 'rentOther3');
    setVisaType(value);
  };

  const reasonOptions1 = [
    { id: 'vacation1', label: '1(Solo)' },
    { id: 'study1', label: '2(Couple)' },
    { id: 'family1', label: '3-5(Family/Small Group)' },
    { id: 'rentOther1', label: '5+ (Custom)' },
  ];

  const reasonOptions2 = [
    { id: 'remote2', label: 'Vacation/Holiday' },
    { id: 'relocation2', label: 'Remote Work (Digital Nomad)' },
    { id: 'healthcare2', label: 'Business/Working Assignment' },
    { id: 'healthcare', label: 'Retirement/Long-Term Stay' },
    { id: 'rentOther2', label: 'Other (Specify:)' },
  ];

  const reasonOptions3 = [
    { id: 'business3', label: 'Tourist Visa (TR)' },
    { id: 'conference3', label: 'Visa on Arrival (VoA)' },
    { id: 'extended', label: 'Work Permit' },
    { id: 'extended1', label: 'Digital Nomad Visa (DTV) (New!)' },
    { id: 'extended2', label: 'Retirement Visa (O-A/O-X)' },
    { id: 'extended3', label: 'Education Visa (ED)' },
    { id: 'rentOther3', label: 'Other (Specify:)' },
  ];

  const occupationOptions = [
    { option: 'Employed', value: 'employed' },
    { option: 'Self-Employed', value: 'self_employed' },
    { option: 'Student', value: 'student' },
    { option: 'Retired', value: 'retired' },
    { option: 'Digital Nomad', value: 'digital_nomad' },
    { option: 'Unemployed', value: 'unemployed' },
    { option: 'Others', value: 'others' },
  ];

  console.log('property data', data);

  const handleSendRentRequest = async () => {
    try {
      const finalNumOfOccupants = showInput1 ? customOccupants : numOfOccupants;
      const finalPurpose = showInput2 ? customPurpose : purpose;
      const finalVisaType = showInput3 ? customVisaType : visaType;

      console.log('Form values before API call:', {
        currentCountry: selectedCountry,
        city: selectedCity,
        nationality: selectedNationality,
        occupation: selectedOccupation,
      });

      // Prepare booking request data
      const requestData = {
        propertyId: parms.propertyId,
        numOfOccupants: finalNumOfOccupants,
        purpose: finalPurpose,
        currentCountry: selectedCountry,
        cityOfResidence: selectedCity,
        nationality: selectedNationality,
        occupation: selectedOccupation,
        startDate: moveInDate,
        endDate: moveOutDate,
        arrivalTime: '14:00-15:00',
        requestDescription: specialRequests,
        name: fullName,
        visaType: finalVisaType,
        totalRent: priceDetails.rentalAmount,
        securityDeposit: priceDetails.securityDeposit,
        totalAmount: priceDetails.totalAmount,
      };

      // Store booking data in sessionStorage before redirecting to Stripe
      sessionStorage.setItem('bookingRequestData', JSON.stringify(requestData));

      // Create Stripe payment session
      const paymentData = {
        ownerId: data?.data?.owner, // assuming your property data has owner field
        propertyId: parms.propertyId,
        amount: priceDetails.totalAmount,
      };

      const response = await payRent(paymentData).unwrap();

      // Redirect to Stripe checkout
      window.location.href = response.url;
    } catch (error) {
      console.error('Error creating payment session:', error);
      toast.error(error?.data?.message || 'Failed to create payment session');
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center justify-center">
        <p className="text-xl font-semibold">Rent Form</p>
      </div>
      <div className="mt-6 grid grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="col-span-12 space-y-4 lg:col-span-4">
          <div>
            <BrowsePropertyCard data={data?.data} />
          </div>

          {/* Show booking details only when dates are selected and calculated */}
          {bookingDetails && (
            <div className="shadow-card rounded-lg border bg-white p-5">
              <h3 className="text-lg font-semibold">Your booking details</h3>
              <div className="mt-6 flex items-stretch justify-between space-x-8">
                <div>
                  <p className="font-medium">Start Date</p>
                  <p className="text-lg font-semibold">{bookingDetails.startDate}</p>
                  <p className="font-medium">14:00-15:00</p>
                </div>
                <div className="w-px bg-gray-300" />
                <div>
                  <p className="font-medium">End Date</p>
                  <p className="text-lg font-semibold">{bookingDetails.endDate}</p>
                  <p className="font-medium">10:00-11:00</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium">Total Length of Stay:</h4>
                <h4 className="text-lg font-semibold">
                  {bookingDetails.totalDays} days ({bookingDetails.totalMonths} month
                  {bookingDetails.totalMonths > 1 ? 's' : ''})
                </h4>
              </div>
            </div>
          )}

          {/* Show price summary only when price is calculated */}
          {priceDetails && (
            <div className="shadow-card rounded-lg border bg-white p-5">
              <h1 className="text-lg font-semibold">Your Price Summary</h1>
              <div className="mt-6 flex justify-between">
                <h3 className="font-medium">Rental Amount:</h3>
                <h3 className="text-base font-bold">${priceDetails.rentalAmount}</h3>
              </div>
              {priceDetails.dealApplied && (
                <div className="mt-2 text-xs text-green-600">
                  Deal applied: {priceDetails.dealApplied.duration} month deal at ${priceDetails.dealApplied.rent}/day
                </div>
              )}
              <div className="mt-3">
                <div className="flex justify-between">
                  <h3 className="font-medium">Security Deposit:</h3>
                  <h3 className="text-base font-bold">${priceDetails.securityDeposit}</h3>
                </div>
                <p className="mt-1 text-xs font-medium text-[#32343CB2]/70">
                  A security deposit is required at the time of booking and will be fully refunded when you vacate the
                  property in its original condition.
                </p>
              </div>
              <div className="mt-5 flex justify-between">
                <h1 className="text-[22px] font-medium">Total Amount</h1>
                <h1 className="text-[22px] font-medium">${priceDetails.totalAmount}</h1>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="Full Legal Name"
                placeholder="Enter first name"
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                label="Current Country"
                options={countries}
                onSelect={selectedValue => {
                  console.log('Country dropdown value received:', selectedValue);
                  const selectedCountryData = countries.find(country => country.value === selectedValue);
                  console.log('Found country data:', selectedCountryData);
                  // Store the full country name instead of the short code
                  setSelectedCountry(selectedCountryData?.option || '');
                  setSelectedCountryCode(selectedValue); // Keep the code for city input enabling
                  console.log('Set selectedCountry to:', selectedCountryData?.option || '');
                }}
                loading={loadingCountries}
                placeholder={loadingCountries ? 'Loading countries...' : 'Select country'}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="City of Residence"
                placeholder={!selectedCountryCode ? 'Select country first' : 'Enter your city'}
                type="text"
                disabled={!selectedCountryCode}
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Dropdown
                label="Nationality"
                options={nationalities}
                loading={loadingNationalities}
                placeholder={loadingNationalities ? 'Loading nationalities...' : 'Select nationality'}
                onSelect={selectedValue => {
                  console.log('Nationality dropdown value received:', selectedValue);
                  const selectedNationalityData = nationalities.find(nat => nat.value === selectedValue);
                  console.log('Found nationality data:', selectedNationalityData);
                  // Store the full nationality name instead of the short form
                  setSelectedNationality(selectedNationalityData?.option || '');
                  console.log('Setting nationality to:', selectedNationalityData?.option || '');
                }}
              />
            </div>
            <div className="col-span-12">
              <Dropdown
                label="Occupation"
                options={occupationOptions}
                onSelect={selectedValue => {
                  console.log('Occupation dropdown value received:', selectedValue);
                  const selectedOccupationData = occupationOptions.find(occ => occ.value === selectedValue);
                  console.log('Found occupation data:', selectedOccupationData);
                  // Store the full occupation name instead of the short form
                  setSelectedOccupation(selectedOccupationData?.option || '');
                  console.log('Setting occupation to:', selectedOccupationData?.option || '');
                }}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="Start Date"
                placeholder="Enter Start Date"
                type="date"
                value={moveInDate}
                onChange={e => setMoveInDate(e.target.value)}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Input
                shadow
                label="End Date"
                placeholder="Enter End Date"
                type="date"
                value={moveOutDate}
                onChange={e => setMoveOutDate(e.target.value)}
              />
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Number of Guests Staying</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions1.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason1" value={label} onChange={handleRentReasonChange1} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput1 && (
                  <div className="mt-8">
                    <Input
                      shadow
                      type="text"
                      placeholder="Enter custom number"
                      value={customOccupants}
                      onChange={e => setCustomOccupants(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6">
              <h1 className="text-[#32343CB2]">Primary Reason for Renting</h1>
              <div className="mt-2.5 grid grid-cols-1 gap-2">
                {reasonOptions2.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-2">
                    <input id={id} type="radio" name="rentReason2" value={label} onChange={handleRentReasonChange2} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
                {showInput2 && (
                  <div className="mt-1">
                    <Input
                      shadow
                      type="text"
                      placeholder="Specify other reason"
                      value={customPurpose}
                      onChange={e => setCustomPurpose(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 sm:col-span-12">
              <h1 className="text-[#32343CB2]">Visa Type for Thailand</h1>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {reasonOptions3.map(({ id, label }) => (
                  <div key={id} className="flex items-center gap-1 rounded px-2 py-1">
                    <input id={id} type="radio" name="rentReason3" value={label} onChange={handleRentReasonChange3} />
                    <label className="text-[13px]" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                ))}
              </div>
              {showInput3 && (
                <div className="mt-1">
                  <Input
                    shadow
                    type="text"
                    placeholder="Specify other visa type"
                    value={customVisaType}
                    onChange={e => setCustomVisaType(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <div>
              <h1 className="text-base font-semibold">Special requests</h1>
              <h1 className="text-xs font-semibold text-[#32343CB2]/70">
                Special requests cannot be guaranteed – but the property will do its best to meet your needs. You can
                always make a special request after your booking is complete!
              </h1>
            </div>
            <div className="mt-5">
              <h1 className="">
                Please write your requests in English or Thai. <span className="text-[10px]">(optional)</span>
              </h1>
              <textarea
                className="h-[200px] w-full rounded-lg border"
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex items-center justify-end">
        <div className="flex gap-4">
          <Button cn="!bg-buttonSecondary hover:!bg-gray-500" text="Cancel" />
          <Button
            text="Pay & Send Rent Request"
            onClick={handleSendRentRequest}
            disabled={isCreatingBooking || isPayingRent}
          />
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
