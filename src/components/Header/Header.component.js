import React from 'react';
import './header.component.scss';
import { TITLE, SUBTITLE } from '../../constants/strings';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>Reset Fields</li>
        <li>GeekTrust Website</li>
      </ul>
    </nav>
    <h1>{ TITLE }</h1>
    <p>{ SUBTITLE }</p>
  </header>
);

export default Header;
