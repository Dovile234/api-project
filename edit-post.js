import { fetchData, getParams } from "./functions.js";

async function init() {
  const editForm = document.getElementById("edit-form");
  const postWrap = document.getElementById("post-wrapper");

  const body = editForm.body;
  const title = editForm.title;
  const userSelect = editForm.user;

  const users = await fetchData("https://jsonplaceholder.typicode.com/users");

  users.map((user) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = user.name;
    optionElement.value = user.id;

    userSelect.append(optionElement);
  });

  const postId = getParams("id");
  const postToEdit = await fetchData(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  console.log(postToEdit);
  user.value = postToEdit.userId;
  title.value = postToEdit.title;
  body.value = postToEdit.body;

  editForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newPost = await fetchData(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: postId,
          title: event.target.title.value,
          body: event.target.body.value,
          userId: Number(event.target.user.value),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    let { body, title, userId } = newPost;

    console.log(newPost);

    const user = await fetchData(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    const newPostWrapper = document.createElement("div");
    newPostWrapper.innerHTML = ` 
  <span>Author: ${user.name}</span>
  <h2 class="post-title">${title}</h2>
  <p>${body}</p>`;

    postWrap.append(newPostWrapper);
    event.target.reset();
  });
}

init();
