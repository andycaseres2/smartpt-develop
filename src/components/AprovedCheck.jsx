import CheckIcon from "../assets/Icons/CheckIcon";
import CloseIcon from "../assets/Icons/CloseIcon";

const AprovedCheck = ({ approved }) => {
  return (
    <div className="w-full flex justify-center items-center">
      {approved === 1 ? <CheckIcon /> : approved === 0 ? <CloseIcon /> : null}
    </div>
  );
};

export default AprovedCheck;
