import { RxCross2 } from 'react-icons/rx';

// eslint-disable-next-line react/prop-types
const Modal = ({ title, onClose, children, width, headingIcon }) => {
  return (
    <div
      className="modal fixed inset-0 top-0 left-0 z-[99] flex items-center justify-center bg-[#000000c5] p-6"
      onClick={onClose}
    >
      <div
        className={`custom-scroll shadow-card h-fit max-h-full overflow-y-auto rounded-[12px] bg-white p-4 md:p-6 ${
          width ? width : 'w-[300px] md:w-[400px] lg:w-[700px] xl:w-[900px]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <span className="flex gap-1">
            {headingIcon && <span>{headingIcon}</span>}
            <h2 className="text-base font-semibold text-[#111111] md:text-xl">{title}</h2>
          </span>
          <div className="bg-primary cursor-pointer rounded-full p-2" onClick={onClose}>
            <RxCross2 color="#fff" />
          </div>
        </div>
        <div className="mt-4 w-full overflow-auto md:mt-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
