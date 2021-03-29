import { updateObject } from '../Utility/index';

const mainUrl = 'https://containers-app-default-rtdb.europe-west1.firebasedatabase.app/';
const mainQuery = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
};

export default function useFetch() {

	const fetchData = (url, query = {}) => {
		return fetch(mainUrl + url, updateObject(mainQuery, query))
			.then(prom => {
				if (!prom.ok) {
					throw new Error(JSON.stringify({ status: prom.status, statusText: prom.statusText }))
				}
				return prom;
			})
			.then(req => req.json());
	};

	return fetchData;
}
