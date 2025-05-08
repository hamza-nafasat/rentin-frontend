'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content3 from './Content3';

export default function Tab3() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 3'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={200} onClose={() => setIsModalOpen(false)} title="Visit Request">
            <Content3 />
          </Modal>
        )}
      </div>
    </>
  );
}
