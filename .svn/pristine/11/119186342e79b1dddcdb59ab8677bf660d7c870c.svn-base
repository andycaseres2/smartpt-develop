import CloseIcon from "../../assets/Icons/CloseIcon";
import Button from "../Buttons/Button";

const ModalGeneric = ({
  onClose,
  action,
  text,
  designModal,
  textOnClose,
  textAction,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded shadow-md relative ${designModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full p-6 flex flex-col justify-center items-center gap-6">
          <div className="flex w-full flex-col gap-2 text-center items-center">
            {text ? (
              <h2 className="text-xl text-primary-red-600 font-semibold">
                {text}
              </h2>
            ) : (
              <h2 className="text-xl text-primary-red-600 font-semibold">
                ¿Estas seguro de realizar esta accion?
              </h2>
            )}
          </div>
          <div className="w-full flex justify-center gap-4">
            {onClose && <Button action={onClose} text={textOnClose} />}
            {action && <Button action={action} text={textAction} />}
          </div>
        </div>
        <CloseIcon
          action={onClose}
          className="absolute top-2 right-2 cursor-pointer hover:scale-105"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default ModalGeneric;
