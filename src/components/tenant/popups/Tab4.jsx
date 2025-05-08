'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import Content4 from './Content4';

export default function Tab3() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'Button 4'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={200}
            onClose={() => setIsModalOpen(false)}
            title="Preview Your Visit Request"
          >
            <Content4 />
          </Modal>
        )}
      </div>
    </>
  );
}
