
const notificationListDiv = document.querySelector(".notification-list-div") as HTMLDivElement | null;
const NoOfNotification = document.querySelector("#notification-badge") as HTMLSpanElement;
const notificationIcon = document.querySelector("#notification-icon-img") as HTMLImageElement; 
const notificationButton = document.querySelector("#notification-btn") as HTMLButtonElement; // NOtification List Inner Btn
const NotificationMenuNode = notificationListDiv.querySelector('[role="menu"]') as HTMLDivElement;
const notificationBtn = document.querySelector("#notification") as HTMLButtonElement | null; // Notification List Trigger
const notificationLabelEl = document.querySelector('#notifications-menu-label') as HTMLSpanElement; 

const notificationHideCaller = ():void=>{
    setTimeout(() => {
        if(notificationListDiv.parentNode.querySelector(":hover") == notificationListDiv){
            notificationListDiv.addEventListener("mouseleave",notificationHide, false);
        }else{
            notificationHide();
        }
    },100);
}

const notificationHide = ():void =>{
    notificationListDiv.classList.remove("notification-list-div-show");
    notificationListDiv.classList.add("non-focusable");
    NotificationMenuNode.style.display = "none";
    notificationIcon.style.filter = "brightness(1)";
    NoOfNotification.style.display = "flex";
    notificationButton.setAttribute("tabindex","-1");    
}
const notificationShow = ():void =>{
    if(menu.classList.contains("showHamburgerMenu")){
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    announcementHide();
    notificationButton.setAttribute("tabindex","0");
    notificationIcon.style.filter = "brightness(5.0)";
    notificationListDiv.classList.add("notification-list-div-show");
    notificationListDiv.classList.remove("non-focusable");
    NoOfNotification.style.display = "none";
}

const onNotificationBtnDown = event => {
    if(!event.shiftKey){
        if( event.key === "Tab"){
            notificationHide();
        }
    }
}

const setNotificationLabel = (notifications):void => {
    let notificationLabel: string = `NOtifications - No new notifications`;
    if(notifications.length !== 0){
        notificationLabel = `Notifications - ${notifications.length} new notifications`;;
    }
    notificationLabelEl.innerText = notificationLabel;
    NoOfNotification.innerText = notifications.length;
}


// notificationBtn.addEventListener("mouseenter", notificationShow, false);
// notificationBtn.addEventListener("mouseleave", notificationHideCaller, false);
notificationButton.addEventListener("keydown", onNotificationBtnDown);
const renderNotifications = (notifications):void => {
    const notificationWrapper = document.querySelector("#notification-list") as HTMLDivElement;
    let notificationBody: string = " ";

    setNotificationLabel(notifications);

    for(let notification of notifications){
        let courseStr:string =" ";
        if(notification.course){
            courseStr = `
            <p><span class="notification-label">Course:</span> ${notification.course}</p>
            `;
        }

        let classStr:string =" ";
        if(notification.class){
            classStr = `
            <p><span class="notification-label">Class:</span> ${notification.class}</p>
            `;
        }

        let notificationItemDivStartTag:string = `<div class="notification-item" role="menuitem" >`;
        let seenIconStr:string = `<span class="announcement-right-10" aria-label="Notification Seen"> &#10003; </span>`;
        if(!notification.isSeen){
            notificationItemDivStartTag = `
            <div class="notification-item unseen-item" role="menuitem" >
            `;
            seenIconStr = `<span class="announcement-right-unseen" aria-label="Notification not Seen"> - </span>`;
        }

        notificationBody +=`
            ${notificationItemDivStartTag} 
                <div class="notification-grid">
                    <p class="notification-left-90"> ${notification.content} </p>
                    ${seenIconStr}
                </div>
                ${courseStr}
                ${classStr}
                <div class="notitification-time" aria-label="Sent on ${notification.timestamp}">
                    ${notification.timestamp}
                </div>
            </div>
            
        `;
    }
    notificationWrapper.innerHTML = notificationBody;
}