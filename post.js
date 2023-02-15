import { createPageMainHeader } from "./header.js";

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

  createPageMainHeader();

  let comment = getComments(post.comments);

  let postTitle = document.createElement("h1");
  postTitle.textContent = post.title;
  let user = document.createElement("a");
  user.textContent = post.user.name;
  user.href = post.user.website;
  let postContent = document.createElement("p");
  postContent.textContent = post.body;
  let link = document.createElement("a");
  link.textContent = "Other posts";
  link.href = `./posts.html?userId=${post.userId}`;

  console.log(comment);

  content.append(postTitle, user, postContent, comment, link);
}

function getComments(comments) {
  let commentsWrap = document.createElement("div");
  commentsWrap.classList.add("comments-wrapper");

  comments.map((comment) => {
    let commentTitle = document.createElement("h3");
    commentTitle.textContent = comment.name;
    let commentContent = document.createElement("p");
    commentContent.textContent = comment.body;
    let email = document.createElement("p");
    email.innerHTML = `Email: <a href=''>${comment.email}</a>`;

    commentsWrap.append(commentTitle, commentContent, email);
  });
  return commentsWrap;
}

getPost();
