'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content7 from './Content7';

export default function Tab7() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 7'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={500}
            onClose={() => setIsModalOpen(false)}
            title="Who Will Show the Property?"
          >
            <Content7 />
          </Modal>
        )}
      </div>
    </>
  );
}
