import NotificationList from '@/components/owner/notification/NotificationList';
import { notificationData } from '@/data/data';
import React from 'react';

function AdminNotification() {
  return (
    <div className="shadow-card rounded-lg bg-white px-3.5 py-5">
      <h3 className="text-textPrimary mb-3.5 text-lg font-semibold md:text-[22px]">Notification</h3>
      <div>
        <NotificationList alerts={notificationData} />
      </div>
    </div>
  );
}

export default AdminNotification;
