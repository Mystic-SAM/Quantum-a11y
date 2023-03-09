let btn_menu = document.querySelector("#show-pwd-btn") as HTMLButtonElement;
let input = document.querySelector("#pwd-input") as HTMLInputElement;
let isShow = true;
    
btn_menu.addEventListener("click", (event) => {
    input.setAttribute("type", isShow ? "input" : "password");
    isShow = !isShow;
});