import { homeCardsData } from '@/data/data';
import Image from 'next/image';

const HomeCards = ({ data }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 px-1 md:gap-6 lg:grid-cols-5 xl:grid-cols-5">
      {data.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>
  );
};

export default HomeCards;

const Card = ({ card }) => {
  return (
    <div className="shadow-card rounded-lg bg-white p-4">
      <div className="flex items-center gap-3">
        <Image src={card.img} width={30} height={30} alt="image" />
        <h6 className="text-textPrimary text-sm font-medium">{card.title}</h6>
      </div>
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <h4 className="text-textPrimary text-lg font-medium md:text-2xl">{card.value}</h4>
          {card.valueAdded >= 10 ? (
            <span className="text-md rounded-xs bg-[#EEFFF2] px-[6px] py-[2px] font-extrabold text-[#39DA4C]">
              +{card.valueAdded}%
            </span>
          ) : (
            <span className="text-md rounded-xs bg-[#E3545430] px-[6px] py-[2px] font-extrabold text-[#E35454]">
              -{card.valueAdded}%
            </span>
          )}
        </div>
        <p className="text-textSecondary mt-2 text-xs" dangerouslySetInnerHTML={{ __html: card.para }}></p>
      </div>
    </div>
  );
};
