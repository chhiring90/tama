const axios = require('axios');
const catchAsync = require('./catchAsync');

const tenorGif = catchAsync(async (query, options) => {
	const { TENOR_URL, TENOR_TOKEN } = process.env;
	let tenor = TENOR_URL.replace('<KEY>', TENOR_TOKEN);

	if (options && options.gifType) {
		tenor = tenor.replace('<QUERY>', `${options.gifType} ${query}`);
	}

	tenor = tenor.replace('<QUERY>', `${query}`);
	const response = await axios.get(tenor);
	const { results } = response.data;
	const gif = results[Math.floor(Math.random() * results.length)].url;
	return gif;
});

module.exports = tenorGif;