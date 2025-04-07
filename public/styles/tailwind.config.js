module.exports = {
    content: [
        './views/**/*.ejs',
        './public/js/**/*.js',
        './public/styles/**/*.css',
    ],
    theme: {
        extend: {
            colors: {
                'terminal-green': '#00FF00',
                'terminal-blue-gray': '#1a1a2d',
                'terminal-light-gray': '#A0AEC0',
                'terminal-accent': '#2a2a3d',
            },
            fontFamily: {
                'retro': ['"Courier New"', 'Courier', 'monospace'],
            },
        },
    },
    darkMode: 'class', // Use a CSS class for 'horn mode'
    plugins: [],
}