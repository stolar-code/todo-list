{
    let tasks = [];
    let hideShowDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        document.querySelector(".js-newTask").value = "";

        render();
    };

    const bindButtonsEventsSection = () => {
        if (tasks) {
            const doneAllButton = document.querySelector(".js-doneAll")

            doneAllButton.addEventListener("click", () => {
                markAllTasks();
            });

            const toggleHideShowDoneTasksButton = document.querySelector(".js-toggleHideShowDoneTasks")

            toggleHideShowDoneTasksButton.addEventListener("click", () => {
                toggleHideShowDoneTasks();
            });
        };
    };

    const markAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideShowDoneTasks = () => {
        hideShowDoneTasks = !hideShowDoneTasks;

        render();
    };

    const bindButtonsEventsList = () => {
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

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${hideShowDoneTasks && task.done ? "list__item--hidden" : ""}">
            <button class="button list__button list__button--done js-done ${task.done ? "list__button--done-js" : ""}"><i class="fas fa-check"></i></button><span class="list__content ${task.done ? "list__content--special" : ""}">${task.content}</span><button class="button list__button list__button--remove js-remove"><i class="fas fa-times"></i></button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        if (tasks) {
            const buttonsSectionContainer = document.querySelector(".js-buttonsSectionContainer")

            buttonsSectionContainer.innerHTML = `
            <button class="button flexcontainer__button js-toggleHideShowDoneTasks">${hideShowDoneTasks ? "Show done tasks" : "Hide done tasks"}</button>
            <button class="button flexcontainer__button js-doneAll"${tasks.every(({ done }) => done) ? "disabled" : ""}>Mark all as done</button>
            `
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindButtonsEventsList();
        bindButtonsEventsSection();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        document.querySelector(".js-newTask").focus();

        if (newTaskContent) {
            addNewTask(newTaskContent);
        };
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}