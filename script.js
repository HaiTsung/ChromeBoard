let searchInput = document.getElementById("searchInput");
let plusButton = document.getElementById("shortcutAddButton");
let shortcutContainer = document.getElementById("shortcutContainer");
let clock = document.getElementById("clock");
let shortcutEditButton = document.getElementById("shortcutEditButton");
let popupArea = document.getElementById("popUpArea");
let editShortcutsPopup = document.getElementById("editShortcutsPopup");
let editSaveButton = document.getElementById("editSaveButton");

let shortcutEditMenuShown = false;

shortcutEditButton.addEventListener("click", toggleShortcutEditMenu);
editSaveButton.addEventListener("click", () => {
    toggleShortcutEditMenu();
});

function buildShortcutEditMenu() {
    editShortcutsPopup.innerHTML = "<p>Edit and Delete Shortcuts</p>"
    for (let index = 0; index < names.length; index++) {
        editShortcutsPopup.innerHTML += 'div class="shortcutEditItemContainer">< input type = "text" value="' + names[index] + '"><input type="text" value="' + names[index] + '"><button id="deleteButton' + index + '"> Delete</button></div>';
        document.getElementById("deleteButton" + index);
    }
    editShortcutsPopup.innerHTML += '<div id="editShortcutsCommit"><button>discard </button><button id="editSaveButton">save</button></div>';
    editSaveButton = document.getElementById("editSaveButton");
    editSaveButton.addEventListener("click", () => {
        toggleShortcutEditMenu();
    });
}

function toggleShortcutEditMenu() {
    if (shortcutEditMenuShown) {
        buildShortcutEditMenu();
        popupArea.style.visibility = "hidden";
        editShortcutsPopup.style.visibility = "hidden";
        shortcutEditMenuShown = false;
    }
    else {
        popupArea.style.visibility = "visible";
        editShortcutsPopup.style.visibility = "visible";
        shortcutEditMenuShown = true;
    }
}

let names = [];
let links = [];

let date = new Date();

updateTime();


function deleteShortcuts(params) {
    names = [];
    links = [];
    saveShortcuts();
    buildShortcuts();
}


function updateGreeting() {
    let hour = date.getHours();
    if (hour >= 5 && hour <= 11) {

    }
    else if (hour >= 12 && hour <= 17) {

    }
}

function updateTime() {
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let time = hour + ":" + minute;
    clock.innerHTML = time;
    setTimeout(updateTime, 1000)
}

console.log(date.getTime());


try {
    if (localStorage.getItem("shortcutNames") != null && localStorage.getItem("shortcutLinks")) {
        names = localStorage.getItem("shortcutNames");
        links = localStorage.getItem("shortcutLinks");
        if (JSON.parse(names) != null && JSON.parse != null) {
            names = JSON.parse(names);
            links = JSON.parse(links);
        }
        else {
            names = [];
            links = [];
        }

    }

} catch (error) {
    console.log(error);
}



buildShortcuts();

function buildShortcuts() {
    if (names != null && links != null) {
        shortcutContainer.innerHTML = "";
        for (let index = 0; index < names.length; index++) {
            shortcutContainer.innerHTML += '<div id="shortcutSubcontainer"><a href="' + links[index] + '">' + names[index] + '</a></div>';
        }
    }

}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        open('http://google.com/search?q=' + searchInput.value, "_self");
    }
});

plusButton.addEventListener("click", () => {
    if (links.length >= 5) {
        alert("Too many shortcuts");
        return;
    }
    let name = prompt("Shortcut name");
    let link = prompt("Shortcut link");




    if (name != null && link != null) {
        if (!link.startsWith("https://www.")) {
            link = "https://www." + link;
        }
        names.push(name);
        links.push(link);
        saveShortcuts();
        buildShortcuts();
    }
    else {
        alert("Can't add shortcut");
    }

});

function saveShortcuts() {
    localStorage.setItem("shortcutNames", JSON.stringify(names));
    localStorage.setItem("shortcutLinks", JSON.stringify(links));
}

