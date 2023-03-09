var btn_menu = document.querySelector("#show-pwd-btn");
var input = document.querySelector("#pwd-input");
var isShow = true;
btn_menu.addEventListener("click", function (event) {
    input.setAttribute("type", isShow ? "input" : "password");
    isShow = !isShow;
});
//# sourceMappingURL=login_script.js.map