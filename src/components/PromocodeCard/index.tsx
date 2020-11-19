import React, { useRef } from 'react';
import './styles.scss';
import icon_copy from '../../icon/copy.svg';

const PromocodeCard = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const { title, description, promocode } = { title: 'Sitecostructor.io', description: 'Description', promocode: 'itpromocodes' };
  const copyPromo = () => {
    if (inputEl.current) {
      inputEl.current?.select();
      document.execCommand('copy');
    }
  };
  return (
    <div className="promocode-card">
      <div className="promocode-card__describe">
        <div className="promocode-card__describe-title">{title}</div>
        <div className="promocode-card__describe-description">{description}</div>
      </div>
      <div className="promocode-card__copy">
        <div className="promocode-card__copy-title">Promocode</div>
        <div role="button" tabIndex={-1} className="promocode-card__copy-field" onKeyPress={copyPromo} onClick={copyPromo}>
          <input className="promocode-card__copy-field-input" onKeyPress={copyPromo} id="inputText" value={promocode} ref={inputEl} />
          <img className="promocode-card__copy-field-icon" src={icon_copy} alt="copy" />

        </div>
      </div>
      <div className="promocode-card__activate">
        <div className="promocode-card__activate-button">Activate bonus</div>
      </div>
    </div>
  );
};

export default PromocodeCard;
