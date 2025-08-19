import React from 'react';
import { RxCross2 } from 'react-icons/rx';

function PaymentModal({ children, onClose }) {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000] p-6"
      onClick={onClose}
    >
      <div
        className={`custom-scroll shadow-card h-fit max-h-full w-[586px] overflow-y-auto rounded-[12px] bg-white p-4 md:p-6`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-end">
          <div onClick={onClose} className="bg-primary cursor-pointer rounded-full p-2">
            <RxCross2 color="#fff" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default PaymentModal;
