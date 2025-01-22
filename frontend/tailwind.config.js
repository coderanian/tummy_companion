/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'garet-regular': ['Garet-Regular', 'sans-serif'],
                'garet-book': ['Garet-Book', 'sans-serif'],
                'garet-heavy': ['Garet-Heavy', 'sans-serif'],
            },
            colors: {
                'primary': '#f4d668',
                'secondary': '#005e38',
                'tertiary': '#c98d26',
            },
            cursor: {
                'custom-arrow': 'url("../src/assets/images/icons/cursors/cursor_default.svg"), auto',
                'custom-pointer': 'url("../src/assets/images/icons/cursors/cursor_pointer.svg"), pointer',
                'custom-text': 'url("../src/assets/images/icons/cursors/cursor_text.svg"), text',
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar')({nocompatible: true}),
    ],
}

