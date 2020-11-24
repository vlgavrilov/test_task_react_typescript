import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { IHeader, IState } from '../../Interface';
import currencyFormatter from '../../helpers/formater';

const Header: React.FC = () => {
  const header = useSelector((state: IState):IHeader => state.header);
  return (
    <div className="header">
      <div className="header__info">
        <div data-testid="header-balance-title" className="header__info-title">Balance</div>
        <div data-testid="header-balance-text" className="header__info-text">
          {header.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          {' '}
          {currencyFormatter[header.currency]}
        </div>
      </div>
      <div className="header__info">
        <div data-testid="header-payout-title" className="header__info-title">Payout</div>
        <div data-testid="header-payout-text" className="header__info-text">
          {header.next_payout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
          {' '}
          {' '}
          {currencyFormatter[header.currency]}
        </div>
      </div>
    </div>
  );
};

export default Header;
