import TenantBookingSummary from '@/components/tenant/bookingSummary/TenantBookingSummary';
import React from 'react';

function BookingSummary() {
  return (
    <div className="grid w-full grid-cols-1 rounded-md bg-white shadow-md">
      <TenantBookingSummary />
    </div>
  );
}

export default BookingSummary;
