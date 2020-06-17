const axios = require('axios');

const apiKey = '4fc1c3b55b2c1e1fcaa65ae67e2841ca';
const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Credentials': true,
	'Content-Type': 'application/json'
};

module.exports.main = async (event, context, callback) => {
	try {
		const { city } = event.queryStringParameters;
		const { data: { main: { temp } } } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
		const outdoorTempThreshold = 290;
		const responseClient = {
			statusCode: 200,
			headers,
			body: JSON.stringify({ outdoorTemperature: temp > outdoorTempThreshold })
		};
		callback(null, responseClient);
	} catch (error) {
		console.error('error', error);
		const responseError = {
			statusCode: 500,
			headers,
			body: JSON.stringify({ status: false })
		};
		callback(null, responseError);
	}
};
