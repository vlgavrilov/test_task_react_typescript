import React, { useState } from 'react';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PromocodeCard from '../PromocodeCard';
import { ICard, IState } from '../../Interface';
import { POST_FILTER_BONUS } from '../../redux/actionTypes';
import './styles.scss';

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
  const { t } = useTranslation();

  return (
    <div className="services">
      <div className="services__title">
        {' '}
        {t('services')}
      </div>
      <div className="services__filter">
        <div className="services__filter-text">
          {' '}
          {t('filter')}
        </div>
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
            {t('reset')}
          </div>
        </div>
      </div>
      <div>
        {!bonuses.length && !isBonusesLoading && (
        <div className="services__filter-no-found">
          {t('no services found')}
        </div>
        )}
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
