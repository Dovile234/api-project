import { createPageMainHeader } from "./header.js";

async function init() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=25&_expand=user"
  );
  const posts = await res.json();

  const pageContent = document.querySelector("#page-content");
  createPageMainHeader();
  const postsList = createPostsListElement(posts);
  pageContent.append(postsList);
}

function createPostsListElement(posts) {
  const postsList = document.createElement("ul");
  postsList.classList.add("posts-list", "data-list");

  posts.map((post) => {
    const userName = post.user.name;

    const postItem = document.createElement("li");
    postItem.classList.add("post-item");

    const postLink = document.createElement("a");
    postLink.textContent = post.title;
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
