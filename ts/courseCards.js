const mainBodyEl = document.querySelector(".main-body");
class CardType {
    id;
    name;
    imgUrl;
    subject;
    grade;
    units;
    lessons;
    topics;
    classes;
    students;
    startDate;
    endDate;
    isStarred;
    isExpired;
}
const setNumofCourses = (courses) => {
    const NumofCoursesEl = document.querySelector(".course-num");
    NumofCoursesEl.innerText = courses.length;
    const filterCourseShowEl = document.querySelector("#filter-course-num");
    filterCourseShowEl.innerText = `Showing ${courses.length} of ${courses.length} Courses`;
};
const createStarImgStr = (course) => {
    if (course.isStarred) {
        return ` 
            <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite">
        `;
    }
    else {
        return `
            <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon" style="filter: grayscale(1);" aria-hidden="true">
        `;
    }
};
const createclassDropdownStr = (course) => {
    let classDropdownEl = document.createElement("div");
    classDropdownEl.classList.add("teacher-dropdown");
    if (!course.classes) {
        let selectEl = `
                    <select class="option-disabled" disabled>  
                        <option value = "No Classes"> No Classes</option>  
                    </select>
            `;
        classDropdownEl.innerHTML = selectEl;
    }
    else {
        let selectEl = document.createElement("select");
        selectEl.setAttribute("aria-label", "Select Class");
        // let firstClass:boolean = true;
        for (let cls of course.classes) {
            let optionEl = document.createElement("option");
            optionEl.value = `${cls}`;
            optionEl.innerText = `${cls}`;
            // if(firstClass){
            //     optionEl.setAttribute("selected",true);
            //     firstClass = false;
            // }
            selectEl.appendChild(optionEl);
        }
        classDropdownEl.appendChild(selectEl);
    }
    return classDropdownEl.outerHTML;
};
const createCourseDateEl = (course) => {
    let courseDateEl = `
            <div class="course-dates flex-row">
        `;
    if (course.students) {
        courseDateEl += `
                    <p>${course.students} Students</p>
            `;
    }
    if (course.startDate && course.endDate) {
        courseDateEl += `
                    <p class="vertical-line"> &#124;</p>
                    <p>${course.startDate} - ${course.endDate}</p>
                </div>
            `;
    }
    else {
        courseDateEl += `
                </div>
            `;
    }
    return courseDateEl;
};
const createCardValidityStr = (course) => {
    let cardValidityStr = `<article class="card" aria-labelledby="${course.id}">`;
    if (course.isExpired) {
        cardValidityStr = `
                <article class="card validity-container" aria-labelledby="${course.id}">
                <div class="card-validity">
                    EXPIRED
                </div>
            `;
    }
    return cardValidityStr;
};
export const renderCards = (courses) => {
    let cardEl = "";
    setNumofCourses(courses);
    for (let course of courses) {
        let gradeStr = course.grade.split(" ");
        let starImg = createStarImgStr(course);
        let classDropdownStr = createclassDropdownStr(course);
        let courseDateElement = createCourseDateEl(course);
        let cardValidityString = createCardValidityStr(course);
        let cardFooter = `
            <aside class="card-footer">
                <button class="BTN" role="presentation">
                    <img class="preview-img" src="assets/icons/preview.svg" 
                    alt="Preview course ${course.name}" role="button">
                </button>
                <button class="BTN" role="presentation">
                    <img class="manage-course-img" src="assets/icons/manage course.svg" 
                    alt="Manage Course ${course.name}" role="button">
                </button>
                <button class="BTN" role="presentation">
                    <img class="grade-submission-img" src="assets/icons/grade submissions.svg" 
                    alt="Grade Submisssion for ${course.name}" role="button">
                </button>
                <button class="BTN" role="presentation">
                    <img class="reports-img" src="assets/icons/reports.svg" 
                    alt="Get reports for ${course.name} " role="button">
                </button>
            </aside>
        `;
        cardEl += `
        ${cardValidityString}
            <div class="flex-row">
                <img class="card-image" src="${course.imgUrl}" alt="${course.name}"> 
                <div class="card-body">
                    <h3 id="${course.id}" class="course-name">${course.name}</h3>
                    <div class="sub-grade flex-row">
                        <p class="subject">${course.subject}</p>
                        <p class="vertical-line"> &#124;</p>
                        <p class="grade">Grade ${gradeStr[0]} 
                            <span class="green"> ${gradeStr[1]} </span>
                        </p>
                    </div>
                    <div class="syllabus flex-row">
                        <p><span class="strong"> ${course.units} </span>Units</p>
                        <p><span class="strong"> ${course.lessons} </span>Lessons</p>
                        <p><span class="strong"> ${course.topics} </span>Topics</p>
                    </div>
                    ${classDropdownStr}
                    ${courseDateElement}
                </div>
                ${starImg}
            </div>
            ${cardFooter}
        </article>
        `;
    }
    mainBodyEl.innerHTML = cardEl;
};
