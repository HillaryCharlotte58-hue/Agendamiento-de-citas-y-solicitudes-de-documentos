export function initNavigation() {
    const links = document.querySelectorAll('[data-target]');
    const sections = document.querySelectorAll('main section');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const target = link.dataset.target;

            sections.forEach(sec => {
                sec.classList.remove('active');
            });

            document.getElementById(target).classList.add('active');

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}