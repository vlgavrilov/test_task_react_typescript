import React, { ReactNode } from 'react';
import './styles.scss';
import logo from '../../icon/t_logo_40x40.svg';
import menu_icon from '../../icon/menu_icon.svg';
import menu_icon_active from '../../icon/menu_icon_active.svg';

interface IProps {
  children: ReactNode;
  // any other props that come into the component
}
// eslint-disable-next-line react/prop-types,@typescript-eslint/no-unused-vars
const NavigateMenu = ({ children }: IProps) => (
  <div>
    <div className="navigate-menu">
      <img className="navigate-menu__logo" src={logo} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
      <img className="navigate-menu__icon" src={menu_icon_active} alt="" />
      <img className="navigate-menu__icon" src={menu_icon} alt="" />
    </div>
    <div className="children">
      {children}
    </div>
  </div>
);

export default NavigateMenu;
