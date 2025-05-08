'use client';
import React, { useState } from 'react';
import Modal from '@/components/shared/small/Modal';
import Button from '@/components/shared/small/Button';
import QrcodeContent from './QrcodeContent';

export default function QrcodeBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div>
        <Button text={'QR Code'} onClick={() => setIsModalOpen(true)} />
      </div>
      <div>
        {isModalOpen && (
          <Modal
            width={500}
            onClose={() => setIsModalOpen(false)}
            title="Your Visit QR Code is Here!"
          >
            <QrcodeContent />
          </Modal>
        )}
      </div>
    </>
  );
}
