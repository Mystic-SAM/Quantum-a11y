function updateStatus(count) {
    let display = document.querySelector("#display-course");
    let total = document.querySelector("#total-courses");
    display.innerHTML = count > 10 ? 10 : count;
    total.innerHTML = count;
}
function loadClassDetails() {
    let container = document.querySelector(".card-container");

    fetch("/js/data.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateStatus(data.length);
            data.map((item) => {

                let stared_Section = item.is_starred ?
                    "<img src='assets/icons/favourite.svg' alt='added to favourite'>"
                    : `<svg id="favourite" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
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
                    console.log("Tmp");
                    console.log(tmp);
                    console.log(item.grad);
                    let tmp1 = tmp[1] !== undefined ? `<span class="text-green"> ${'+'+tmp[1]}</span>` : "";
                    grad_section = `<span class="data-seprator">${tmp[0]} ${tmp1}</span>`;
                }
                
                let load_option = `<select name="class-type" id="" class="input-div--control input-div--control_arrow ">
                                <option value="-1" disabled selected hidden>No Class Selected</option>
                                ${item.options ? item.options.map((data)=> `<option value="">${data}</option>`) : ""
                                }
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
                            <button class="btn" ${item.action.disablePreview ? "disabled" : ""}>
                                <img src="assets/icons/preview.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableCourseManager ? "disabled" : ""}>
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableSubmission ? "disabled" : ""}>
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn" ${item.action.disableReport ? "disabled" : ""}>
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`
                    :`<div class="card-footer">
                            <button class="btn" >
                                <img src="assets/icons/preview.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/manage course.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/grade submissions.svg" alt="">
                            </button>
                            <button class="btn">
                                <img src="assets/icons/reports.svg" alt="">
                            </button>
                        </div>`;
                
                container.innerHTML += `
                    <div class="card-div">
                    ${item.is_expire ? "<span class='status-lable'>Expired</span>" : ""}
                        <div class="card-body">
                            <img class="card-body--img" src="${item.img}" alt="Acceleration image">
                            <div class="card-content-detail">
                                <h2 class="card-header">
                                    <span class="card-heading">
                                        ${item.class_heading}
                                    </span>
                                    <button class="btn favourite-btn">
                                        ${stared_Section}
                                    </button>
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
                `
            })
        })
        .catch(error => {
            console.log(error);
        })
}

loadClassDetails();

let nav = document.querySelector("#nav-menu");
let isOpen = false;
function toggle_menu() {
    isOpen ? nav.classList.remove("display_flex") : nav.classList.add("display_flex");
    isOpen = !isOpen;
}
document.querySelector("#menu-toggle-btn").addEventListener("click", (event) => {
    toggle_menu();
})

document.querySelector("#menu-toggle-btn").addEventListener("blur", () => {
    toggle_menu();
})