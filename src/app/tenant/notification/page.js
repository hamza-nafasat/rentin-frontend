import TenantNotification from '@/components/tenant/notification/TenantNotification';
import { notificationData } from '@/data/data';
import React from 'react';

function Notification() {
  return (
    <div className="rounded-lg bg-white px-3.5 py-5">
      <h3 className="text-textColor mb-3.5 text-lg font-semibold md:text-[22px]">Notification</h3>
      <div>
        <TenantNotification alerts={notificationData} />
      </div>
    </div>
  );
}

export default Notification;
