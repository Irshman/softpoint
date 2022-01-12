import * as flsFunction from "./modules/function.js";
import range from './modules/range.js';


flsFunction.testWebP();
range();


const menu = document.querySelector(".header__list");
const burger = document.querySelector(".header__burger");

burger.addEventListener('click', () => {
    burger.classList.toggle("header__burger--active");
    menu.classList.toggle("header__list--active");
})