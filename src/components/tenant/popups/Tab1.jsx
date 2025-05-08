'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content1 from './Content1';

export default function Tab1() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 1'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={500}
            onClose={() => setIsModalOpen(false)}
            title="Confirm Your Viewing Request"
          >
            <Content1 />
          </Modal>
        )}
      </div>
    </>
  );
}
