import axios from 'axios';
// import { createBrowserHistory } from 'history';
// const history = createBrowserHistory();

const appID = "q5HRLsW98Fem9zhjBkQnurVR"
const appSecret = "Yg2AF3XwqcnoQ1LPnV8gD27n"

/* tslint:disable:no-string-literal */
const instance = axios.create({
	baseURL: 'https://gp-server.hunger-valley.com/',
	headers: {
		't-app-id': appID,
		't-app-secret': appSecret
	}
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
	const xToken = localStorage.getItem('x-token')
	if(xToken){
		config.headers['Authorization'] = `Bearer ${xToken}`
	}
	return config;
},  (error) => {
	// tslint:disable-next-line: no-console
	console.error(error)
	return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
	// Do something with response data
	if(response.headers['x-token']){
		localStorage.setItem('x-token',response.headers['x-token'])
	}
	return response;
},  (error) => {
	if(error.response.status === 401){
		// tslint:disable-next-line: no-console
		console.log("重定向");
		window.location.href = '/login'
		// history.push('/login')
	}
	// Do something with response error
	return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export default instance