import { Dot } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

function AgentProfile() {
  const data = [
    {
      images: [
        '/images/default/agentportfolio1.png',
        '/images/default/agentportfolio2.png',
        '/images/default/agentportfolio3.png',
        '/images/default/agentportfolio3.png',
        '/images/default/agentportfolio2.png',
        '/images/default/agentportfolio1.png',
      ],
      apartmentassist: '5,000-15,000 (One-time)',
      commision: "1 Month's Rent (Commission)",
      inspectionfee: '3,000-10,000',
      documentationfee: '5,000-20,000',
      markitingfee: '2,000-10,000',
    },
  ];
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} className="mt-3 flex flex-col gap-3 sm:gap-13 lg:flex-row">
          <div className="w-[100%] lg:w-[50%]">
            <h1 className="mb-3 text-[22px] font-semibold text-[#1F242F]">Portfolio</h1>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2">
              {item.images.map((img, idx) => (
                <Image
                  className={`${idx % 6 === 2 || idx % 6 === 3 ? 'col-span-2' : 'col-span-1'} h-[210px] w-[100%] rounded-[12px] object-cover lg:h-fit`}
                  key={idx}
                  src={img}
                  width={115}
                  height={102}
                  alt={`Image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="mb-3 text-[22px] font-semibold text-[#1F242F]">Services & Packages</h1>
            <div>
              <h1 className="mb-3 text-[18px] font-[500] text-[#1F242F]">📌 Rental Services</h1>

              <ul className="px-3 leading-4.5">
                <li className="mb-3 flex items-center gap-1 text-[16px] text-[#5F5F5F]">
                  <GoDotFill fontSize={10} />
                  Apartment Assistance: <span className="font-semibold">{item.apartmentassist}</span>
                </li>
                <li className="mb-3 flex items-center gap-1 text-[16px] text-[#5F5F5F]">
                  <GoDotFill fontSize={10} />
                  House Assistance: <span className="font-semibold">{item.commision}</span>
                </li>
              </ul>
            </div>
            <div>
              <h1 className="mb-3 text-[18px] font-[500] text-[#1F242F]">📌 Additional Services</h1>
              <ul className="px-2 leading-4.5">
                <li className="mb-3 flex items-center gap-1 text-[16px] text-[#5F5F5F]">
                  <GoDotFill fontSize={10} />
                  Property Inspection: <span className="font-semibold">{item.inspectionfee}</span>
                </li>
                <li className="mb-3 flex gap-1 text-[16px] text-[#5F5F5F]">
                  <GoDotFill fontSize={10} />
                  Legal Documentation: <span className="font-semibold">{item.documentationfee}</span>
                </li>
                <li className="mb-3 flex gap-1 text-[16px] text-[#5F5F5F]">
                  <GoDotFill fontSize={10} />
                  Marketing & Listing Services:<span className="font-semibold">{item.markitingfee}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AgentProfile;
