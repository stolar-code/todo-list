{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        document.querySelector(".js-newTask").value = "";

        render();
    };

    const markAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };


    const bindEventsSection = () => {
        const doneAllButton = document.querySelector(".js-doneAll")

        doneAllButton.addEventListener("click", () => {
            markAllTasks();
        })
    };

    const toggleTasksDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1),
        ];

        render();
    }

    const removeTasks = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const bindEventsList = () => {
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
            <li class="list__item">
<button class="button list__button list__button--done js-done ${task.done ? "list__button--done-js" : ""}"><i class="fas fa-check"></i></button><span class="list__content ${task.done ? "list__content--special" : ""}">${task.content}</span><button class="button list__button list__button--remove js-remove"><i class="fas fa-times"></i></button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEventsList();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        document.querySelector(".js-newTask").focus()

        if (!newTaskContent) {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        bindEventsSection();
    };

    init();
}