/* Theme stuff */
const themetoggle_btn = document.getElementById('themetoggle');
let cur_theme = "light"

themetoggle_btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (cur_theme === "light") {
        cur_theme = "dark";
        document.getElementById("divider").src = "/sbesite_pharloom/res/images/divider.webp";
        localStorage.setItem("theme", "dark");
    } else if (cur_theme === "dark") {
        cur_theme = "light";
        document.getElementById("divider").src = "/sbesite_pharloom/res/images/d_divider.webp";
        localStorage.setItem("theme", "light");
    }
});

/* Font sizings */
const up_btn = document.getElementById('font_up');
const down_btn = document.getElementById('font_down');
const reset_btn = document.getElementById('font_reset');
let multiplier_cur = 1.0;

up_btn.addEventListener('click', () => {
    if (multiplier_cur < 2.0) {
        multiplier_cur += 0.2;
    }
    document.documentElement.style.setProperty('--multiplier', multiplier_cur);
    localStorage.setItem("font_multiplier", multiplier_cur);
});

down_btn.addEventListener('click', () => {
    if (multiplier_cur > 0.8) {
        multiplier_cur -= 0.2;
    }
    document.documentElement.style.setProperty('--multiplier', multiplier_cur);
    localStorage.setItem("font_multiplier", multiplier_cur);
});

reset_btn.addEventListener('click', () => {
    multiplier_cur = 1.0;
    document.documentElement.style.setProperty('--multiplier', multiplier_cur);
    localStorage.setItem("font_multiplier", multiplier_cur);
});

/* Load storage accessibility settings */

onload = () => {
    /* Theme */
    if (localStorage.getItem("theme") === "dark") {
        cur_theme = "dark";
        document.getElementById("divider").src = "/sbesite_pharloom/res/images/divider.webp";
        document.body.classList.add('dark');
    } else if (localStorage.getItem("theme") === "light") {
        cur_theme = "light";
        document.getElementById("divider").src = "/sbesite_pharloom/res/images/d_divider.webp";
        document.body.classList.remove('dark');
    }

    /* Font */
    if (localStorage.getItem("font_multiplier")) {
        multiplier_cur = parseFloat(localStorage.getItem("font_multiplier"));
        document.documentElement.style.setProperty('--multiplier', multiplier_cur);
    }

}
