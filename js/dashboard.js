const mainBodyEl = document.querySelector(".main-body");

const fetchCourses = async () => {
    const response = await fetch("./data/courses.json");
    if (response.status !==200){
        throw new Error("Failed to fetch the Data")
    }
    const data = await response.json();
    return data;
}

const createClassDropdownStr = (course) => {
    let classDropdownEl = document.createElement("div");
        classDropdownEl.classList.add("teacher-dropdown");
        if(!course.classes){
            let selectEl = `
                    <select class="option-disabled" disabled>  
                        <option value = "No Classes"> No Classes</option>  
                    </select>
            ` ;       
            classDropdownEl.innerHTML = selectEl;
        }else{
            let selectEl = document.createElement("select");
            for(let cls of course.classes){
                let optionEl = document.createElement("option");
                optionEl.value = `${cls}`;
                optionEl.innerText = `${cls}`;
                selectEl.appendChild(optionEl);              
            }
            classDropdownEl.appendChild(selectEl);
        }
    return classDropdownEl.outerHTML;    
}

const createCourseDateEl = (course) => {
    let courseDateEl = `
            <div class="course-dates flex-row">
        `;
        if(course.students){
            courseDateEl += `
                    <p>${course.students} Students</p>
            `;
        }
        if(course.startDate && course.endDate){
            courseDateEl += `
                    <p class="vertical-line"> &#124;</p>
                    <p>${course.startDate} - ${course.endDate}</p>
                </div>
            `;
        }else{
            courseDateEl += `
                </div>
            `;
        }
    return courseDateEl;    
}

const setNoOfCourses = (courses) => {
    let NumofCoursesEl = document.querySelector("#course-num");
    NumofCoursesEl.innerText = courses.length; 

    let filterCourseShowEl = document.querySelector("#filter-course-num");
    filterCourseShowEl.innerText = `Showing ${courses.length} of ${courses.length} Courses`;
}

const renderCards = (courses) => {
    let cardEl = "";

    setNoOfCourses(courses);
    
    let cardFooter =`
        <div class="card-footer">
            <button class="BTN">
                <img class="preview-img" src="assets/icons/preview.svg" alt="Preview Icon">
            </button>
            <button class="BTN">
                <img class="manage-course-img" src="assets/icons/manage course.svg" alt="Manage Course Icon">
            </button>
            <button class="BTN">
                <img class="grade-submission-img" src="assets/icons/grade submissions.svg" alt="Grade Submisssion Icon">
            </button>
            <button class="BTN">
                <img class="reports-img" src="assets/icons/reports.svg" alt="Reports Icon">
            </button>
        </div>
    `;
    for(let course of courses){
        let gradeStr = course.grade.split(" ");

        let classDropdownStr = createClassDropdownStr(course); 
        
        let courseDateElement = createCourseDateEl(course);

        cardEl += `
        <div class="card">
            <div class="flex-row">
                <img class="card-image" src="${course.imgUrl}" alt="${course.name}"> 
                <div class="card-body">
                    <p class="course-name">${course.name}</p>
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
                <img id="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon">
            </div>
            ${cardFooter}
        </div>
        `;
    }
    mainBodyEl.innerHTML = cardEl;
}

fetchCourses()
.then(courses => renderCards(courses))
.catch(err => console.log("Error: ", err.message));
