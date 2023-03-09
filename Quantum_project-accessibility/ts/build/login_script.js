let btn_menu = document.querySelector("#show-pwd-btn");
let input = document.querySelector("#pwd-input");
let isShow = true;
btn_menu.addEventListener("click", (event) => {
    input.setAttribute("type", isShow ? "input" : "password");
    isShow = !isShow;
});
//# sourceMappingURL=login_script.js.map