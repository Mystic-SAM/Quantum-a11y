const mainBodyEl = document.querySelector(".main-body") as HTMLDivElement | null;

class CardType {
    id: number;
    name: string;
    imgUrl: string;
    subject: string;
    grade: string;
    units: number;
    lessons: number;
    topics: number;
    classes?: string[];
    students?: number;
    startDate?: string;
    endDate?: string;
    isStarred: boolean;
    isExpired?: boolean;
}

const setNumofCourses = (courses):void => {
    const NumofCoursesEl = document.querySelector(".course-num") as HTMLSpanElement | null;
    NumofCoursesEl.innerText = courses.length; 

    const filterCourseShowEl = document.querySelector("#filter-course-num") as HTMLParagraphElement | null;
    filterCourseShowEl.innerText = `Showing ${courses.length} of ${courses.length} Courses`;
}

const createStarImgStr = (course: CardType):string => {
    if(course.isStarred){
        return ` 
            <img class="favourite" src="assets/icons/favourite.svg" alt="Favourite">
        `;
    }else{
        return `
            <img class="favourite" src="assets/icons/favourite.svg" alt="Favourite Icon" style="filter: grayscale(1);" aria-hidden="true">
        `;
    }
}

const createclassDropdownStr = (course: CardType):string => {
    let classDropdownEl:HTMLDivElement = document.createElement("div");
        classDropdownEl.classList.add("teacher-dropdown");
        if(!course.classes){
            let selectEl:string = `
                    <select class="option-disabled" aria-label="Select Class" disabled>  
                        <option value = "No Classes"> No Classes</option>  
                    </select>
            ` ;       
            classDropdownEl.innerHTML = selectEl;
        }else{
            let selectEl: HTMLSelectElement = document.createElement("select");
            selectEl.setAttribute("aria-label","Select Class");
            // let firstClass:boolean = true;
            for(let cls of course.classes){
                let optionEl: HTMLOptionElement = document.createElement("option");
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
}

const createCourseDateEl = (course: CardType):string => {
    let courseDateEl: string = `
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

const createCardValidityStr = (course: CardType):string => {
    let cardValidityStr:string = `<article class="card" aria-labelledby="${course.id}">`;
        if(course.isExpired){
            cardValidityStr = `
                <article class="card validity-container" aria-labelledby="${course.id}">
                <div class="card-validity">
                    EXPIRED
                </div>
            `;
        }
    return cardValidityStr;    
}

export const renderCards = (courses):void => {
    let cardEl:string = "";
    setNumofCourses(courses);

    for(let course of courses){
        let gradeStr: string[] = course.grade.split(" ");

        let starImg:string = createStarImgStr(course);        
        let classDropdownStr: string = createclassDropdownStr(course);         
        let courseDateElement:string = createCourseDateEl(course); 
        let cardValidityString:string = createCardValidityStr(course);

        let cardFooter:string =`
            <aside class="card-footer" aria-label="Options for Course ${course.name}">
                <img class="preview-img BTN" src="assets/icons/preview.svg" 
                alt="Preview course ${course.name}" role="button" title="Preview course ${course.name}" tabindex="0">
                <img class="manage-course-img BTN" src="assets/icons/manage course.svg" 
                alt="Manage Course ${course.name}" role="button" title="Manage Course ${course.name}" tabindex="0">
                <img class="grade-submission-img BTN" src="assets/icons/grade submissions.svg" 
                alt="Submit Grade for ${course.name}" role="button" title="Submit Grade for ${course.name}" tabindex="0">
                <img class="reports-img BTN" src="assets/icons/reports.svg" 
                alt="Get reports for ${course.name}" role="button" title="Get reports for ${course.name}" tabindex="0">
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
}