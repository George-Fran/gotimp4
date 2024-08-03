document.addEventListener('DOMContentLoaded', () => {
    const navegador = document.querySelector('.barra');
    let menu = document.querySelector('.menu');
    const iconMenu = menu.innerHTML;
    const iconMenuClose = '<img src="/static/img/icon-menu-close.svg" alt="">';
    const fondo = document.querySelector('.nw');
    menu.addEventListener('click', () => {
        if (navegador.classList.contains('nav-close')) {
            fondo.classList.remove('no-black');
            menu.classList.add('fix');
            navegador.classList.remove('dp-nav');
            setTimeout(() => {
                navegador.classList.remove('nav-close');
            }, 10);

            menu.innerHTML = iconMenuClose;
        } else {
            fondo.classList.add('no-black');
            navegador.classList.add('nav-close');
            menu.classList.remove('fix');
            menu.innerHTML = iconMenu;
        }
    });
    navegador.addEventListener('transitionend', () => {
        if (navegador.classList.contains('nav-close')) {
            navegador.classList.add('dp-nav');
        }
    });
});