import React from 'react';
import PropTypes from 'prop-types';

export default function TextBox({ onChange, value = '' }) {
  return (
    <input className="search_text_input" type="text" ref={input => input && input.focus()} value={value} onChange={e => onChange(e.target.value)} />
  );
}

TextBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
