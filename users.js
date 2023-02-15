import { createPageMainHeader } from "./header.js";

async function init() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users?_embed=posts"
  );
  const users = await res.json();

  createPageMainHeader();

  const pageContent = document.querySelector("#page-content");
  const usersList = createListElement(users);
  pageContent.append(usersList);
}

function createListElement(users) {
  const usersList = document.createElement("ul");
  usersList.classList.add("users-list", "data-list");

  users.forEach((user) => {
    const postsCount = user.posts.length;
    const userItem = document.createElement("li");
    userItem.classList.add("user-item");
    const userLink = document.createElement("a");
    userLink.textContent = user.name + postsCount;
    userLink.href = `./user.html?id=${user.id}`;
    userItem.append(userLink);

    usersList.append(userItem);
  });

  return usersList;
}

init();
