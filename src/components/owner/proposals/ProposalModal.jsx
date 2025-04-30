import { RxCross2 } from 'react-icons/rx';

// eslint-disable-next-line react/prop-types
const ProposalModal = ({ onClose, children, width }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`custom-scroll h-fit max-h-full overflow-y-auto rounded-[12px] bg-white shadow-lg ${
          width ? width : 'w-[300px] md:w-[400px] lg:w-[700px] xl:w-[900px]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="mt-4 md:mt-6">{children}</div>
      </div>
    </div>
  );
};

export default ProposalModal;
