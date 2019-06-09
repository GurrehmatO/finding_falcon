import React from 'react';
import { Link } from 'react-router-dom';
import './header.component.scss';
import { TITLE, SUBTITLE } from '../../constants/strings';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">
          Reset Fields
          </Link>
        </li>
        <li>
          <a
            href="http://geektrust.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
          GeekTrust Website
          </a>
        </li>
      </ul>
    </nav>
    <h1>{ TITLE }</h1>
    <p>{ SUBTITLE }</p>
  </header>
);

export default Header;
