import React from 'react';
import PropTypes from 'prop-types';

export default function TextBox({ onChange, value = '' }) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  );
}

TextBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
