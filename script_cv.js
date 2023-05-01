// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";

// const authorizeApplication = () => {
//     window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
// };

const hasAlreadyRedirected =
    localStorage.getItem("hasAlreadyRedirected") === "true";

const authorizeApplication = () => {
    if (!hasAlreadyRedirected) {
        window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
        localStorage.setItem("hasAlreadyRedirected", "true");
    }
};

const getUserProfile = async () => {
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(
        `http://${backendIPAddress}/courseville/get_profile_info`,
        options
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data.user);
            document.getElementById(
                "eng-name-info"
            ).innerHTML = `${data.user.firstname_en} ${data.user.lastname_en}`;
            document.getElementById(
                "thai-name-info"
            ).innerHTML = `${data.user.firstname_th} ${data.user.lastname_th}`;
        })
        .catch((error) => console.error(error));
};

// first try-------------------------------
// const createAssignmentTable = async (cv_cid) => {
//     const table_body = document.getElementById("main-table-body");
//     table_body.innerHTML = "";
//     console.log("hello", cv_cid);
//     const options = {
//         method: "GET",
//         credentials: "include",
//     };
//     let items;
//     await fetch(
//         `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid}`,
//         options
//     )
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data.data);
//             console.log("hello");
//             items = data.data;
//         })
//         .catch((error) => console.error(error));
//     items.map((item) => {
//         console.log("hello2");
//         const options = {
//             method: "GET",
//             credentials: "include",
//         };


//         let assignments;
//         fetch(
//             `http://${backendIPAddress}/courseville//get_assignment_detail/${item.itemid}`,
//             options
//         )
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 console.log("data");
//                 assignments = data.data;
//             })
//             .catch((error) => console.error(error));


//         table_body.innerHTML += `
//         <tr id="${item.itemid}">
//             <td> <img src="https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/python%20logo%20trans_1532575073.png" alt=""> Computer Engineering Essentials</td>
//             <td>${item.title}</td>
//             <td> 17 Dec, 2022 </td>
//             <td>
//                 <p class="status Submitted">Submitted</p>
//             </td>
//         </tr>`;
//     });
// };

// second try----------------------------------------
const createAssignmentTable = async (cv_cid) => {
    const table_body = document.getElementById("main-table-body");
    table_body.innerHTML = "";
    console.log("pass cv_cid succesfully");
    const options = {
        method: "GET",
        credentials: "include",
    };
    let items;
    fetch(
        `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid}`,
        options
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data.data);
            console.log("fetch all assignments");
            items = data.data;
            items.map((item) => {
                console.log("map succesfully");
                const options = {
                    method: "GET",
                    credentials: "include",
                };


                let assignments;
                fetch(
                    `http://${backendIPAddress}/courseville/get_assignment_detail/${item.itemid}`,
                    options
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data.data);
                        console.log("fetch assignment detail");
                        assignments = data.data;
                        table_body.innerHTML += `
                            <tr id="${item.itemid}">
                                <td>${item.title}</td>
                                <td>${unixTimeToDateTime(assignments.duetime)}</td>
                                <td>
                                <button id="addtodo-button" onclick="logout()">Add</button>
                                </td>
                            </tr>`;
                    })
                    .catch((error) => console.error(error));


                // table_body.innerHTML += `
                // <tr id="${item.itemid}">
                //     <td> <img src="https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/python%20logo%20trans_1532575073.png" alt=""> Computer Engineering Essentials</td>
                //     <td>${item.title}</td>
                //     <td>${unixTimeToDateTime(assignments.duetime)}</td>
                //     <td>
                //         <p class="status Submitted">Submitted</p>
                //     </td>
                // </tr>`;
            });
        })
        .catch((error) => console.error(error));

};

// third try-------------------------------
// const createAssignmentTable = async (cv_cid) => {
//     const table_body = document.getElementById("main-table-body");
//     table_body.innerHTML = "";
//     console.log("pass cv_cid succesfully");
//     const options = {
//         method: "GET",
//         credentials: "include",
//     };
//     let items;
//     const response = await fetch(
//         `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid}`,
//         options
//     );
//     const data = await response.json();
//     console.log(data.data);
//     console.log("fetch all assignments");
//     items = data.data;
//     for (const item of items) {
//         console.log("map succesfully");
//         const options = {
//             method: "GET",
//             credentials: "include",
//         };

//         const response = await fetch(
//             `http://${backendIPAddress}/courseville/get_assignment_detail/${item.itemid}`,
//             options
//         );
//         const data = await response.json();
//         console.log(data);
//         console.log("fetch assignment detail");
//         const assignments = data.data;

//         table_body.innerHTML += `
//             <tr id="${item.itemid}">
//                 <td> <img src="https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/python%20logo%20trans_1532575073.png" alt=""> Computer Engineering Essentials</td>
//                 <td>${item.title}</td>
//                 <td> 17 Dec, 2022 </td>
//                 <td>
//                     <p class="status Submitted">Submitted</p>
//                 </td>
//             </tr>`;
//     }
// };


function handleSelectChange() {
    const cv_cid = document.getElementById("select-course").value;
    // console.log("Selected value:", cv_cid);
    createAssignmentTable(cv_cid);
}

const logout = async () => {
    console.log("bye");
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
    localStorage.removeItem("hasAlreadyRedirected");
};

const showCourses = async () => {
    const course_dropdown = document.getElementById("select-course");
    course_dropdown.innerHTML = "<option value='0'>Select Course</option>";
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/courseville/get_courses`, options)
        .then((response) => response.json())
        .then((data) => {
            const courses = data;
            console.log(courses.data.student);
            courses.data.student.map((course) => {
                // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
                course_dropdown.innerHTML += `<option value="${course.cv_cid}">${course.cv_cid}</option>`;
                // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
            });
        })
        .catch((error) => console.error(error));
};

function initPage() {
    getUserProfile();
    showCourses();
}

const unixTimeToDateTime = (unixTimestamp) => {
    const dateObj = new Date(unixTimestamp * 1000);
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];
    const year = dateObj.getFullYear();
    const month = months[dateObj.getMonth()];
    const date = dateObj.getDate();
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours ? hours : 12;
    const formattedTime = `${date} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    return formattedTime;
};


authorizeApplication();
