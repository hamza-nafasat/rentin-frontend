// import React from 'react';
// import Input from '@/components/shared/small/Input';

// export default function Move() {
//   return (
//     <div className="flex w-full flex-wrap justify-between">
//       <div className="w-[49%] sm:w-[50%]">
//         <Input shadow value={'2025-05-05'} type={'date'} label={'Move In'} />
//       </div>
//       <div className="w-[49%]">
//         <Input shadow value={'2025-05-05'} type={'date'} label={'Move Out'} />
//       </div>
//     </div>
//   );
// }

import React from 'react';
import Input from '@/components/shared/small/Input';

export default function Move({ moveInDate = '', moveOutDate = '' }) {
  return (
    <div className="flex w-full flex-wrap justify-between">
      <div className="w-[49%] sm:w-[50%]">
        <Input shadow value={moveInDate || '2025-05-05'} type={'date'} label={'Move In'} readOnly />
      </div>
      <div className="w-[49%]">
        <Input shadow value={moveOutDate || '2025-05-05'} type={'date'} label={'Move Out'} readOnly />
      </div>
    </div>
  );
}
