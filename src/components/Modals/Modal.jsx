<<<<<<< HEAD
import CloseIcon from "../../assets/Icons/CloseIcon";

const Modal = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded shadow-md relative w-[1274px] h-[838px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <CloseIcon
          action={onClose}
          className="absolute top-1 right-1 cursor-pointer hover:scale-105"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Modal;
=======
import CloseIcon from "../../assets/Icons/CloseIcon";

const Modal = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded shadow-md relative w-[1274px] h-[838px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <CloseIcon
          action={onClose}
          className="absolute top-2 right-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Modal;
>>>>>>> b7ecf2887956819aed0507d5ec357a78c09ff6b2
