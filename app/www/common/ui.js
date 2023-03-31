const showElement = (id) => {
    document.getElementById(id).style.display = "block";
}

const hideElement = (id) => {
    document.getElementById(id).style.display = "none";
}

export { showElement, hideElement };