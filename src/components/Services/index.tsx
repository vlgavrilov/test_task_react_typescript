import React from 'react';
import './styles.scss';
import PromocodeCard from '../PromocodeCard';
import mockData from '../../helpers/mockData';

const Services = () => (
  <div className="services">
    <div className="services__title"> Services </div>
    <div className="services__filter">
      <div className="services__filter-text"> Filter </div>
      <div className="services__filter-block">
        <input className="services__filter-block-input" />
        <div className="services__filter-block-button"> Reset </div>
      </div>
    </div>
    <div>
      {mockData.bonuses.map((item) => (
        <PromocodeCard
          title={item.title}
          description={item.description}
          promocode={item.promocode}
        />
      ))}

    </div>
  </div>
);

export default Services;
