// const search = document.querySelector('.input-group'),
//     table_rows = document.querySelectorAll('tbody tr'),
//     table_headings = document.querySelectorAll('thead th');

// // 1. Searching for specific data of HTML table
// function getData() {
//     table_rows.forEach((row, i) => {
//         let table_data = row.textContent.toLowerCase();
//     });
// }

// // 2. Sorting | Ordering data of HTML table

// table_headings.forEach((head, i) => {
//     let sort_asc = true;
//     head.onclick = () => {
//         table_headings.forEach(head => head.classList.remove('active'));
//         head.classList.add('active');

//         document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
//         table_rows.forEach(row => {
//             row.querySelectorAll('td')[i].classList.add('active');
//         })

//         head.classList.toggle('asc', sort_asc);
//         sort_asc = head.classList.contains('asc') ? false : true;

//         sortTable(i, sort_asc);
//     }
// })


// function sortTable(column, sort_asc) {
//     [...table_rows].sort((a, b) => {
//         let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
//             second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

//         return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
//     })
//         .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
// }


// // ------------------------------------------------------
// const taskInput = document.querySelector(".task-input input"),
//     filters = document.querySelectorAll(".filters span"),
//     clearAll = document.querySelector(".clear-btn"),
//     taskBox = document.querySelector(".task-box");

// let editId,
//     isEditTask = false,
//     todos = JSON.parse(localStorage.getItem("todo-list"));

// filters.forEach(btn => {
//     btn.addEventListener("click", () => {
//         document.querySelector("span.active").classList.remove("active");
//         btn.classList.add("active");
//         showTodo(btn.id);
//     });
// });

// function showTodo(filter) {
//     let liTag = "";
//     if (todos) {
//         todos.forEach((todo, id) => {
//             let completed = todo.status == "completed" ? "checked" : "";
//             if (filter == todo.status || filter == "all") {
//                 liTag += `<li class="task">
//                             <label for="${id}">
//                                 <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
//                                 <p class="${completed}">${todo.name}</p>
//                             </label>
//                         </li>`;
//             }
//         });
//     }
//     taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
//     let checkTask = taskBox.querySelectorAll(".task");
//     !checkTask.length ? clearAll.classList.remove("active") : clearAll.classList.add("active");
//     taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow");
// }
// showTodo("all");

// function showMenu(selectedTask) {
//     let menuDiv = selectedTask.parentElement.lastElementChild;
//     menuDiv.classList.add("show");
//     document.addEventListener("click", e => {
//         if (e.target.tagName != "I" || e.target != selectedTask) {
//             menuDiv.classList.remove("show");
//         }
//     });
// }

// function updateStatus(selectedTask) {
//     let taskName = selectedTask.parentElement.lastElementChild;
//     if (selectedTask.checked) {
//         taskName.classList.add("checked");
//         todos[selectedTask.id].status = "completed";
//     } else {
//         taskName.classList.remove("checked");
//         todos[selectedTask.id].status = "pending";
//     }
//     localStorage.setItem("todo-list", JSON.stringify(todos))
// }

// function editTask(taskId, textName) {
//     editId = taskId;
//     isEditTask = true;
//     taskInput.value = textName;
//     taskInput.focus();
//     taskInput.classList.add("active");
// }

// function deleteTask(deleteId, filter) {
//     isEditTask = false;
//     todos.splice(deleteId, 1);
//     localStorage.setItem("todo-list", JSON.stringify(todos));
//     showTodo(filter);
// }

// clearAll.addEventListener("click", () => {
//     isEditTask = false;
//     todos.splice(0, todos.length);
//     localStorage.setItem("todo-list", JSON.stringify(todos));
//     showTodo()
// });

// taskInput.addEventListener("keyup", e => {
//     let userTask = taskInput.value.trim();
//     if (e.key == "Enter" && userTask) {
//         if (!isEditTask) {
//             todos = !todos ? [] : todos;
//             let taskInfo = { name: userTask, status: "pending" };
//             todos.push(taskInfo);
//         } else {
//             isEditTask = false;
//             todos[editId].name = userTask;
//         }
//         taskInput.value = "";
//         localStorage.setItem("todo-list", JSON.stringify(todos));
//         showTodo(document.querySelector("span.active").id);
//     }
// });



// ---------------- drop down list test


const addTaskToDB = async (assignmentTitle) => {
    let student_id;
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`http://${backendIPAddress}/courseville/get_user_info`, options)
        .then((response) => response.json())
        .then((data) => {
            student_id = data.data.student.id;

            const taskToAdd = {
                student_id: student_id,
                task_title: assignmentTitle,
            };

            const options = {
                method: "POST",
                credential: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskToAdd),
            };

            fetch(`http://${backendIPAddress}/tasks`, options)
                .then((response) => console.log(response))
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
};




// const getTaskFromDB = async () => {
//     const option = {
//         method: "GET",
//         credentials: "include"
//     };
//     await fetch(`https://${backendIPAddress}/API/get_student`, options)
//         .then((response) => response.json)
//         .then((data) => {

//         })
//         .catch((error) => console.error(error));
// }

const showTasksInTable = async () => {
    const task_list = document.getElementById("list-of-task");
    task_list.innerHTML = "";
    const options = {
        method: "GET",
        credentials: "include",
    };
    await fetch(`https://${backendIPAddress}/API/get_student`, options) //wrong
        .then((response) => response.json)
        .then((data) => {
            console.log(data);
        })
        .catch((error) => console.error(error));













    // await fetch(`http://${backendIPAddress}/courseville/get_courses`, options)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const courses = data;
    //         console.log(courses.data.student);
    //         courses.data.student.map((course) => {
    //             fetch(`http://${backendIPAddress}/courseville/get_course_info/${course.cv_cid}`, options)
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     const item1 = data;
    //                     // console.log(item1.data.title);
    //                     // ----------------- FILL IN YOUR CODE UNDER THIS AREA ONLY ----------------- //
    //                     course_dropdown.innerHTML += `<option value="${course.cv_cid}">${item1.data.title}</option>`;
    //                     // ----------------- FILL IN YOUR CODE ABOVE THIS AREA ONLY ----------------- //
    //                 }).catch((error) => console.error(error));
    //         });
    //     })
    //     .catch((error) => console.error(error));
};