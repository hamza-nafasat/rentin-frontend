import MyProperties from '@/components/owner/properties/MyProperties';
import PropertyHeader from '@/components/owner/properties/PropertyHeader';
import TopCards from '@/components/owner/properties/TopCards';
import { propertiesCardsData } from '@/data/data';

const Properties = () => {
  return (
    <div>
      <PropertyHeader title={'Properties Details'} />
      <TopCards data={propertiesCardsData} />
      <MyProperties />
    </div>
  );
};

export default Properties;
