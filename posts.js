import header from "./header.js";
import { toUpperCase, getParams, fetchData } from "./functions.js";

async function init() {
  const id = getParams("id");

  let userParamUrl = id ? `&userId=${id}` : "";
  const posts = await fetchData(
    `https://jsonplaceholder.typicode.com/posts?_limit=25&_expand=user${userParamUrl}`
  );

  const pageContent = document.querySelector("#page-content");
  header();
  const postsList = createPostsListElement(posts);
  pageContent.append(postsList);
}

function createPostsListElement(posts) {
  const postsList = document.createElement("ul");
  postsList.classList.add("posts-list", "data-list");

  posts.map((post) => {
    const userName = post.user.name;

    const postItem = document.createElement("li");
    postItem.classList.add("single-post");

    const postLink = document.createElement("a");
    postLink.textContent = toUpperCase(post.title);
    postLink.href = `./post.html?id=${post.id}`;

    const postAuthor = document.createElement("a");
    postAuthor.textContent = `${userName}`;
    postAuthor.href = `./user.html?id=${post.userId}`;

    postItem.append(postLink, " - ", postAuthor);

    postsList.append(postItem);
  });

  return postsList;
}

init();
