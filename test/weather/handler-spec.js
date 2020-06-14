const {	describe, it } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');

const apiKey = '4fc1c3b55b2c1e1fcaa65ae67e2841ca';
const underTest = require('../../weather/handler.js');

describe('Handler', () => {
	const event = {
		queryStringParameters: {
			city: 'Brisbane'
		}
	};
	const context = {};

	it('will use "London" as the city and return false as outdoorTemperature is low', (done) => {
		nock('http://api.openweathermap.org/data/2.5')
			.get(`/weather?q=${event.queryStringParameters.city}&appid=${apiKey}`)
			.reply(200, { main: { temp: 100 } });

		underTest.main(event, context, (err, response) => {
			try {
				expect(response).to.deep.equal({
					statusCode: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true,
						'Content-Type': 'application/json'
					},
					// eslint-disable-next-line quotes
					body: "{\"outdoorTemperature\":false}"
				});
				done();
			} catch (err) {
				done(err);
			}
		});
	});

	it('will use "Brisbane" as the city and return true as outdoorTemperature is high', (done) => {
		nock('http://api.openweathermap.org/data/2.5')
			.get(`/weather?q=${event.queryStringParameters.city}&appid=${apiKey}`)
			.reply(200, { main: { temp: 300 } });

		underTest.main(event, context, (err, response) => {
			try {
				expect(response).to.deep.equal({
					statusCode: 200,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true,
						'Content-Type': 'application/json'
					},
					// eslint-disable-next-line quotes
					body: "{\"outdoorTemperature\":true}"
				});
				done();
			} catch (err) {
				done(err);
			}
		});
	});

	it('will return an error if "event" parameter is null', (done) => {
		underTest.main(null, context, (err, response) => {
			expect(response).to.deep.equal({
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
					'Content-Type': 'application/json'
				},
				// eslint-disable-next-line quotes
				body: "{\"status\":false}"
			});
			done();
		});
	});

	it('will return an error if "temp" property does not exist', (done) => {
		nock('http://api.openweathermap.org/data/2.5')
			.get(`/weather?q=${event.queryStringParameters.city}&appid=${apiKey}`)
			.reply(200, { main: { } });

		underTest.main(event, context, (err, response) => {
			expect(response).to.deep.equal({
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true,
					'Content-Type': 'application/json'
				},
				// eslint-disable-next-line quotes
				body: "{\"status\":false}"
			});
			done();
		});
	});
});
