var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class POPUP_List_V2 {
    constructor(element) {
        this.notification_list = new Array();
        this.isFocuse = false;
        this.active_index = 0;
        this.firstNotification = null;
        this.lastNotification = null;
        this.trigger_btn = element.querySelector("span");
        this.target = element.querySelector("div");
        let nodes = this.target.querySelectorAll("li");
        let t = this.target.querySelector(".action-btn-div");
        let t1 = t.querySelectorAll("span");
        let tmp = [];
        t1.forEach((el) => {
            tmp.push(el);
            el.tabIndex = -1;
            el.addEventListener("keydown", this.onActionBtnKeyDown.bind(this));
        });
        this.footerBtn = tmp;
        this.active_action_btn_index = -1;
        // console.log(this.footerBtn);
        for (var i = 0; i < nodes.length; i++) {
            var menuitem = nodes[i];
            this.notification_list.push(menuitem);
            menuitem.tabIndex = -1;
            menuitem.addEventListener("keydown", this.onNotificationKeydown.bind(this));
            //   menuitem.addEventListener(
            //     "mouseover",
            //     this.onMenuitemMouseover.bind(this)
            //   );
            if (!this.firstNotification) {
                this.firstNotification = menuitem;
            }
            this.lastNotification = menuitem;
        }
        this.trigger_btn.addEventListener("click", this.onButtonClick.bind(this));
        this.trigger_btn.addEventListener("keydown", this.onButtonKeydown.bind(this));
    }
    openList() {
        // console.log("Open List function Called");
        this.trigger_btn.setAttribute("aria-expanded", "true");
        this.target.classList.add("show-list");
        this.target.setAttribute("aria-hidden", "false");
        this.isFocuse = true;
    }
    closeList() {
        this.trigger_btn.setAttribute("aria-expanded", "false");
        this.trigger_btn.focus();
        this.target.classList.remove("show-list");
        this.target.setAttribute("aria-hidden", "true");
        this.setFocusToNotification(null);
        this.setActionBtn(null);
        this.isFocuse = false;
    }
    onButtonClick(event) {
        if (this.isOpen()) {
            this.closeList();
        }
        else {
            this.openList();
            this.setFocusToFirstNotification();
        }
    }
    onButtonKeydown(event) {
        // console.log("Button Key Down event");
        var key = event.key, flag = false;
        switch (key) {
            case " ":
            case "Enter":
            case "ArrowDown":
            case "Down":
                // console.log("Case 1");
                this.openList();
                this.setFocusToFirstNotification();
                flag = true;
                break;
            case "Esc":
            case "Escape":
                // // console.log("Notifation close");
                // console.log("Case 2");
                this.closeList();
                flag = true;
                break;
            case "Up":
            case "ArrowUp":
                // // console.log("Notifation Open");
                // console.log("Case 3");
                this.openList();
                this.setFocusToLastNotification();
                flag = true;
                break;
            default:
                // console.log("default case");
                // console.log("Key Buiding is not Avaliable")
                break;
        }
        if (flag) {
            // console.log("flag change")
            event.stopPropagation();
            event.preventDefault();
        }
    }
    onNotificationKeydown(event) {
        // console.log("Notification Keydown Event called");
        var tgt = event.currentTarget, key = event.key, flag = false;
        if (event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }
        if (event.shiftKey) {
            switch (key) {
                case " ":
                    // console.log("Press Space");
                    /* Add space Functionality */
                    break;
                case "Tab":
                    let t = this.active_action_btn_index === -1 ? 0 : this.active_action_btn_index;
                    this.setFocusToNotification(null);
                    this.active_action_btn_index = t;
                    this.setActionBtn(this.footerBtn[t]);
                    flag = true;
                    break;
                // case "ArrowDown":
                // case "ArrowUp":
                //     t = this.active_action_btn_index === -1 ? 0 : this.active_action_btn_index;
                //     this.setFocusToNotification(null);
                //     this.setActionBtn(this.footerBtn[t]);
                //     this.active_action_btn_index = t;
                //     break;
                default:
                    break;
            }
        }
        else {
            switch (key) {
                case " ":
                    // console.log("case 1");
                    /* Add space Functionality */
                    break;
                case "Esc":
                case "Escape":
                    // console.log("case 2");
                    this.closeList();
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    // console.log("case 3");
                    this.setFocusToPreviousNotification(tgt);
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    // console.log("case 4");
                    this.setFocusToNextNotification(tgt);
                    flag = true;
                    break;
                case "Home":
                case "PageUp":
                    // console.log("case 5");
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "End":
                case "PageDown":
                    // console.log("case 6");
                    this.setFocusToLastNotification();
                    flag = true;
                    break;
                case "Tab":
                    // console.log("case 7");
                    // this.closeList();
                    let t = this.active_action_btn_index === -1 ? 0 : this.active_action_btn_index;
                    this.setFocusToNotification(null);
                    this.setActionBtn(this.footerBtn[t]);
                    this.active_action_btn_index = t;
                    flag = true;
                    break;
                default:
                    // console.log("Default Case");
                    break;
            }
        }
        if (flag) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    onActionBtnKeyDown(event) {
        var key = event.key, flag = false;
        if (event.shiftKey) {
            switch (key) {
                case "Tab":
                    // this.closeList();
                    // flag = true;
                    // this.setLastActionBtn();
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    this.setActionBtn(null);
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "ArrowUp":
                case "Up":
                    this.setActionBtn(null);
                    this.setFocusToLastNotification();
                    flag = true;
                    break;
                default:
                    // console.log("Shift Btn default");
                    break;
            }
        }
        else {
            switch (key) {
                case " ":
                case "Enter":
                    // console.log("Active Btn");
                    break;
                case "Tab":
                    // console.log("Tab Btn click")
                    this.setFocusToFirstNotification();
                    flag = true;
                    break;
                case "ArrowDown":
                case "Down":
                    this.setNextActionBtn();
                    flag = true;
                    break;
                case "Esc":
                case "Escape":
                    // case "Tab":
                    this.closeList();
                    flag = true;
                    break;
                case "Up":
                case "ArrowUp":
                    this.setPreviousActionBtn();
                    flag = true;
                    break;
                default:
                    // console.log("default case");
                    // console.log("Key Buiding is not Avaliable")
                    break;
            }
        }
        if (flag) {
            // console.log("flag change")
            event.stopPropagation();
            event.preventDefault();
        }
    }
    setNextActionBtn() {
        let t = this.active_action_btn_index;
        t++;
        if (t >= this.footerBtn.length) {
            t = 0;
        }
        this.setActionBtn(this.footerBtn[t]);
        this.active_action_btn_index = t;
    }
    setPreviousActionBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            let t = this.active_action_btn_index;
            t--;
            if (t < 0) {
                t = this.footerBtn.length - 1;
            }
            this.setActionBtn(this.footerBtn[t]);
            this.active_action_btn_index = t;
        });
    }
    setFirstActionBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            this.active_action_btn_index = 0;
            this.setActionBtn(this.footerBtn[0]);
        });
    }
    setLastActionBtn() {
        return __awaiter(this, void 0, void 0, function* () {
            let t = this.footerBtn.length - 1;
            this.active_action_btn_index = t;
            this.setActionBtn(this.footerBtn[t]);
        });
    }
    setActionBtn(target) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log("set action btn called");
            // console.log(target);
            this.footerBtn.forEach((el) => {
                if (el === target) {
                    el.tabIndex = 0;
                    console.log("Focus Method Called");
                    target.focus();
                }
                else {
                    el.tabIndex = -1;
                }
            });
        });
    }
    isOpen() {
        return this.trigger_btn.getAttribute("aria-expanded") === "true";
    }
    setFocusToPreviousNotification(currentMenuitem) {
        var newNotification, index;
        if (currentMenuitem === this.firstNotification) {
            newNotification = this.lastNotification;
        }
        else {
            index = this.notification_list.indexOf(currentMenuitem);
            newNotification = this.notification_list[index - 1];
        }
        this.setFocusToNotification(newNotification);
        return newNotification;
    }
    setFocusToNextNotification(currentMenuitem) {
        var newNotification, index;
        if (currentMenuitem === this.lastNotification) {
            newNotification = this.firstNotification;
        }
        else {
            index = this.notification_list.indexOf(currentMenuitem);
            newNotification = this.notification_list[index + 1];
        }
        this.setFocusToNotification(newNotification);
        return newNotification;
    }
    setFocusToFirstNotification() {
        this.setFocusToNotification(this.firstNotification);
    }
    setFocusToLastNotification() {
        this.setFocusToNotification(this.lastNotification);
    }
    setFocusToNotification(newNotification) {
        this.notification_list.forEach(function (item) {
            if (item === newNotification) {
                item.tabIndex = 0;
                newNotification.focus();
            }
            else {
                item.tabIndex = -1;
            }
        });
    }
}
//# sourceMappingURL=popup_list_v2.js.map