// Example: Highlight today's date dynamically
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const todayDate = today.getDate();

    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        const date = day.querySelector('.date');
        if (date && parseInt(date.textContent) === todayDate) {
            day.style.backgroundColor = '#ffd700';
        }
    });
});
