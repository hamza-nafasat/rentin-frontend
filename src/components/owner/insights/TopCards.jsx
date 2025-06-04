import { insightCardsData } from '@/data/data';
import Image from 'next/image';

const TopCards = ({ data }) => {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-5">
      {data.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>
  );
};
export default TopCards;

const Card = ({ card }) => {
  return (
    <div className="shadow-card rounded-lg bg-white p-4">
      <div className="flex items-center gap-3">
        <Image src={card.img} width={30} height={30} alt="image" />
        <h6 className="text-textPrimary text-sm font-medium">{card.title}</h6>
      </div>
      <div className="mt-6">
        <div className="flex items-end gap-2">
          <div className="flex items-center gap-2">
            <h4 className="text-textPrimary text-lg font-medium md:text-2xl">{card.value}</h4>
            <div className="flex h-4 w-8 items-center justify-center bg-[#EEFFF2]">
              <span className="text-md bg-[#EEFFF2] font-bold text-[#39DA4C]">{card.percentage}</span>
            </div>
          </div>
        </div>
        <p className="text-textSecondary mt-2 text-xs" dangerouslySetInnerHTML={{ __html: card.para }}></p>
      </div>
    </div>
  );
};
