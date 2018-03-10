import React from 'react';
import PropTypes from 'prop-types';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import SelectBox from '../components/SelectBox';
import queryParams from '../constants/queryParams';

export default class BookListHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: { query: undefined, queryType: 'intitle', startIndex: 0 },
    };
  }

  onSearchClickHandler = () => {
    const { search } = this.state;
    const { onSearch } = this.props;
    onSearch(search);
  };

  onSearchChangeHandler = query => {
    this.setState({ search: { ...this.state.search, query } });
  };

  onTypeChangeHandler = queryType => {
    this.setState({ search: { ...this.state.search, queryType } });
  };

  render() {
    const { query, queryType } = this.state.search;
    return (
      <div>
        <TextBox value={query} onChange={this.onSearchChangeHandler} />
        <Button onClick={this.onSearchClickHandler}> Найти </Button>
        <SelectBox
          value={queryType}
          onChange={this.onTypeChangeHandler}
          options={queryParams}
        />
      </div>
    );
  }
}

BookListHeader.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
