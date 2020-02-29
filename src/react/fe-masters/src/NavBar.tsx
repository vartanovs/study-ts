import * as React from 'react';
import { useState } from 'react';
import { Link } from '@reach/router';
// import { css, keyframes } from '@emotion/core';

// import colors from './colors';

// const spin = keyframes`
//   to {
//     transform: rotate(360deg);
//   }
// `;

const NavBar = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      // css={css`
      //   background-color: ${colors.secondary};
      //   padding: ${padding}px;
      // `}
      onClick={() => setPadding(padding + 15)}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        aria-label="logo"
        role="img"
        // css={css`
        //   animation: 1s ${spin} linear infinite;
        //   display: inline-block;
        //   font-size: 60px;

        //   &:hover {
        //     animation: 1s ${spin} linear infinite reverse;
        //     text-decoration: underline;
        //   }
        // `}
      >🐶</span>
    </header>
  )
};

export default NavBar;
