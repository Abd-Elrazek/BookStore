import React from 'react';
import PropTypes from 'prop-types';

export default function SelectBox({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="search_select"
    >
      {options.map(item => {
        return (
          <option key={`${item.value}${item.label}`} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
}

SelectBox.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};
