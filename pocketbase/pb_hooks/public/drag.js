// https://www.geeksforgeeks.org/create-a-drag-and-drop-sortable-list-using-html-css-javascript/

const updateDbSort = (idList) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const pocketbaseUrl = document.querySelectorAll("body")[0].getAttribute("data-pocketbase-url");
    fetch(`${pocketbaseUrl}/sortApi/`, {
        method: "PATCH",
        body: JSON.stringify(idList),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
    })
        .then((response) => {
            if (response.ok) {
                console.log("Updated database");
            } else {
                console.log("Failed to update database");
            }
        });
}

const normalizeSort = (sort) => {
    return parseInt(sort.replace(" &nbsp;", ""));
};

const setIds = (updateDb) => {
    const idList = document.getElementsByClassName("art-id");
    Array.from(idList).forEach((item, index) => {
        if (index + 1 >= 10) {
            item.innerHTML = index + 1;
        } else {
            item.innerHTML = `${index + 1} &nbsp;` // add space and nbsp for even spacing
        }
    });
    if (updateDb) {
        const list = [...idList].map((item) => {
            const sort = normalizeSort(item.innerHTML);
            const id = item.getAttribute("data-img-id");
            return { sort, id }
        });
        console.log(list);
        updateDbSort(list);
    }
};

const setIdSince = (idList, since) => {
    idList.forEach((item, index) => {
        if (index >= since) {
            if (index >= 10) {
                item.innerHTML = `${taticSortableList[index].innerHTML + 1}`
            } else {
                item.innerHTML = `${taticSortableList[index].innerHTML + 1} &nbsp;`;
            }
        }
    });
}

let staticSortableList;
window.onload = () => {
    staticSortableList = [...document.querySelectorAll('li[draggable="true"]')];
};

const sortableList = document.getElementById(
    "sortable"
);
let draggedItem = null;

sortableList.addEventListener(
    "dragstart",
    (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.classList.add("dragging");
            e.target.style.display =
                "none";
        }, 0);
    });

const removePlaceholders = () => {
    const placeholderEl = document.querySelectorAll(".placeholder");
    // This shouldnt happen, but just to be sure
    if ([...placeholderEl].length > 0) {
        [...placeholderEl].forEach(item => {
            item.remove()
        });
    }
    placeholderEl[0].remove();
};

sortableList.addEventListener(
    "dragend",
    (e) => {
        setTimeout(() => {
            e.target.style.display = "";
            e.target.classList.remove("dragging");
            draggedItem = null;
            removePlaceholders();
            setIds(true);
        }, 0);
    });

const getDragAfterElement = (
    container, y
) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];

    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };
            }
            else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};

let placeholderEl = document.createElement("div");
placeholderEl.classList = "art-container__inner placeholder"
// <div class="art-container__inner" style="height: 60px;"></div>

sortableList.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(sortableList, e.clientY);
        const currentElement = document.querySelector(".dragging");
        if (afterElement == null) {
            sortableList.appendChild(
                placeholderEl
            );
            sortableList.appendChild(
                draggedItem
            );
        }
        else {
            sortableList.insertBefore(
                placeholderEl,
                afterElement
            );
            sortableList.insertBefore(
                draggedItem,
                afterElement
            );
            // index = staticSortableList.indexOf(afterElement);
            // setIdSince(document.getElementsByClassName("art-id"), index);
        }
});