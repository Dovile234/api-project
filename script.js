import header from "./header.js";
import { fetchData, toUpperCase } from "./functions.js";
header();

async function init() {
  const content = document.getElementById("content-wrapper");

  const posts = await fetchData(
    `https://jsonplaceholder.typicode.com/posts?_limit=7&_expand=user`
  );

  const users = await fetchData(
    "https://jsonplaceholder.typicode.com/users?_embed=posts"
  );

  const postsList = createPostsListElement(posts);
  const usersList = getUsers(users);

  content.append(postsList, usersList);
}

function createPostsListElement(posts) {
  const postsList = document.createElement("div");
  postsList.classList.add("posts-list");

  posts.map((post) => {
    const userName = post.user.name;

    const postItem = document.createElement("div");
    postItem.classList.add("post-item");

    const postTitle = document.createElement("h3");
    postTitle.textContent = toUpperCase(post.title);

    const postBody = document.createElement("p");
    postBody.textContent = post.body;

    const postAuthor = document.createElement("a");
    postAuthor.textContent = `${userName}`;
    postAuthor.href = `./user.html?id=${post.userId}`;

    postItem.append(postTitle, postBody, postAuthor);

    postsList.append(postItem);
  });

  return postsList;
}

function getUsers(users) {
  const usersList = document.createElement("div");
  const usersTitle = document.createElement("h2");
  usersTitle.textContent = "USERS:";
  usersList.classList.add("users-list");

  usersList.prepend(usersTitle);

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");

    const username = document.createElement("span");
    username.textContent = ` (${user.username})`;

    const userName = document.createElement("p");
    userName.textContent = `${user.name} (${user.username})`;

    const userLink = document.createElement("a");
    userLink.textContent = "View Profile";
    userLink.href = `./user.html?id=${user.id}`;

    userItem.append(userName, userLink);
    usersList.append(userItem);
  });

  return usersList;
}
init();
