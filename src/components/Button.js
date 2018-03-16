import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ children, onClick }) {
  return <button onClick={onClick} className='search_find_btn'>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
