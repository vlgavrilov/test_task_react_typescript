import React, { useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import PromocodeCard from '../PromocodeCard';
import { ICard, IServerResponse } from '../../Interface';
import { POST_FILTER_BONUS } from '../../data/actionTypes';

const Services: React.FC = () => {
  const [filter, setFilter] = useState('');
  const bonuses = useSelector((state: IServerResponse):ICard[] => state.bonuses);
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
        <div className="services__filter-text"> Filter</div>
        <div className="services__filter-block">
          <input
            className="services__filter-block-input"
            onChange={(e) => filterHandler(e.target.value)}
            value={filter}
          />
          <div role="button" tabIndex={-3} className="services__filter-block-button" onKeyPress={() => filterHandler('')} onClick={() => filterHandler('')}> Reset</div>
        </div>
      </div>
      <div>
        {bonuses.map((item) => (
          <PromocodeCard
            id={item.id}
            key={item.id}
            isUsed={item.isUsed}
            title={item.title}
            description={item.description}
            promocode={item.promocode}
            link={item.promocode}
          />
          // The key must be unique and come from the server.
          // But there is no ID in the example server data
        ))}
      </div>
    </div>
  );
};

export default Services;
