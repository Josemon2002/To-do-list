let form = document.querySelector("form");
let new_inp = document.querySelector(".new-inp");
let add = document.querySelector(".add");
let glass_box = document.querySelector(".glass");
let check_box = document.querySelector(".cb");
let new_task = document.querySelector(".new-task");
let task_sec = document.querySelector(".tasksec");
let tasks = JSON.parse(localStorage.getItem("MyTask")) || [];

document.addEventListener("DOMContentLoaded", function () {
  if (tasks.length === 0) {
    let subTaskHTML = `<div class="empty-task">No tasks for now.</div>`;
    task_sec.insertAdjacentHTML("beforeend", subTaskHTML);
  } else {
    tasks.forEach((taskText) => {
      let subTaskHTML = `<div class="sub-task">
<input class="cb" type="checkbox" ${taskText.checked ? "checked" : ""}>
<div class="task-item" style="text-decoration: ${
        taskText.checked ? "line-through" : "none"
      };">
${taskText.text}
</div>
<svg class="del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="Delete">
<path d="M298.656 187.5c-10.096 0-18.281 8.185-18.281 18.281v129.188c0 10.096 8.185 18.281 18.281 18.281s18.281-8.185 18.281-18.281V205.781c.001-10.096-8.184-18.281-18.281-18.281z" fill="transparent" class="color000000 svgShape"></path>
<path class="hover-color" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm109.688 163.125v202.312c0 20.193-16.37 36.562-36.562 36.562h-146.25c-20.193 0-36.562-16.37-36.562-36.562V163.125c-13.462 0-24.375-10.913-24.375-24.375s10.913-24.375 24.375-24.375h49.796c3.232 0 6.332-1.284 8.618-3.57l17.236-17.236a12.19 12.19 0 0 1 8.618-3.57h50.841c3.232 0 6.332 1.284 8.618 3.57l17.236 17.236a12.186 12.186 0 0 0 8.618 3.57h49.795c13.462 0 24.375 10.913 24.375 24.375s-10.916 24.375-24.377 24.375z" fill="#9b9d9d" class="color000000 svgShape"></path>
<path d="M213.344 187.5c-10.096 0-18.281 8.185-18.281 18.281v129.188c0 10.096 8.185 18.281 18.281 18.281s18.281-8.185 18.281-18.281V205.781c0-10.096-8.185-18.281-18.281-18.281z" fill="transparent" class="color000000 svgShape"></path>
</div></div><br>`;
      task_sec.insertAdjacentHTML("beforeend", subTaskHTML);
    });
  }
});

function update_new_task(input) {
  new_task.classList.remove("new-task-shake");
  if (input != "") {
    let emptyTask = document.querySelector(".empty-task");
    if (emptyTask) {
      emptyTask.remove();
    }
    let subTaskHTML = `<div class="sub-task">

<input class="cb" type="checkbox">

<div class="task-item">${input}</div>

<svg class="del" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="Delete">

<path d="M298.656 187.5c-10.096 0-18.281 8.185-18.281 18.281v129.188c0 10.096 8.185 18.281 18.281 18.281s18.281-8.185 18.281-18.281V205.781c.001-10.096-8.184-18.281-18.281-18.281z" fill="transparent" class="color000000 svgShape"></path>

<path class="hover-color" d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm109.688 163.125v202.312c0 20.193-16.37 36.562-36.562 36.562h-146.25c-20.193 0-36.562-16.37-36.562-36.562V163.125c-13.462 0-24.375-10.913-24.375-24.375s10.913-24.375 24.375-24.375h49.796c3.232 0 6.332-1.284 8.618-3.57l17.236-17.236a12.19 12.19 0 0 1 8.618-3.57h50.841c3.232 0 6.332 1.284 8.618 3.57l17.236 17.236a12.186 12.186 0 0 0 8.618 3.57h49.795c13.462 0 24.375 10.913 24.375 24.375s-10.916 24.375-24.377 24.375z" fill="#9b9d9d" class="color000000 svgShape"></path>

<path d="M213.344 187.5c-10.096 0-18.281 8.185-18.281 18.281v129.188c0 10.096 8.185 18.281 18.281 18.281s18.281-8.185 18.281-18.281V205.781c0-10.096-8.185-18.281-18.281-18.281z" fill="transparent" class="color000000 svgShape"></path>

</div></div><br>`;

    task_sec.insertAdjacentHTML("beforeend", subTaskHTML);

    new_inp.value = "";

    new_inp.focus();

    tasks.push({ text: input, checked: false });

    localStorage.setItem("MyTask", JSON.stringify(tasks));

    // localStorage.removeItem('MyTask');
  } else {
    new_task.classList.add("new-task-shake");

    new_inp.focus();
  }

  new_task.addEventListener("animationend", function () {
    new_task.classList.remove("new-task-shake");
  });
}

glass_box.addEventListener("click", function (event) {
  let taskitem = event.target.nextElementSibling;

  if (event.target.checked) {
    taskitem.style.textDecoration = "line-through";

    tasks.forEach((task) => {
      if (task.text === event.target.nextElementSibling.textContent) {
        task.checked = true;

        localStorage.setItem("MyTask", JSON.stringify(tasks));
      }
    });
  } else {
    taskitem.style.textDecoration = "none";

    tasks.forEach((task) => {
      if (task.text === event.target.nextElementSibling.textContent) {
        task.checked = false;

        localStorage.setItem("MyTask", JSON.stringify(tasks));
      }
    });
  }

  let delButton = event.target.closest(".del");

  if (delButton) {
    let subTask = delButton.closest(".sub-task");

    let userTask = subTask.querySelector(".task-item");

    console.log(userTask);

    if (subTask) {
      let nextElem = subTask.nextSibling;

      if (nextElem && nextElem.nodeName === "BR") {
        nextElem.remove();
      }

      subTask.remove();

      let loc_storage = localStorage.getItem("MyTask");

      if (loc_storage) {
        let tasks = [];

        tasks = JSON.parse(loc_storage);

        let index = tasks.findIndex(
          (item) => item.text === userTask.textContent.trim()
        );

        console.log(index);

        if (index > -1) {
          tasks.splice(index, 1);
          localStorage.setItem("MyTask", JSON.stringify(tasks));
          console.log(tasks);
          if (tasks.length === 0) {
            let subTaskHTML = `<div class="empty-task">All tasks done!</div>`;
            task_sec.insertAdjacentHTML("beforeend", subTaskHTML);
          }
        }
      }
    }
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const button = e.submitter;

  if (button.value === "add") {
    update_new_task(new_inp.value);
  } else if (button.value === "clear") {
    new_inp.value = "";

    new_inp.focus();
  }
});
window.addEventListener("load", handleResize);
window.addEventListener("resize", handleResize);
function handleResize() {
  let height = window.innerHeight;
  let width = window.innerWidth;

  if (width <= 549) {
    let oper = (Number(0.3) * height * Number(0.6)) / Number(2.5);
    let task = Number(0.7) * height;
    let glass = Number(0.8) * task;
    let mytasks = Number(0.15) * glass;
    let tasksec = Number(0.85) * glass;
    let subtask = Number(0.1) * tasksec;

    document.documentElement.style.setProperty(
      `--title`,
      Number(0.3) * height + "px"
    );
    document.documentElement.style.setProperty(
      `--task`,
      Number(0.7) * height + "px"
    );
    document.documentElement.style.setProperty(
      `--desc`,
      Number(0.3) * height * Number(0.4) + "px"
    );
    document.documentElement.style.setProperty(
      `--oper`,
      Number(0.3) * height * Number(0.75) + "px"
    );
    document.documentElement.style.setProperty(
      `--fontsize`,
      (Number(2) * (Number(0.3) * height + Number(0.4) * width) * Number(0.1)) /
        Number(2.5) +
        "px"
    );
    document.documentElement.style.setProperty(
      `--operheight`,
      (Number(0.3) * height * Number(0.6)) / Number(2.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskboradius`,
      Number(0.3) * height * Number(0.6) * Number(0.1) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskfontsize`,
      oper / Number(2.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--addclear`,
      oper / Number(1.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassheight`,
      task * Number(0.8) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassmytask`,
      Number(0.15) * glass + "px"
    );
    document.documentElement.style.setProperty(
      `--glasstasksec`,
      glass * Number(0.85) + "px"
    );
    document.documentElement.style.setProperty(
      `--mytaskfont`,
      mytasks / Number(2.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--subtaskh`,
      Number(0.1) * tasksec + "px"
    );
    document.documentElement.style.setProperty(
      `--cbh`,
      subtask / Number(2) + "px"
    );
    document.documentElement.style.setProperty(
      `--dh`,
      subtask / Number(1.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--emptytaskfs`,
      tasksec * Number(0.1) + "px"
    );
  } else if (width > 550 && width < 1025) {
    let oper = Number(0.3) * height * Number(0.25);
    let task = Number(0.7) * height;
    let glass = Number(0.8) * task;
    let mytasks = Number(0.15) * glass;
    let tasksec = Number(0.85) * glass;
    let subtask = Number(0.1) * tasksec;

    document.documentElement.style.setProperty(
      `--title`,
      Number(0.3) * height + "px"
    );
    document.documentElement.style.setProperty(
      `--task`,
      Number(0.7) * height + "px"
    );
    document.documentElement.style.setProperty(
      `--desc`,
      width * Number(0.4) + "px"
    );
    document.documentElement.style.setProperty(
      `--oper`,
      width * Number(0.6) + "px"
    );
    document.documentElement.style.setProperty(
      `--fontsize`,
      (Number(2) * ((Number(0.3) * oper) + Number(0.4) * width) * Number(0.1)) /
        Number(2.5) +
        "px"
    );
    document.documentElement.style.setProperty(
      `--operheight`,
      Number(0.3) * height * Number(0.25) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskboradius`,
      Number(0.3) * height * Number(0.08) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskfontsize`,
      oper / Number(2.25) + "px"
    );
    document.documentElement.style.setProperty(
      `--addclear`,
      Number(2) * ((width * Number(0.6) * Number(0.9) * Number(0.12)) + (Number(0.3) * height * Number(0.25))) * Number(.2) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassheight`,
      task * Number(0.8) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassmytask`,
      Number(0.15) * glass + "px"
    );
    document.documentElement.style.setProperty(
      `--glasstasksec`,
      glass * Number(0.85) + "px"
    );
    document.documentElement.style.setProperty(
      `--mytaskfont`,
      mytasks / Number(2.25) + "px"
    );
    document.documentElement.style.setProperty(
      `--subtaskh`,
      Number(0.1) * tasksec + "px"
    );
    document.documentElement.style.setProperty(
      `--cbh`,
      subtask / Number(1.75) + "px"
    );
    document.documentElement.style.setProperty(
      `--dh`,
      subtask / Number(1.25) + "px"
    );
    document.documentElement.style.setProperty(
      `--emptytaskfs`,
      tasksec * Number(0.1) + "px"
    );
  } else {
    let oper = Number(0.6) * height * Number(0.15);
    let task = Number(0.7) * height;
    let glass = height * Number(0.8);
    let mytasks = Number(0.15) * glass;
    let tasksec = Number(0.85) * glass;
    let subtask = Number(0.1) * tasksec;
    let taskwidth = Number(0.4) * width;

    document.documentElement.style.setProperty(
      `--title`,
      Number(0.4) * width + "px"
    );
    document.documentElement.style.setProperty(
      `--task`,
      Number(0.6) * width + "px"
    );
    console.log(Number(0.3) * width, Number(0.7) * width);
    document.documentElement.style.setProperty(
      `--desc`,
      height * Number(0.4) + "px"
    );
    document.documentElement.style.setProperty(
      `--oper`,
      height * Number(0.6) + "px"
    );
    document.documentElement.style.setProperty(
      `--fontsize`,
      (Number(2) * (Number(0.4) * height + Number(0.4) * width) * Number(0.1)) /
        Number(2.5) +
        "px"
    );
    document.documentElement.style.setProperty(
      `--operheight`,
      Number(0.6) * height * Number(0.15) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskboradius`,
      Number(0.6) * height * Number(0.05) + "px"
    );
    document.documentElement.style.setProperty(
      `--taskwidth`,
      Number(0.4) * width + "px"
    );
    document.documentElement.style.setProperty(
      `--taskfontsize`,
      oper / Number(2.5) + "px"
    );
    document.documentElement.style.setProperty(
      `--addclear`,
      (Number(2) * (oper + taskwidth) * Number(0.1)) / Number(3) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassheight`,
      height * Number(0.8) + "px"
    );
    document.documentElement.style.setProperty(
      `--glassmytask`,
      Number(0.15) * glass + "px"
    );
    document.documentElement.style.setProperty(
      `--glasstasksec`,
      glass * Number(0.85) + "px"
    );
    document.documentElement.style.setProperty(
      `--mytaskfont`,
      mytasks / Number(2.25) + "px"
    );
    document.documentElement.style.setProperty(
      `--subtaskh`,
      Number(0.1) * tasksec + "px"
    );
    document.documentElement.style.setProperty(
      `--cbh`,
      subtask / Number(1.75) + "px"
    );
    document.documentElement.style.setProperty(
      `--dh`,
      subtask / Number(1.1) + "px"
    );
    document.documentElement.style.setProperty(
      `--emptytaskfs`,
      tasksec * Number(0.075) + "px"
    );
  }
}
