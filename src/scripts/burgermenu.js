const btn = document.getElementById("menu_button")
const btn_set = document.getElementById("access_menu")
const menu = document.getElementById("menu_content")
const access_menu = document.getElementById("access_content")

btn.addEventListener("click", () => {
    menu.classList.toggle("is-open")
});

btn_set.addEventListener("click", () => {
    access_menu.classList.toggle("is-open")
});