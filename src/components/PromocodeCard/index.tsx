import React, { useRef } from 'react';
import './styles.scss';
import { useDispatch } from 'react-redux';
import icon_copy from '../../icon/copy.svg';
import { ICard } from '../../Interface';
import { POST_ACTIVATE_BONUS } from '../../data/actionTypes';

const PromocodeCard: React.FC<ICard> = ({
  title, description, promocode, id, isUsed,
}) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const copyPromo = (): void => {
    if (inputEl.current) {
      inputEl.current.select();
      document.execCommand('copy');
    }
  };
  const dispatch = useDispatch();
  const action = (type:string) => dispatch({ type, id });
  return (
    <div className="promocode-card">
      <div className="promocode-card__describe">
        <div className="promocode-card__describe-title">{title}</div>
        <div className="promocode-card__describe-description">{description}</div>
      </div>
      <div className="promocode-card__copy">
        <div className="promocode-card__copy-title">Promocode</div>
        <div role="button" tabIndex={-1} className="promocode-card__copy-field" onKeyPress={copyPromo} onClick={copyPromo}>
          <input className="promocode-card__copy-field-input" readOnly onKeyPress={copyPromo} defaultValue={promocode} ref={inputEl} />
          <img className="promocode-card__copy-field-icon" src={icon_copy} alt="copy" />
        </div>
      </div>
      <div className="promocode-card__activate">
        {isUsed && (
          <div className="promocode-card__activate-message">
            Activated!
          </div>
        )}
        {!isUsed && (
          <div
            className="promocode-card__activate-button"
            role="button"
            tabIndex={-1}
            onKeyPress={() => action(POST_ACTIVATE_BONUS)}
            onClick={() => action(POST_ACTIVATE_BONUS)}
          >
            Activate bonus
          </div>
        )}
      </div>
    </div>
  );
};

export default PromocodeCard;
