import React from 'react';
import Input from '@/components/shared/small/Input';
import Image from 'next/image';

function DetailedEdit() {
  return (
    <div>
      <form action="">
        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
          <Input shadow type={'text'} label={'Country'} placeholder={'Thailand'} />
          <Input shadow type={'text'} label={'State/Province'} placeholder={'xyz'} />
          <Input shadow type={'text'} label={'City'} placeholder={'XYZ city'} />
          <Input shadow type={'text'} label={'Area'} placeholder={'XYZ Area'} />
          <Input shadow type={'text'} label={'Available Days '} placeholder={'Mon-Sat'} />
          <Input shadow type={'text'} label={'Experiences'} placeholder={'3 Years'} />
          <Input shadow type={'time'} label={'Available Hours ( Start At )'} placeholder={'11 am'} />
          <Input shadow type={'time'} label={'Available Hours ( Close At )'} placeholder={'12 pm'} />
          <Input shadow type={'text'} label={'Property Showing Base Price'} placeholder={'$ 500.00'} />
          <Input shadow type={'text'} label={'Property Inspection Base Price'} placeholder={'$1200.00'} />
        </div>
      </form>
    </div>
  );
}

export default DetailedEdit;
