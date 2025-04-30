import Button from '@/components/shared/small/Button';
import React from 'react';

function ViewRequest({ selectedRow }) {
  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold">General Info</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Name</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Phone</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Request Date</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
          </div>
          <div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Email</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Register As</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
            <div className="mt-3 border-b">
              <h1 className="text-base font-medium">Status</h1>
              <h1 className="py-3 text-base font-medium text-[#37415199]/60">Name</h1>
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full items-center justify-between">
          <Button
            width={'94px'}
            height={'32px'}
            cn={'!rounded-md !text-sm !font-semibold !bg-[#E35454] px-[20px] py-[8px] '}
            text={'Reject'}
          />
          <Button
            width={'94px'}
            height={'32px'}
            cn={'!rounded-md !text-sm !font-semibold px-[20px] py-[8px]'}
            text={'Approve'}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewRequest;
