'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content15 from './Content15';

export default function Tab15() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 15'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={500}
            onClose={() => setIsModalOpen(false)}
            title="Select Property For Inspection"
          >
            <Content15 />
          </Modal>
        )}
      </div>
    </>
  );
}
