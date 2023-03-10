import { notificationHide } from "./notifications.js";

const announcementWrapper = document.querySelector(".announcement-list-wrapper") as HTMLDivElement;
const NoOfAnnouncement = document.querySelector("#announcement-badge") as HTMLSpanElement;
const announcementIcon = document.querySelector("#announcement-icon-img") as HTMLImageElement;
const announcementButtons = document.querySelectorAll(".announcement-btn"); // Announcement List Inner Buttons
const announcementMenuNode = announcementWrapper.querySelector('[role="menu"]') as HTMLDivElement;
const announcementBtn = document.querySelector("#announcement") as HTMLButtonElement; // Announcement List Trigger
const announcementLabelEl = document.querySelector("#announcements-menu-label") as HTMLSpanElement;

export const announcementHideCaller = ():void =>{
    setTimeout(() => {
        if(announcementWrapper.parentNode.querySelector(":hover") == announcementWrapper){
            announcementWrapper.addEventListener("mouseleave",announcementHide, false);
        }else{
            announcementHide();
        }
    },50);
}

export const announcementHide = ():void =>{
    announcementWrapper.classList.remove("announcement-list-wrapper-show");
    announcementWrapper.classList.add("non-focusable");
    announcementMenuNode.style.display = "none";
    NoOfAnnouncement.style.display = "flex";
    announcementIcon.style.filter  = "brightness(1)";
    announcementButtons.forEach( (button) => {
        button.setAttribute("tabindex","-1");
    })    
}
export const announcementShow = ():void =>{
    if(menu.classList.contains("showHamburgerMenu")){
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    notificationHide();
    announcementButtons.forEach( (button) => {
        button.setAttribute("tabindex","0");
    }) 
    announcementIcon.style.filter  = "brightness(5.0)";
    NoOfAnnouncement.style.display = "none";
    announcementWrapper.classList.add("announcement-list-wrapper-show");
    announcementWrapper.classList.remove("non-focusable");
}

const onClearBtnDown = event => {
    if(!event.shiftKey){
        if( event.key === "Tab"){
            announcementHide();
        }
    }
}

const setAnnouncementLabel = (announcements):void => {
    let announcementLabel: string = `No new announcements`;
    if(announcements.length !== 0){
        announcementLabel = `Announcements - ${announcements.length} new announcements`;;
    }
    announcementLabelEl.innerText = announcementLabel;
    NoOfAnnouncement.innerText = announcements.length;
}


// announcementBtn.addEventListener("mouseover",announcementShow, false);
// announcementBtn.addEventListener("mouseleave",announcementHideCaller);

announcementButtons[1].addEventListener("keydown", onClearBtnDown);

export const renderAnnouncements = (announcements):void => {
    let announcementContainer = document.querySelector(".announcement-list") as HTMLDivElement;
    let announcementBody:string = "";

    setAnnouncementLabel(announcements);

    for(let announcement of announcements){

        let announcementDivStartTag:string = `<div class="announcement-item" role="menuitem">`;
        let seenIconStr:string = `<span class="announcement-right-10" aria-label="Announcement Seen"> &#10003; </span>`;
        if(!announcement.isSeen){
            announcementDivStartTag = `<div class="announcement-item unseen-item" role="menuitem">`;
            seenIconStr = `<span class="announcement-right-unseen" aria-label="Announcement not Seen"> - </span>`;
        }

        let courseStr:string = "";
        if(announcement.course){
            courseStr = `
            <p class="announcement-sub">Course:  ${announcement.course}</p>
            `;
        }

        let NoOfFilesStr:string = "";
        if(announcement.filesAttached){
            NoOfFilesStr = `<p class="announcement-left"> ${announcement.filesAttached} files are attached</p>`;
        } 

        announcementBody += `
            ${announcementDivStartTag}
                <div class="announcemnt-grid-PA">
                    <p class="announcement-left-90"> <span>PA:</span> ${announcement.userName} </p>
                    ${seenIconStr}
                </div>
                <p class="announcement-content"> ${announcement.content}</p>
                ${courseStr}
                <div class="announcement-grid-equispace">
                    ${NoOfFilesStr}
                    <p class="announcement-right" > 
                        <span class="sr-only"> Sent on </span> ${announcement.timestamp}
                    </p>
                </div>
            </div>
        `;
    }
    announcementContainer.innerHTML = announcementBody;
}