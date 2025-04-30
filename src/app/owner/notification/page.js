// import NotificationList from "@/components/owner/notification/NotificationList";

import NotificationList from '@/components/owner/notification/NotificationList';
import { notificationData } from '@/data/data';

const Notification = () => {
  return (
    <div className="rounded-lg bg-white px-3.5 py-5">
      <h3 className="text-textColor mb-3.5 text-lg font-semibold md:text-[22px]">Notification</h3>
      <div>
        <NotificationList alerts={notificationData} />
      </div>
    </div>
  );
};

export default Notification;
