'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content14 from './Content14';

export default function Tab14() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 14'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={200} onClose={() => setIsModalOpen(false)} title="Booking Successful! 🎉">
            <Content14 />
          </Modal>
        )}
      </div>
    </>
  );
}
