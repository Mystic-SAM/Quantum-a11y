const getData = async (srcPath: string): Promise<any> => {
  const response = await fetch(srcPath);
  if (response.status !== 200) {
    throw new Error("Failed to fetch the Data");
  }
  const data = await response.json();
  return data;
};

Promise.all([
  getData("./data/courses.json"),
  getData("./data/notifications.json"),
  getData("./data/announcements.json"),
])
  .then((values) => {
    renderCards(values[0]);
    renderNotifications(values[1]);
    renderAnnouncements(values[2]);

    // Initialize Notification and Announcement Menus
    let menuButtons = document.querySelectorAll(".menu-button-links");
    for (let i = 0; i < menuButtons.length; i++) {
      new MenuButtonLinks(menuButtons[i]);
    }

  })
  .catch((err) => console.log("Error: ", err.message));


// -----------------------------------Card--------------------------
// getData("./data/courses.json")
// .then(courses => renderCards(courses))
// .catch(err => console.log("Error: ", err.message));

// ---------------------------------Notification---------------------------
// getData("./data/notifications.json")
// .then(notifications => renderNotifications(notifications))
// .catch(err => console.log("Error: ", err.message));

// ---------------------Announcement-----------------------------
// getData("./data/announcements.json")
// .then(announcements => renderAnnouncements(announcements))
// .catch(err => console.log("Error: ", err.message));

// ----------------Hamburger Menu---------------------------------

