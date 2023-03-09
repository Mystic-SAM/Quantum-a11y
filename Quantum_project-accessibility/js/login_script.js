let btn = document.querySelector("#show-pwd-btn");
let input = document.querySelector("#pwd-input");
let isShow = true;
btn.addEventListener("click", (event) => {
    input.setAttribute("type", isShow ? "input" : "password");
    isShow = !isShow;
});