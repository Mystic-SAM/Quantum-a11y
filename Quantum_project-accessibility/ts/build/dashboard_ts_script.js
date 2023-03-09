import { MobileMenu } from "./mobile_menu.js";
import { POPUP_List_V2 } from "./popup_list_v2.js";
import { Menubar } from "./manubar.js";
let notification_badge = document.querySelector("#notification-badge");
function loadCourseStatus(count) {
    let total = document.querySelector("#total-courses");
    let displayed_course = document.querySelector("#display-courses");
    document.querySelector(".sub-tab-item-quantity").innerHTML = count + "";
    if (count > 10) {
        displayed_course.innerHTML = 10 + "";
    }
    else {
        displayed_course.innerHTML = count + "";
    }
    total.innerHTML = count + "";
}
function loadClassDetails() {
    let container = document.querySelector(".card-container");
    fetch("/data.json")
        .then(response => response.json())
        .then((data) => {
        // console.log(data);
        loadCourseStatus(data.length);
        data.map((item) => {
            let stared_Section = item.is_starred ?
                `<img src='assets/icons/favourite.svg' tabindex="0" role="checkbox" aria-checked="true" alt='added to favourite'>`
                : `<svg id="favourite" xmlns="http://www.w3.org/2000/svg" tabindex="0" role="checkbox" aria-checked="false" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path id="Path_3678" data-name="Path 3678" d="M0,0H24V24H0Z" fill="none" />
                            <path id="Path_3679" data-name="Path 3679"
                                d="M12,17.27,18.18,21l-1.64-7.03L22,9.24l-7.19-.61L12,2,9.19,8.63,2,9.24l5.46,4.73L5.82,21Z"
                                fill="#213E543D" />
                            <path id="Path_3680" data-name="Path 3680" d="M0,0H24V24H0Z" fill="none" />
                        </svg>`;
            let grad_section = "";
            if (item.grad) {
                let tmp = item.grad.split("+");
                // console.log("Tmp");
                // console.log(tmp);
                // console.log(item.grad);
                let tmp1 = tmp[1] !== undefined ? `<span class="text-green"> ${'+' + tmp[1]}</span>` : "";
                grad_section = `<span class="data-seprator">${tmp[0]} ${tmp1}</span>`;
            }
            let load_option = `<select name="class-type" id="" aria-label="select classes" class="input-div--control input-div--control_arrow" ${item.options ? "" : "disabled"}>
                                ${item.options ? item.options.map((data) => `<option value="">${data}</option>`) :
                `<option value="-1" disabled selected hidden>No Class Selected</option>`}
                            </select>`;
            let detail_section = item.details ?
                `<p class="class-detail">
                        <span>${item.details.number_of_unit}</span> Units
                        <span>${item.details.number_of_lession}</span> Lessions
                        <span>${item.details.number_of_topics}</span> Topics
                    </p>`
                : "";
            let enrolled_student = item.student ?
                `<span>${item.student} Students </span>`
                : "";
            let course_duration = item.course_duration ?
                `<span class="data-seprator">${item.course_duration.starting_date} - ${item.course_duration.ending_date}</span>`
                : "";
            let action_Section = item.action ?
                `<div class="card-footer">
                            <button class="btn" aria-label="Preview" ${item.action.disablePreview ? "disabled" : ""}>
                                <img src="assets/icons/preview.svg" alt="">
                                <span hidden id="preview" >this is button description </span>
                            </button>
                            <button class="btn" aria-label="Manage Courses" ${item.action.disableCourseManager ? "disabled" : ""}>
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn" aria-label="Grad Submission" ${item.action.disableSubmission ? "disabled" : ""}>
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn" aria-label="Report" ${item.action.disableReport ? "disabled" : ""}>
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`
                : `<div class="card-footer">
                            <button class="btn" aria-label="Preview">
                                <img src="assets/icons/preview.svg" alt="">
                            </button>
                            <button class="btn" aria-label="Manage Courses">
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn" aria-label="Grad Submission">
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn" aria-label="Report" >
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`;
            container.innerHTML += `
                    <div class="card-div">
                    ${item.is_expire ? "<span class='status-lable'>Expired</span>" : ""}
                        <div class="card-body">
                            <img class="card-body--img" src="${item.img}" alt="">
                            <div class="card-content-detail">
                                <h2 class="card-header">
                                    <span class="card-heading">
                                        ${item.class_heading}
                                    </span>
                                    <span class="btn favourite-btn">
                                        ${stared_Section}
                                    </span>
                                </h2>
                                <p class="class-topic-detail">
                                    <span>${item.cetegory}</span>
                                    ${grad_section}
                                </p>
                                ${detail_section}
                                ${load_option}
                                <p>
                                    ${enrolled_student}
                                    ${course_duration}
                                </p>
                            </div>
                        </div>
                        ${action_Section}
                    </div>
                `;
        });
    });
    // .catch(error => {
    //     console.log(error);
    // })
}
loadClassDetails();
let nav = document.querySelector("#nav-menu");
let isOpen = false;
function toggle_menu() {
    isOpen ? nav.classList.remove("display_flex") : nav.classList.add("display_flex");
    isOpen = !isOpen;
}
function updateNotificationBadge(count) {
    notification_badge.innerHTML = count + "";
}
function updateAccouncementBadge(count) {
    notification_badge.innerHTML = count + "";
}
// let divs : NodeListOf<HTMLLIElement> = document.querySelectorAll<HTMLLIElement>(".dropdown-list-container");
// divs.forEach(div => {
//     div.addEventListener("click", (event) => {
//         // console.log(event.target);
//         closeAllDropdown(divs);
//         let element: HTMLLIElement;
//         try {
//             element = event.target as HTMLLIElement;
//             toggleDropdown(element);
//         } catch (error) {
//             console.log("Error");
//             console.log(error);
//         }
//       })
// })
// function toggleDropdown(el: HTMLLIElement) {
//     console.log(el);
//     let dropdown = el.parentElement.querySelector(".dropdown-menu") as HTMLUListElement;
//     let dropdown_icon = el.querySelector(".drop-down-arrow") as HTMLSpanElement;
//     el.classList.add("background-highlight");
//     dropdown.classList.add("display-block");
//     dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-up.svg")`;
// }
// function closeAllDropdown(divs : NodeListOf<HTMLLIElement>){
//     document.querySelectorAll(".dropdown-menu")
//     divs.forEach(el => {
//         let dropdown = el.querySelector(".dropdown-menu") as HTMLUListElement;
//         let dropdown_icon = el.querySelector(".drop-down-arrow") as HTMLSpanElement;
//         if (dropdown.classList.contains("display-block")) {
//             // el.style.backgroundColor = "#ffffff";
//             el.classList.remove("background-highlight");
//             dropdown.classList.remove("display-block");
//             dropdown_icon.style.backgroundImage = `url("/assets/screen_Assets/icons/dropdown-arrow-down.svg")`;
//         }
//     })
// }
let notification = document.querySelector("#notification-trigger-btn");
let notification_list = document.querySelector("#notification-list");
let announcement = document.querySelector("#announcement-trigger-btn");
let announcement_list = document.querySelector("#announcements-list");
// notification.addEventListener("click", () => {
//     notification.setAttribute("aria-expanded", "true");
//     notification_list.classList.add("show-list");
//     console.log(notification.parentElement);
// });
// notification.parentElement.addEventListener("focusout", event => {
//     notification.setAttribute("aria-expanded", "false");
//     notification_list.classList.remove("show-list");
// })
// announcement.addEventListener("click", () => {
//     announcement.setAttribute("aria-expanded", "true");
//     announcement_list.classList.add("show-list");
//     console.log(announcement.parentElement);
// });
// announcement.parentElement.addEventListener("focusout", event => {
//     announcement.setAttribute("aria-expanded", "false");
//     announcement_list.classList.remove("show-list");
// })
// #######################################################################
// ########################### Version 1 #################################
// #######################################################################
// let notification_popup:POPUP_List = new POPUP_List(notification, notification_list);
// notification_popup.init();
// let announcement_popup: POPUP_List = new POPUP_List(announcement, announcement_list);
// announcement_popup.init();
let notification_popup = new POPUP_List_V2(document.querySelector("#notification-icon"));
// notification_popup.init();
let announcement_popup = new POPUP_List_V2(document.querySelector("#announcement-icon"));
// announcement_popup.init();
let mobile_menu = new MobileMenu(document.querySelector("#menu-toggle-btn"));
let mmain_menu = new Menubar(document.querySelector("#nav-menu"));
//# sourceMappingURL=dashboard_ts_script.js.map