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
            // console.log(data.user);
            document.getElementById(
                "eng-name-info"
            ).innerHTML = `${data.user.firstname_en} ${data.user.lastname_en}`;
            document.getElementById(
                "thai-name-info"
            ).innerHTML = `${data.user.firstname_th} ${data.user.lastname_th}`;
        })
        .catch((error) => console.error(error));
};

// second try----------------------------------------
const createAssignmentTable = async (cv_cid, course_title, icon) => {
    const table_body = document.getElementById("main-table-body");
    table_body.innerHTML = "";
    console.log("pass cv_cid succesfully");
    if (cv_cid == -1) {
        const options = {
            method: "GET",
            credentials: "include",
        };
        await fetch(`http://${backendIPAddress}/courseville/get_courses`, options)
            .then((response) => response.json())
            .then((data) => {
                const courses = data;
                courses.data.student.map((course) => {
                    if (course.semester == 2) {
                        console.log(course);
                        const options = {
                            method: "GET",
                            credentials: "include",
                        };
                        let items;
                        fetch(
                            `http://${backendIPAddress}/courseville/get_course_assignments/${course.cv_cid}`,
                            options
                        )
                            .then((response) => response.json())
                            .then((data) => {
                                // console.log(data.data);
                                console.log("fetch all assignments");
                                items = data.data;
                                console.log(data)
                                items.map((item) => {
                                    // console.log("map succesfully");
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
                                            // console.log(data.data);
                                            // console.log("fetch assignment detail");
                                            assignments = data.data;
                                            if (isTimePast(assignments.duetime)) {
                                                table_body.innerHTML += `
                                            <tr id="${item.itemid}">
                                                <td><img src="${icon}"></td>
                                                <td>${course_title}</td>
                                                <td>${item.title}</td>
                                                <td>${unixTimeToDateTime(assignments.duetime)}</td>
                                                <td style="color: red">${estimateDaysLeft(assignments.duetime)}</td>
                                            </tr>`;
                                            }
                                        })
                                        .catch((error) => console.error(error));
                                });
                            })
                            .catch((error) => console.error(error));

                    }

                });
            })
            .catch((error) => console.error(error));
    } else {
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
                // console.log(data.data);
                console.log("fetch all assignments");
                items = data.data;
                console.log(data)
                items.map((item) => {
                    // console.log("map succesfully");
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
                            // console.log(data.data);
                            // console.log("fetch assignment detail");
                            assignments = data.data;
                            if (isTimePast(assignments.duetime)) {
                                table_body.innerHTML += `
                                <tr id="${item.itemid}">
                                    <td><img src="${icon}"></td>
                                    <td>${course_title}</td>
                                    <td>${item.title}</td>
                                    <td>${unixTimeToDateTime(assignments.duetime)}</td>
                                    <td style="color: red">${estimateDaysLeft(assignments.duetime)}</td>
                                </tr>`;
                            }
                        })
                        .catch((error) => console.error(error));
                });
            })
            .catch((error) => console.error(error));

    }

};

function handleSelectChange() {
    const selectElement = document.getElementById("select-course").value;
    const [cv_cid, course_title, icon] = selectElement.split(",");
    createAssignmentTable(cv_cid, course_title, icon);
    console.log(cv_cid);
}

const logout = async () => {
    console.log("logout successfully");
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
    localStorage.removeItem("hasAlreadyRedirected");
};

const showCourses = async () => {
    const course_dropdown = document.getElementById("select-course");
    course_dropdown.innerHTML = "<option value='0'>Select Course</option><option value='-1'>Every course</option>";
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/courseville/get_courses`, options)
        .then((response) => response.json())
        .then((data) => {
            const courses = data;
            // console.log(courses.data.student);
            courses.data.student.map((course) => {
                if (course.semester == 2) {
                    fetch(`http://${backendIPAddress}/courseville/get_course_info/${course.cv_cid}`, options)
                        .then((response) => response.json())
                        .then((data) => {
                            const item1 = data;
                            // console.log(item1);
                            // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
                            course_dropdown.innerHTML += `<option value="${course.cv_cid}, ${item1.data.title}, ${item1.data.course_icon}">${item1.data.title}</option>`;
                            // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
                        }).catch((error) => console.error(error));
                }
            });
        })
        .catch((error) => console.error(error));
};

function initPage() {
    getUserProfile();
    showCourses();
    showTasksInTable();
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
    let minutes = dateObj.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${date} ${month} ${year}\n${hours}:${minutes} ${ampm}`;
    return formattedTime;
};

const isTimePast = (duetime) => {
    const now = Math.floor(Date.now() / 1000); // current time in Unix timestamp format
    return now > duetime ? false : true;
}

const estimateDaysLeft = (dueTime) => {
    const now = new Date().getTime() / 1000;
    const diffSeconds = dueTime - now;
    const diffHours = Math.floor(diffSeconds / 3600);
    const diffDays = Math.floor(diffHours / 24);
    const hoursLeft = diffHours % 24;

    if (diffDays > 1) {
        return `${diffDays} Days`;
    } else if (diffDays === 1) {
        return `1 Day`;
    } else {
        return `${hoursLeft} Hours`;
    }
};


authorizeApplication();
