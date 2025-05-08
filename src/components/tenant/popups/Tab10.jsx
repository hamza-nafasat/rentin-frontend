'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content10 from './Content10';

export default function Tab10() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 10'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={500}
            onClose={() => setIsModalOpen(false)}
            title="Property Showing Request Accepted!"
          >
            <Content10 />
          </Modal>
        )}
      </div>
    </>
  );
}
