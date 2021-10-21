import '@/styles/theme/dark/index.scss';

const setTheme = (themeName = 'light') => {
    if (themeName === 'default') {
        if (document.body.className) document.body.className = ''
    } else {
        document.body.className = themeName;
    }
}

export default setTheme


