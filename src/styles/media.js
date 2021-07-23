import { css } from 'styled-components';

// https://github.com/styled-components/styled-components/issues/182

const sizes = {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    medium: 670,
    phablet: 572,
    phone: 376
}  

const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default media