import ProposalSummary from '@/components/owner/proposals/ProposalSummary';

const Proposals = () => {
  return (
    <div>
      <h3 className="text-textColor mb-4 text-lg font-semibold md:text-[22px]">Proposal Details</h3>
      <ProposalSummary />
    </div>
  );
};

export default Proposals;
