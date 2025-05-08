'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content16 from './Content16';

export default function Tab16() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 16'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={200} onClose={() => setIsModalOpen(false)} title="Contract Verification">
            <Content16 />
          </Modal>
        )}
      </div>
    </>
  );
}
