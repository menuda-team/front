/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			blue: '#1a73e8',
			white: '#FFFFFF',
			'bg-gray': '#F5F4F2',
			black1: '#000000',
			black2: '#3B3B3B',
			black3: '#999999',
			yellow: '#FFE036',
			red: '#F25656',
			'dark-black1': '#151E27',
			'dark-black2': '#1D2733',
			'dark-gray': '#828E9A'
		},
		fontSize: {
			xxs: ['13px', { lineHeight: '13px' }],
			xs: ['13px', { lineHeight: '15px' }],
			sm: ['14px', { lineHeight: '16px' }],
			m: ['15px', { lineHeight: '15px' }],
			base: ['15px', { lineHeight: '18px' }],
			xbase: ['15px', { lineHeight: '18px' }],
			xxbase: ['16px', { lineHeight: '16px' }],
			xxxbase: ['16px', { lineHeight: '20px' }],
			lg: ['17px', { lineHeight: '20px' }],
			xl: ['21px', { lineHeight: '27px' }],
			xxl: ['27px', { lineHeight: '31px' }]
		},
		extend: {
			boxShadow: {
				DEFAULT: '0px 1px 7px rgba(0, 0, 0, 0.1);'
			},
			borderRadius: {
				DEFAULT: '15px',
				sm: '10px'
			},
			spacing: {
				0: '0px',
				0.5: '6px',
				1: '7px',
				1.5: '8px',
				1.75: '9px',
				2: '10px',
				2.5: '12px',
				3: '13px',
				3.5: '14px',
				4: '15px',
				5: '20px',
				6: '30px',
				7: '40px',
				8: '50px',
				9: '70px',
				10: '80px'
			},
			animation: {
				pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			}
		}
	},
	plugins: []
};
