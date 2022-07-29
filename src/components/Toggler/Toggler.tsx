import './Toggler.scss';

type Props = {
  isChecked: boolean;
  handleIsChecked: () => void;
};

export const Toggler: React.FC<Props> = ({isChecked, handleIsChecked}) => {
  return (
    <div className="switch-button">
      <input 
        className="switch-button-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleIsChecked}
      />
      <label className="switch-button-label">
        <span className="switch-button-label-span">Novice</span>
      </label>
    </div>
  );
};
