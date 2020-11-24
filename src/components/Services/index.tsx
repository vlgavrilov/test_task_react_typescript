import React, { useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import PromocodeCard from '../PromocodeCard';
import { ICard, IState } from '../../Interface';
import { POST_FILTER_BONUS } from '../../redux/actionTypes';

const Services: React.FC = () => {
  const [filter, setFilter] = useState('');
  const bonuses = useSelector((state: IState):ICard[] => state.bonuses);
  const isBonusesLoading = useSelector((state: IState):boolean => state.isBonusesLoading);
  const dispatch = useDispatch();
  const action = (value:string) => dispatch({ type: POST_FILTER_BONUS, value });
  const filterHandler = (value:string):void => {
    action(value);
    setFilter(value);
  };

  return (
    <div className="services">
      <div className="services__title"> Services</div>
      <div className="services__filter">
        <div className="services__filter-text"> FILTER</div>
        <div className="services__filter-block">
          <input
            data-testid="input-filter"
            className="services__filter-block-input"
            onChange={(e) => filterHandler(e.target.value)}
            value={filter}
          />
          <div
            role="button"
            data-testid="button-reset-filter"
            tabIndex={-3}
            className="services__filter-block-button"
            onKeyPress={() => filterHandler('')}
            onClick={() => filterHandler('')}
          >
            {' '}
            Reset
          </div>
        </div>
      </div>
      <div>
        {!bonuses.length && !isBonusesLoading && <div className="services__filter-no-found"> No services found </div>}
        {isBonusesLoading && <div data-testid="loader" className="loader" />}
        {!isBonusesLoading && bonuses.map((item) => (
          <PromocodeCard
            id={item.id}
            key={item.id}
            isUsed={item.isUsed}
            title={item.title}
            description={item.description}
            promocode={item.promocode}
            link={item.promocode}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
