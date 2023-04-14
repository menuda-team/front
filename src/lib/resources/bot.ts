import axios from 'axios';
import envVars from '../envVars.js';

export const api = axios.create({
	baseURL: envVars.botBaseUrl,
	timeout: 10000
});
