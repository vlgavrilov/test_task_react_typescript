import React from 'react';
import './styles.scss';
import { mockData } from '../../helpers/mockData';

const Header: React.FC = () => (
  <div className="header">
    <div className="header__info">
      <div className="header__info-title">Balance</div>
      <div className="header__info-text">{mockData.header.balance}</div>
    </div>
    <div className="header__info">
      <div className="header__info-title">Payout</div>
      <div className="header__info-text">{mockData.header.next_payout}</div>
    </div>
  </div>
);

export default Header;
