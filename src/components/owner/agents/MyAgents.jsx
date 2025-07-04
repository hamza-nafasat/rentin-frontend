'use client';
import React, { useState } from 'react';
import AgentCardHeader from './AgentCardHeader';
import AgentCard from './AgentCard';
import { myAgentData, myPropertiesData } from '@/data/data';
import Modal from '@/components/shared/small/Modal';
import Content8 from '@/components/tenant/popups/Content8';
import DataState from '@/components/shared/small/DataState';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setAgentId } from '@/features/selectedId/selecetdId';

function MyAgents({ role, data, isLoading, isError, error }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const openRequestModal = () => {
    setIsModalOpen(true);
  };
  const closeRequestModal = () => {
    setIsModalOpen(false);
  };
  const buildingId = useSelector(state => state.selectedId.buildingId);

  console.log('buildingId', buildingId);

  const sendContract = id => {
    dispatch(setAgentId(id));
    router.push('/owner/messages');
  };
  const sendRequest = () => {
    console.log('send request');
  };
  const cancelHandle = () => {
    console.log('cancelHandle request');
  };
  console.log('qwertyuiop', data);
  // ───────── helpers ────────────────────────────────────────────────────────────
  /**
   * Normalise the two possible API shapes into
   * a single  ‑‑>  Agent[]                       (plain objects)
   *
   * Shape A: { success, data: [ { agent, properties } … ] }
   * Shape B: { success, data: { users: [ agent … ], … } }
   */
  /**
   * Always return an array of plain agent objects.
   */
  const getAgents = payload => {
    if (!payload) return [];

    // ➊ If the API wrapped everything in { data: … }
    const root = payload.data ?? payload; // fall back to payload itself

    // ➋ SHAPE B – plain agents already in root.users
    if (Array.isArray(root.users)) {
      return root.users;
    }

    // ➌ SHAPE A – root is [ { agent, properties } … ]
    if (Array.isArray(root)) {
      return root
        .map(item => item?.agent) // pull out nested agent
        .filter(Boolean); // drop undefined / null
    }

    // ➍ Nothing matched
    return [];
  };

  const agents = getAgents(data);
  // console.log('getAgents', getAgents);

  return (
    <section className="mt-4 rounded-lg bg-white p-4" style={{ boxShadow: '0px 2px 12px 0px #3582E71A' }}>
      {isModalOpen && (
        <Modal width={500} onClose={closeRequestModal} title="Visit Request">
          <Content8 cancelHandle={cancelHandle} acceptHandle={sendRequest} />
        </Modal>
      )}
      <AgentCardHeader />
      <div className="scroll-0 mt-5 grid max-h-[530px] grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
        {/* {myAgentData.map((card, i) => (
          <AgentCard data={card} key={i} role={role} sendContract={sendContract} />
        ))} */}
        <DataState
          isLoading={isLoading}
          isError={isError}
          error={error}
          data={data}
          renderItem={agent => <AgentCard data={agent} key={agent._id} role={role} sendContract={sendContract} />}
        />
      </div>
    </section>
  );
}

export default MyAgents;
