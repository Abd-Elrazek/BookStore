import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
/*
const ListItem = (book) => (
	<li key = {book.id}>
		<h3>{book.name}</h3>
		<h3>{book.author}</h3>
		<h3>{book.bookDescr}</h3>
	</li>
);
*/
export default function ListItem(props) {
	const key = props.book.id;
	const name = props.book.name;
	return (
		<div>
			<li key = {key}>
				<h3>{name}</h3>
				<img src={props.book.img} />
				<h4>{props.book.author}</h4>
				<p>{props.book.bookDescr}</p>
				<p>{props.book.authorDescr}</p>
			</li>
		</div>
	);
}
