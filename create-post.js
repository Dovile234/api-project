import { fetchData } from "./functions.js";
import header from "./header.js";

header();

async function init() {
  const form = document.getElementById("post-form");
  const selectElement = document.getElementById("user");
  const postWrap = document.querySelector(".post-wrapper");

  getOptionElements(selectElement);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const body = event.target.body.value;
    const userId = Number(event.target.user.value);

    const newUserData = {
      title,
      body,
      userId,
    };

    const fetchParams = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(newUserData),
    };

    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      fetchParams
    );
    const newPost = await res.json();

    const newPostElement = await createPost(newPost);

    postWrap.innerHTML = "";
    postWrap.append(newPostElement);

    event.target.reset();
  });
}

init();

async function getOptionElements(selectElement) {
  const users = await fetchData("https://jsonplaceholder.typicode.com/users");

  users.map((user) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = user.name;
    optionElement.value = user.id;

    selectElement.append(optionElement);
  });
}

async function createPost(post) {
  console.log(post);
  const user = await fetchData(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  );
  const newPostWrapper = document.createElement("div");
  newPostWrapper.innerHTML = ` 
  <span>Author: ${user.name}</span>
  <h2>${post.title}</h2>
  <p>${post.body}</p>`;
  return newPostWrapper;
}
