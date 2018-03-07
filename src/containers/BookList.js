import React from 'react';
import ListItem from '../components/ListItem';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class BookList extends React.Component {

	showList() {
		return this.props.books.map(
			(book) => {
				return (
					<ListItem book = {book} />
				);
			});
		}

	render(){
		return(
			<div>
				{this.showList()}
			</div>
		);
	}
}

function mapStateToProps (state){
	return {
		books: state.books
	}
}

export default connect(mapStateToProps)(BookList);