const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const config = {
	plugins: [
		require('postcss-simple-vars'),
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		require('tailwindcss/nesting'),
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		require('postcss-preset-env')({
			stage: 1
		})
	]
};

module.exports = config;
