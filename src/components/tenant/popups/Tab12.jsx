'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content12 from './Content12';

export default function Tab12() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 12'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={200} onClose={() => setIsModalOpen(false)} title="Booking Request">
            <Content12 />
          </Modal>
        )}
      </div>
    </>
  );
}
