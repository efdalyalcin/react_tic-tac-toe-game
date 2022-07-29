import './Toggler.scss';

export const Toggler: React.FC = () => {
  return (
    <div className="switch-button">
      <input className="switch-button-checkbox" type="checkbox" />
      <label className="switch-button-label">
        <span className="switch-button-label-span">Novice</span>
      </label>
    </div>
  );
};
