import { agentCardsData } from '@/data/data';
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
    <div className="rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
      <div className="flex items-center gap-3">
        <Image src={card.img} width={30} height={30} alt="image" />
        <h6 className="text-textPrimary text-sm font-medium">{card.title}</h6>
      </div>
      <div className="mt-6">
        <div className="flex items-end gap-2">
          <h4 className="text-textPrimary text-lg font-medium md:text-2xl">{card.value}</h4>
          <span className="text-textSecondary text-base font-medium">
            {card.title === 'Total Properties'
              ? 'Total'
              : card.title === 'Free Property'
                ? 'Free'
                : card.title === 'Rented Property'
                  ? 'Rented'
                  : card.title === 'Pending Approvals'
                    ? 'Pending'
                    : 'Agents'}
          </span>
        </div>
        <p className="text-textSecondary mt-2 text-xs" dangerouslySetInnerHTML={{ __html: card.para }}></p>
      </div>
    </div>
  );
};
