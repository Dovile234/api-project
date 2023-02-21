import header from "./header.js";
import { toUpperCase } from "./functions.js";

async function getPost() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  // const queryParams = location.search;
  // const urlParams = new URLSearchParams(queryParams)

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/?_expand=user&_embed=comments`
  );
  const post = await res.json();
  const content = document.getElementById("page-content");
  console.log(post);

  header();

  let comment = getComments(post.comments);

  let postTitle = document.createElement("h1");
  postTitle.textContent = toUpperCase(post.title);
  let user = document.createElement("a");
  user.textContent = post.user.name;
  user.href = `./user.html?id=${post.userId}`;
  let postContent = document.createElement("p");
  postContent.textContent = toUpperCase(post.body);
  let link = document.createElement("a");
  link.textContent = "Other posts";
  link.href = `./posts.html?id=${post.userId}`;

  let postEditLink = document.createElement("a");
  postEditLink.textContent = "Edit Post";
  postEditLink.href = `./edit-post.html?id=${id}`;

  content.append(postTitle, user, postContent, comment, link, postEditLink);
}

function getComments(comments) {
  let commentsWrap = document.createElement("div");
  let commentsTitle = document.createElement("h2");
  commentsTitle.textContent = "Comments:";
  commentsWrap.classList.add("comments-wrapper");

  if (comments.length === 0) {
    commentsTitle.textContent = "No comments";
    return commentsWrap;
  }

  comments.map((comment) => {
    let commentTitle = document.createElement("h3");
    commentTitle.textContent = toUpperCase(comment.name);
    let commentContent = document.createElement("p");
    commentContent.textContent = toUpperCase(comment.body);
    let email = document.createElement("p");
    email.innerHTML = `Email: <a href=''>${comment.email}</a>`;

    commentsWrap.append(commentTitle, commentContent, email);
  });
  commentsWrap.prepend(commentsTitle);
  return commentsWrap;
}

getPost();
