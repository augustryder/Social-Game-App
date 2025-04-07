document.addEventListener('DOMContentLoaded', () => {
    const hornModeToggle = document.getElementById('horn-mode');
    const html = document.documentElement;

    // Check localStorage for saved mode
    if (localStorage.getItem('hornMode') === 'enabled') {
        html.classList.add('dark');
        hornModeToggle.checked = true;
    }

    hornModeToggle.addEventListener('change', () => {
        if (hornModeToggle.checked) {
            html.classList.add('dark');
            localStorage.setItem('hornMode', 'enabled');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('hornMode', 'disabled');
        }
    });

    // Tooltip functionality
    const tooltip = document.getElementById('tooltip');
    const activityNames = document.querySelectorAll('.activity-name');

    activityNames.forEach(activity => {
        activity.addEventListener('mouseenter', (e) => {
            tooltip.textContent = activity.getAttribute('data-description');
            tooltip.classList.remove('hidden');
        });

        activity.addEventListener('mousemove', (e) => {
            tooltip.style.top = `${e.clientY + 10}px`;
            tooltip.style.left = `${e.clientX + 10}px`;
        });

        activity.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
});