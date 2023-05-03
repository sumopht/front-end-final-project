// const search = document.querySelector('.input-group'),
//     table_rows = document.querySelectorAll('tbody tr'),
//     table_headings = document.querySelectorAll('thead th');

// // 2. Sorting | Ordering data of HTML table

// table_headings.forEach((head, i) => {
//     head.onclick = () => {
//         table_headings.forEach(head => head.classList.remove('active'));
//         head.classList.add('active');

//         document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
//         table_rows.forEach(row => {
//             row.querySelectorAll('td')[i].classList.add('active');
//         })

//         sortTable(i);
//     }
// })


// function sortTable(column, sort_asc) {
//     [...table_rows].sort((a, b) => {
//         let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
//             second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

//         return (first_row < second_row ? -1 : 1);
//     })
//         .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
// }


// // ------------------------------------------------------
// const taskInput = document.querySelector(".task-input input"),
// filters = document.querySelectorAll(".filters span"),
// clearAll = document.querySelector(".clear-btn"),
// taskBox = document.querySelector(".task-box");

// let editId,
// isEditTask = false,
// todos = JSON.parse(localStorage.getItem("todo-list"));

// filters.forEach(btn => {
//     btn.addEventListener("click", () => {
//         document.querySelector("span.active").classList.remove("active");
//         btn.classList.add("active");
//         showTodo(btn.id);
//     });
// });

// function showTodo(filter) {
//     let liTag = "";
//     if(todos) {
//         todos.forEach((todo, id) => {
//             let completed = todo.status == "completed" ? "checked" : "";
//             if(filter == todo.status || filter == "all") {
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
//         if(e.target.tagName != "I" || e.target != selectedTask) {
//             menuDiv.classList.remove("show");
//         }
//     });
// }

// function updateStatus(selectedTask) {
//     let taskName = selectedTask.parentElement.lastElementChild;
//     if(selectedTask.checked) {
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
//     if(e.key == "Enter" && userTask) {
//         if(!isEditTask) {
//             todos = !todos ? [] : todos;
//             let taskInfo = {name: userTask, status: "pending"};
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


const checkbox = document.getElementById("dark-light");
const table = document.querySelector(".table");
const table__body = document.querySelector(".table__body");
const body = document.body;

checkbox.addEventListener("change", function () {
    if (this.checked) {
        table.classList.add("dark-mode");
        table__body.classList.add("dark-mode");
        body.classList.add("dark-mode");
    } else {
        table.classList.remove("dark-mode");
        table__body.classList.remove("dark-mode");
        body.classList.remove("dark-mode");

    }
});
// const darkModeThs = document.querySelectorAll('.dark-mode thead th');
// const darkModeSubheader = document.querySelector('.table__Subheader');
// const h1 = darkModeSubheader.querySelector('h1');
// const div = darkModeSubheader.querySelector('div');


// darkModeThs.forEach((th) => {
//   th.style.backgroundColor = '#5c0cacfe';
//   th.style.cursor = 'pointer';
//   th.style.textTransform = 'capitalize';
//   h1.style.color = '#000000';
//   div.style.color = '#000000';
//   th.style.color = '#000000';
// });


