import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { IHeader, IState } from '../../Interface';

const Header: React.FC = () => {
  const header = useSelector((state: IState):IHeader => state.header);
  return (
    <div className="header">
      <div className="header__info">
        <div className="header__info-title">Balance</div>
        <div className="header__info-text">{header.balance}</div>
      </div>
      <div className="header__info">
        <div className="header__info-title">Payout</div>
        <div className="header__info-text">{header.next_payout}</div>
      </div>
    </div>
  );
};

export default Header;
