'use client';
import React, { useState } from 'react';
import AgentCardHeader from './AgentCardHeader';
import AgentCard from './AgentCard';
import { myAgentData, myPropertiesData } from '@/data/data';
import Modal from '@/components/shared/small/Modal';
import Content8 from '@/components/tenant/popups/Content8';

function MyAgents({ role }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openRequestModal = () => {
    setIsModalOpen(true);
  };
  const closeRequestModal = () => {
    setIsModalOpen(false);
  };
  const sendContract = () => {
    console.log('senrtt');
    openRequestModal();
  };
  const sendRequest = () => {
    console.log('send request');
  };
  const cancelHandle = () => {
    console.log('cancelHandle request');
  };
  return (
    <section className="mt-4 rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
      {isModalOpen && (
        <Modal width={500} onClose={closeRequestModal} title="Visit Request">
          <Content8 cancelHandle={cancelHandle} acceptHandle={sendRequest} />
        </Modal>
      )}
      <AgentCardHeader />
      <div className="scroll-0 mt-5 grid max-h-[530px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {myAgentData.map((card, i) => (
          <AgentCard data={card} key={i} role={role} sendContract={sendContract} />
        ))}
      </div>
    </section>
  );
}

export default MyAgents;
