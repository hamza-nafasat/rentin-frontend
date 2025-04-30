import React from 'react';

function AgentTransactionSlip({ selectedRow }) {
  const { paymentStatus, invoiceID, date, amount } = selectedRow;

  return (
    <div className="h-full p-4">
      <div className="mt-[28px] flex flex-col items-center justify-center gap-2">
        <span className="text-2xl font-semibold text-[#32343C]">Transaction {paymentStatus}</span>
        <p className="text-2xl text-[#32343C]">Invoice ID {invoiceID}</p>
        <p className="text-lg text-[#32343C]">Date: {date}</p>
        <p className="mt-4 mb-3.5 text-3xl font-semibold text-[#32343C]">{amount}</p>
      </div>
      <div className="h-full">
        <div className="border-t-2 border-dashed"></div>
        <div className="flex h-[92px] items-center justify-between">
          <div>
            <p>From</p>
          </div>
          <div className="flex flex-col items-end">
            <p>Michal</p>
            <p>00000000000000000</p>
          </div>
        </div>
        <div className="border-t-2"></div>
        <div className="flex h-[92px] items-center justify-between">
          <div>
            <p>To</p>
          </div>
          <div className="flex flex-col items-end">
            <p>Michal</p>
            <p>00000000000000000</p>
          </div>
        </div>
        <div className="border-t-2"></div>
        <div className="flex h-[75px] items-center justify-between">
          <div>
            <p>Transaction Type</p>
          </div>
          <div>
            <p>Michal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgentTransactionSlip;
