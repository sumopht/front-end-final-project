const checkbox = document.getElementById("dark-light");
const table = document.querySelector(".table");
const table__body = document.querySelector(".table__body");
const body = document.body;

checkbox.addEventListener("change", function() {
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
