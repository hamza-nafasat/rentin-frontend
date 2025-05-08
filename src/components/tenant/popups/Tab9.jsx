'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content9 from './Content9';

export default function Tab9() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 9'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={500} onClose={() => setIsModalOpen(false)} title="Property Viewing Request">
            <Content9 />
          </Modal>
        )}
      </div>
    </>
  );
}
