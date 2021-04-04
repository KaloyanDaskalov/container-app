import { useCallback, useReducer } from 'react';
import { updateObject } from '../Utility/index';
import { useHistory } from 'react-router-dom';

const mainUrl = 'https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/';
const mainQuery = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

const queryState = {
	fetchLoading: false,
	fetchError: false,
	fetchSuccess: false,
	fetchData: null,
	fetchErrorMessage: '',
	fetchSuccessMessage: ''
};

const queryReducer = (state, action) => {
	switch (action.type) {
		case 'RESET':
			return updateObject(state, { fetchError: false, fetchLoading: true, fetchData: null, fetchErrorMessage: '', fetchSuccessMessage: '' });
		case 'SUCCESS':
			return updateObject(state, { fetchData: action.data, fetchSuccessMessage: action.successMessage, fetchSuccess: true, fetchLoading: false });
		case 'ERROR':
			return updateObject(state, { fetchError: true, fetchErrorMessage: action.err, fetchLoading: false });
		default:
			throw new Error('Unhandled action' + action.type);
	}
};

export default function useFetch() {

	const [query, queryDispatch] = useReducer(queryReducer, queryState);
	const history = useHistory();

	const fetchQuery = useCallback((url, query = {}, successMessage = '', path = '') => {
		queryDispatch({ type: 'RESET' });
		fetch(mainUrl + url, updateObject(mainQuery, query))
			.then(req => {
				if (!req.ok) {
					throw new Error(`Error: ${req.status} / ${req.statusText}`);
				}
				return req.json();
			})
			.then(data => {
				queryDispatch({ type: 'SUCCESS', data, successMessage })
				if (path) {
					history.push(path);
				}
			})
			.catch(err => queryDispatch({ type: 'ERROR', err: (err.message || err) }));
	}, [history]);

	return {
		fetchQuery,
		queryDispatch,
		fetchLoading: query.fetchLoading,
		fetchError: query.fetchError,
		fetchSuccess: query.fetchSuccess,
		fetchData: query.fetchData,
		fetchErrorMessage: query.fetchErrorMessage,
		fetchSuccessMessage: query.fetchSuccessMessage
	};
}
