import api from '../constants/api';

const { key, baseUrl } = api;

export const searchBooks = (query, queryType, startIndex) =>
  fetch(
    `${baseUrl}?q=${queryType}:${query}&key=${key}&maxResults=10&startIndex=${startIndex}&country=RU`,
  );

export const searchBookById = id => fetch(`${baseUrl}/${id}?&key=${key}`);
