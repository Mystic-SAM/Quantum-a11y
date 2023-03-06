const menu = document.querySelector(".hamburger-menu");
// const menuItems = document.querySelectorAll(".hambuger-item");
const hambugerBtn = document.querySelector("#hamburger-icon");
const menuIcon = document.querySelector(".hamburger-menu-icon");
const hamburgerLists = document.querySelectorAll(".hamburger-list-item");
const hamListItems = [];
let hamInnerListItems = [];
const hideInnerMenu = () => {
    hamburgerLists.forEach((listItem) => {
        let innerEl = listItem.children[1];
        if (innerEl) {
            if (!(innerEl.classList.contains("inner-item"))) {
                innerEl.classList.add("inner-item");
                // listItem.children[0].children[0].innerHTML = `&or;`;
                listItem.children[0].children[0].classList.remove("hamburger-expanded");
                listItem.classList.remove("hamburger-item-active");
                listItem.children[0].setAttribute("aria-expanded", "false");
            }
        }
    });
};
const toggleMenu = () => {
    if (menu.classList.contains("showHamburgerMenu")) {
        menu.classList.remove("showHamburgerMenu");
        menu.classList.add("non-focusable");
        menuIcon.style.filter = "brightness(1)";
    }
    else {
        announcementHide();
        notificationHide();
        hideInnerMenu();
        menu.classList.add("showHamburgerMenu");
        menu.classList.remove("non-focusable");
        menuIcon.style.filter = "brightness(5.0)";
        hamListItems[0].children[0].focus();
        window.addEventListener("mousedown", onBackgroundMousedown.bind(this), true);
    }
};
hambugerBtn.addEventListener("click", toggleMenu);
const setFocusToMenuitem = (newMenuitem) => {
    hamListItems.forEach(function (item) {
        if (item === newMenuitem) {
            // item.tabIndex = 0;
            newMenuitem.children[0].focus();
        }
        else {
            // item.tabIndex = -1;
        }
    });
};
const setFocusToFirstMenuitem = () => {
    setFocusToMenuitem(firstMenuitem);
};
const setFocusToLastMenuitem = () => {
    setFocusToMenuitem(lastMenuitem);
};
const setFocusToPreviousMenuitem = (currentMenuitem) => {
    var newMenuitem, index;
    if (currentMenuitem === firstMenuitem) {
        newMenuitem = lastMenuitem;
    }
    else {
        index = hamListItems.indexOf(currentMenuitem);
        newMenuitem = hamListItems[index - 1];
    }
    setFocusToMenuitem(newMenuitem);
    return newMenuitem;
};
const setFocusToNextMenuitem = (currentMenuitem) => {
    var newMenuitem, index;
    if (currentMenuitem === lastMenuitem) {
        newMenuitem = firstMenuitem;
    }
    else {
        index = hamListItems.indexOf(currentMenuitem);
        newMenuitem = hamListItems[index + 1];
    }
    setFocusToMenuitem(newMenuitem);
    return newMenuitem;
};
const onMenuitemMouseover = (event) => {
    let tgt = event.currentTarget;
    // console.log("tgtChild",tgt.children[0]);
    tgt.children[0].focus();
};
const onHamburgerItemBtnDown = (event) => {
    let key = event.key;
    let tgt = event.currentTarget;
    let flag = false;
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }
    if (event.shiftKey) {
        if (key === "Tab") {
            toggleMenu();
            hambugerBtn.focus();
            flag = true;
        }
    }
    else {
        switch (key) {
            case "Esc":
            case "Escape":
                toggleMenu();
                hambugerBtn.focus();
                flag = true;
                break;
            case "Up":
            case "ArrowUp":
                setFocusToPreviousMenuitem(tgt);
                flag = true;
                break;
            case "ArrowDown":
            case "Down":
                setFocusToNextMenuitem(tgt);
                flag = true;
                break;
            case "Home":
            case "PageUp":
                setFocusToFirstMenuitem();
                hideInnerMenu();
                flag = true;
                break;
            case "End":
            case "PageDown":
                setFocusToLastMenuitem();
                hideInnerMenu();
                flag = true;
                break;
            case "Tab":
                toggleMenu();
                hambugerBtn.focus();
                flag = true;
                break;
            case " ":
            case "Enter":
                toggleBtnInnerMenu(tgt);
                flag = true;
                break;
            default:
                break;
        }
    }
    if (flag) {
        event.stopPropagation();
        event.preventDefault();
    }
};
const innerHamItemBtnDown = (event) => {
    let key = event.key;
    let tgt = event.currentTarget;
    let flag = false;
    let index;
    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }
    if (event.shiftKey) {
        if (key === "Tab") {
            hideInnerMenu();
            tgt.parentNode.parentNode.children[0].focus();
            flag = true;
        }
    }
    else {
        switch (key) {
            case "Esc":
            case "Escape":
                toggleMenu();
                hambugerBtn.focus();
                flag = true;
                break;
            case "Up":
            case "ArrowUp":
                index = hamInnerListItems.indexOf(tgt);
                if (index === 0) {
                    hamInnerListItems[hamInnerListItems.length - 1].children[0].focus();
                }
                else {
                    hamInnerListItems[index - 1].children[0].focus();
                }
                flag = true;
                break;
            case "ArrowDown":
            case "Down":
                index = hamInnerListItems.indexOf(tgt);
                if (index === hamInnerListItems.length - 1) {
                    hamInnerListItems[0].children[0].focus();
                }
                else {
                    hamInnerListItems[index + 1].children[0].focus();
                }
                flag = true;
                break;
            case " ":
            case "Enter":
                hideInnerMenu();
                tgt.parentNode.parentNode.children[0].focus();
                flag = true;
                break;
            case "Tab":
                hideInnerMenu();
                if (tgt.parentNode.parentNode === hamListItems[hamListItems.length - 1]) {
                    hamListItems[0].children[0].focus();
                }
                else {
                    tgt.parentNode.parentNode.nextElementSibling.children[0].focus();
                }
                flag = true;
                break;
            default:
                break;
        }
    }
    if (flag) {
        event.stopPropagation();
        event.preventDefault();
    }
};
const toggleBtnInnerMenu = (target) => {
    let listItem = target;
    const innerUlEl = listItem.children[1];
    if (innerUlEl) {
        if (innerUlEl.classList.contains("inner-item")) {
            hideInnerMenu();
            innerUlEl.classList.remove("inner-item");
            listItem.classList.add("hamburger-item-active");
            // listItem.children[0].children[0].innerHTML = `&and;`;
            listItem.children[0].children[0].classList.add("hamburger-expanded");
            listItem.children[0].setAttribute("aria-expanded", "true");
            hamInnerListItems = Array.from(listItem.children[1].children);
            hamInnerListItems[0].children[0].focus();
            hamInnerListItems.forEach(item => {
                item.addEventListener("keydown", innerHamItemBtnDown);
            });
        }
        else {
            // listItem.children[0].children[0].innerHTML = `&or;`;
            listItem.children[0].children[0].classList.remove("hamburger-expanded");
            innerUlEl.classList.add("inner-item");
            listItem.classList.remove("hamburger-item-active");
            listItem.children[0].setAttribute("aria-expanded", "false");
        }
    }
};
let firstMenuitem, lastMenuitem;
hamburgerLists.forEach((listItem) => {
    const toggleInnerMenu = () => {
        const innerUlEl = listItem.children[1];
        // console.log(innerUlEl);
        if (innerUlEl) {
            if (innerUlEl.classList.contains("inner-item")) {
                hideInnerMenu();
                innerUlEl.classList.remove("inner-item");
                listItem.classList.add("hamburger-item-active");
                // listItem.children[0].children[0].innerHTML = `&and;`;
                listItem.children[0].children[0].classList.add("hamburger-expanded");
                listItem.children[0].setAttribute("aria-expanded", "true");
            }
            else {
                // listItem.children[0].children[0].innerHTML = `&or;`;
                listItem.children[0].children[0].classList.remove("hamburger-expanded");
                innerUlEl.classList.add("inner-item");
                listItem.classList.remove("hamburger-item-active");
                listItem.children[0].setAttribute("aria-expanded", "false");
            }
        }
    };
    hamListItems.push(listItem);
    if (!firstMenuitem) {
        firstMenuitem = listItem;
    }
    lastMenuitem = listItem;
    listItem.addEventListener("click", toggleInnerMenu);
    listItem.addEventListener("keydown", onHamburgerItemBtnDown);
    listItem.addEventListener("mouseover", onMenuitemMouseover);
});
const onBackgroundMousedown = (event) => {
    if (!menu.contains(event.target)) {
        if (menu.classList.contains("showHamburgerMenu")) {
            toggleMenu();
            hambugerBtn.focus();
        }
    }
};
