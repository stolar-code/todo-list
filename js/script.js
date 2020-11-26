{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });

        render();
    };

    const toggleTasksDone = (index) => {
        tasks[index].done = !tasks[index].done;

        render();
    }

    const removeTasks = (index) => {
        tasks.splice(index, 1);

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTasks(index);
            });
        });

        const doneButtons = document.querySelectorAll(".js-done")

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTasksDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done ? "list__item--special" : ""}">
<button class="list__button list__button--done js-done">✔</button>${task.content}<button class="list__button list__button--remove js-remove">✖</button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (!newTaskContent) {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}