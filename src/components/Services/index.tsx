import React, { useState } from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import PromocodeCard from '../PromocodeCard';
import { ICard, IServerResponse } from '../../Interface';

const Services: React.FC = () => {
  const [filter, setFilter] = useState('');
  const bonuses = useSelector((state: IServerResponse):ICard[] => state.bonuses);

  return (
    <div className="services">
      <div className="services__title"> Services</div>
      <div className="services__filter">
        <div className="services__filter-text"> Filter</div>
        <div className="services__filter-block">
          <input
            className="services__filter-block-input"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          />
          <div className="services__filter-block-button"> Reset</div>
        </div>
      </div>
      <div>
        {bonuses.map((item) => (
          <PromocodeCard
            key={item.title + item.promocode}
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
