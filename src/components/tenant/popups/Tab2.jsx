'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content2 from './Content2';

export default function Tab2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 2'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal width={150} onClose={() => setIsModalOpen(false)} title="Visit Request">
            <Content2 />
          </Modal>
        )}
      </div>
    </>
  );
}
