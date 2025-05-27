import TenantBookingSummary from '@/components/tenant/bookingSummary/TenantBookingSummary';
import React from 'react';

function BookingSummary() {
  return (
    <div className="shadow-card grid w-full grid-cols-1 rounded-lg bg-white">
      <TenantBookingSummary />
    </div>
  );
}

export default BookingSummary;
