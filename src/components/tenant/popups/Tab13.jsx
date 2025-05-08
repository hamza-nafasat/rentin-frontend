'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content13 from './Content13';

export default function Tab13() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 13'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={200} onClose={() => setIsModalOpen(false)} title="Contract Verification">
            <Content13 />
          </Modal>
        )}
      </div>
    </>
  );
}
