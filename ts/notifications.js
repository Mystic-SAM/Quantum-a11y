const notificationListDiv = document.querySelector(".notification-list-div");
const NoOfNotification = document.querySelector("#notification-badge");
const notificationIcon = document.querySelector("#notification-icon-img");
const notificationButton = document.querySelector("#notification-btn"); // NOtification List Inner Btn
const NotificationMenuNode = notificationListDiv.querySelector('[role="menu"]');
const notificationBtn = document.querySelector("#notification"); // Notification List Trigger
const notificationLabelEl = document.querySelector('#notifications-menu-label');
const notificationHideCaller = () => {
    setTimeout(() => {
        if (notificationListDiv.parentNode.querySelector(":hover") == notificationListDiv) {
            notificationListDiv.addEventListener("mouseleave", notificationHide, false);
        }
        else {
            notificationHide();
        }
    }, 100);
};
const notificationHide = () => {
    notificationListDiv.classList.remove("notification-list-div-show");
    notificationListDiv.classList.add("non-focusable");
    NotificationMenuNode.style.display = "none";
    notificationIcon.style.filter = "brightness(1)";
    NoOfNotification.style.display = "flex";
    notificationButton.setAttribute("tabindex", "-1");
};
const notificationShow = () => {
    if (menu.classList.contains("showHamburgerMenu")) {
        menu.classList.remove("showHamburgerMenu");
        menuIcon.style.filter = "brightness(1)";
    }
    announcementHide();
    notificationButton.setAttribute("tabindex", "0");
    notificationIcon.style.filter = "brightness(5.0)";
    notificationListDiv.classList.add("notification-list-div-show");
    notificationListDiv.classList.remove("non-focusable");
    NoOfNotification.style.display = "none";
};
const onNotificationBtnDown = event => {
    if (!event.shiftKey) {
        if (event.key === "Tab") {
            notificationHide();
        }
    }
};
const setNotificationLabel = (notifications) => {
    let notificationLabel = `NOtifications - No new notifications`;
    if (notifications.length !== 0) {
        notificationLabel = `Notifications - ${notifications.length} new notifications`;
        ;
    }
    notificationLabelEl.innerText = notificationLabel;
    NoOfNotification.innerText = notifications.length;
};
// notificationBtn.addEventListener("mouseenter", notificationShow, false);
// notificationBtn.addEventListener("mouseleave", notificationHideCaller, false);
notificationButton.addEventListener("keydown", onNotificationBtnDown);
const renderNotifications = (notifications) => {
    const notificationWrapper = document.querySelector("#notification-list");
    let notificationBody = " ";
    setNotificationLabel(notifications);
    for (let notification of notifications) {
        let courseStr = " ";
        if (notification.course) {
            courseStr = `
            <p><span class="notification-label">Course:</span> ${notification.course}</p>
            `;
        }
        let classStr = " ";
        if (notification.class) {
            classStr = `
            <p><span class="notification-label">Class:</span> ${notification.class}</p>
            `;
        }
        let notificationItemDivStartTag = `<div class="notification-item" role="menuitem" >`;
        let seenIconStr = `<span class="announcement-right-10" aria-label="Notification Seen"> &#10003; </span>`;
        if (!notification.isSeen) {
            notificationItemDivStartTag = `
            <div class="notification-item unseen-item" role="menuitem" >
            `;
            seenIconStr = `<span class="announcement-right-unseen" aria-label="Notification not Seen"> - </span>`;
        }
        notificationBody += `
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
};
