import Image from 'next/image';
import Link from 'next/link';

const getColor = type => {
  switch (type) {
    case 'Most Demanding Property':
      return 'text-[#FDAC3B]';
    case 'Most Viewed Property' || 'Most Rented Property':
      return 'text-[#0245A5]';
    case 'Least Demanding Property':
      return 'text-[#E35454]';
    default:
      return 'text-[#0245A5]';
  }
};

const PropertyCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative basis-full md:basis-[35%]">
        <Image
          src={data?.image}
          width={182}
          height={100}
          className="h-full w-full rounded-sm object-cover"
          alt="property image"
        />
        <div
          className={`absolute top-0 left-0 rounded-br-sm bg-white px-1 py-[3px] text-[10px] font-semibold ${getColor(
            data?.speciality
          )}`}
        >
          {data?.speciality}
        </div>
      </div>
      <div className="flex basis-full flex-col justify-between md:basis-[65%]">
        <div className="flex justify-between gap-5">
          <h4 className="text-textColor text-sm font-medium md:text-base">{data?.name}</h4>
          <span
            className={`${
              data?.rental === 'Rent'
                ? 'bg-[#1D7FFF1A] text-[#0245A5]'
                : 'bg-[#E3545433] text-[#E35454]'
            } h-6 rounded-xs px-[6px] py-[3px] text-xs font-semibold`}
          >
            {data?.rental}
          </span>
        </div>
        <p className="text-xs text-[#969696] md:text-sm">123 Sunset Road, Phuket, Thailand</p>
        <div className="flex items-center justify-between">
          <p className="text-base font-semibold md:text-lg">
            ${data?.price}
            <span className="text-xs text-[#969696]">Per month</span>
          </p>
          <Link
            href=""
            className="rounded-xs bg-[#EEFFF2] p-[6px] text-sm font-semibold text-[#39DA4C]"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
