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
            <li class="list__item">
            <button class="list__button list__button--done">Done</button>${task.content}
            <button class="list__button list__button--delete">Delete</button>
            </li>
            `
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}