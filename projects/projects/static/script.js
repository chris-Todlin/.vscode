/* When the user click the button there */
// GEt all the button in the projects view
const buttonsProjects = document.querySelectorAll('.list-projects button');

function changeUrl(e) {
    const nowUrl = location.href.replaceAll(location.hash, '');
    location.href = `${nowUrl}public/${e.target.name}`;
}

// Attach the event listnere
buttonsProjects.forEach(btn => btn.addEventListener('click', changeUrl));