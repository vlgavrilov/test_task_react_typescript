import React from 'react';
import './styles.scss';
import PromocodeCard from '../PromocodeCard';

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
      <PromocodeCard />
      <PromocodeCard />
      <PromocodeCard />
    </div>
  </div>
);

export default Services;
