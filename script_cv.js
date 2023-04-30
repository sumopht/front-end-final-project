// TODO #4.0: Change this IP address to EC2 instance public IP address when you are going to deploy this web application
const backendIPAddress = "127.0.0.1:3000";

// const authorizeApplication = () => {
//     window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
// };

const hasAlreadyRedirected = localStorage.getItem("hasAlreadyRedirected") === "true";

const authorizeApplication = () => {
    if (!hasAlreadyRedirected) {
        window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
        localStorage.setItem("hasAlreadyRedirected", "true");
    }
};



// Example: Send Get user profile ("GET") request to backend server and show the response on the webpage
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

// TODO #3.5: Send Get Course Assignments ("GET") request with cv_cid to backend server
//            and create Comp Eng Ess assignments table based on the response (itemid, title)

// const createCompEngEssAssignmentTable = async () => {
//     const table_body = document.getElementById("main-table-body");
//     table_body.innerHTML = "";
//     const cv_cid = document.getElementById("ces-cid-value").innerHTML;

//     console.log(
//         "This function should fetch 'get course assignments' route from backend server and show assignments in the table."
//     );
// };

const logout = async () => {
    console.log('bye');
    window.location.href = `http://${backendIPAddress}/courseville/logout`;
    localStorage.removeItem("hasAlreadyRedirected");
    // window.location.href = `http://www.youtube.com`;
};

// document.getElementById("group-id").innerHTML = getGroupNumber();

// const logout = async () => {
//     console.log('bye');
//     await fetch(
//         `http://${backendIPAddress}/courseville/logout`,
//         { credentials: "include" }
//     );
//     localStorage.removeItem("hasAlreadyRedirected");
//     setTimeout(() => {
//         // window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
//         window.location.href = `http://youtube.com`;
//     }, 1000); // wait 1 second before redirecting
// };

authorizeApplication();