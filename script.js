let searchInput = document.getElementById("searchInput");
let plusButton = document.getElementById("plusImage");
let shortcutContainer = document.getElementById("shortcutContainer");

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        open('http://google.com/search?q=' + searchInput.value, "_self");
    }
});

plusButton.addEventListener("click", () => {
    let name = prompt("Shortcut name");
    let link = prompt("Shortcut link");

    shortcutContainer.innerHTML += '<div id="shortcutSubcontainer"><a href="'+link+'">'+name+'</a></div>';
});

