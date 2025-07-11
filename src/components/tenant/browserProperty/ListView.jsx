// import { houses } from '@/data/data'
import React, { useState } from 'react';
import BrowsePropertyCard from './BrowsePropertyCard';
import PropertyDetailsSlider from './PropertyDetailsSlider';
import Modal from '@/components/shared/small/Modal';
import Content1 from '../popups/Content1';
import Content2 from '../popups/Content2';
import Content4 from '../popups/Content4';
import Content5 from '../popups/Content5';

function ListView({ handleCloseSlider, handleCardClick, selectedProperty, houses }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  return (
    <div className="grid h-[calc(100vh-375px)] grid-cols-1 gap-6 overflow-y-scroll pt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {houses?.map(property => (
        <div key={property._id} onClick={() => handleCardClick(property)}>
          <BrowsePropertyCard data={property} />
        </div>
      ))}
      <div
        className={`shadow-card fixed top-24 right-0 h-full w-full bg-white transition-transform duration-300 lg:w-1/3 xl:w-7/23 ${
          selectedProperty ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        {selectedProperty && (
          <PropertyDetailsSlider data={selectedProperty} setIsModalOpen={setIsModalOpen} onClose={handleCloseSlider} />
        )}
      </div>

      {isModalOpen && (
        <Modal
          width={'w-full sm:w-[580px]'}
          title={'Confirm Your Viewing Request'}
          onClose={() => setIsModalOpen(false)}
        >
          <Content1
            visitPrice={selectedProperty?.visitPrice}
            setIsModalOpen={setIsModalOpen}
            setIsModalOpen1={setIsModalOpen1}
          />
        </Modal>
      )}
      {isModalOpen1 && (
        <Modal width={'w-full sm:w-[550px]'} onClose={() => setIsModalOpen1(false)} title="Visit Request">
          <Content2 data={selectedProperty} setIsModalOpen1={setIsModalOpen1} setIsModalOpen2={setIsModalOpen2} />
        </Modal>
      )}
      {isModalOpen2 && (
        <Modal width={'w-full sm:w-[550px]'} onClose={() => setIsModalOpen2(false)} title="Preview Your Visit Request">
          <Content4 data={selectedProperty} setIsModalOpen2={setIsModalOpen2} setIsModalOpen3={setIsModalOpen3} />
        </Modal>
      )}
      {isModalOpen3 && (
        <Modal width={'w-full sm:w-[600px]'} onClose={() => setIsModalOpen3(false)} title="Viewing Request Sent!">
          <Content5 />
        </Modal>
      )}
    </div>
  );
}

export default ListView;
