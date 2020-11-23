'use strict';
import axios from 'axios';

/**
 * General axios handler. This will eventually be a standalone service. It can make any kind of
 * request (e.g., GET, POST), passing along a payload.
 *
 * @param {String} url The url to request.
 * @param {The type of request: e.g., GET, POST, PUT, etc.} method The type of request to make:
 *   e.g., GET, POST.
 * @param {Object} payload Data to send over (optional).
 * @returns {Object|Array|Error} For GETs, data returned by the server; otherwise error
 * or status codes.
 */
const axiosHandler = async function ({ url, method, payload }) {
	const data = await axios[method](url, payload);
	console.log('axios res data', data)
	return data;
}

axios.interceptors.request.use((config) => {
	config.withCredentials = true;
	if(document.cookie.includes('jwt')) {
		const token = document.cookie.split('; ').find(row => row.startsWith('jwt')).split('=')[1];
		config.headers.common['Authorization'] = `Bearer ${token}`;
	}
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export { axiosHandler };