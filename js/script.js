{
    const tasks = [
        {
            content: "something1",
            done: true,
        },
        {
            content: "something2",
            done: false,
        }
    ];

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item ${task.done ? "list__item--special" : ""}">
<button class="list__button list__button--done">Done</button>${task.content}<button class="list__button list__button--delete">Delete</button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (!newTaskContent) {
            return;
        };

        addNewTask(newTaskContent);
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });

        render();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}