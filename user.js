import header from "./header.js";
import { toUpperCase } from "./functions.js";

async function getUser() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/?_embed=posts&_embed=albums`
  );
  const user = await res.json();
  const content = document.getElementById("page-content");

  header();

  const userPosts = getPosts(user.posts);
  const userAlbums = getAlbums(user.albums);

  const userInfo = document.createElement("div");
  userInfo.classList.add("user-info");

  let postsTitle = document.createElement("h2");
  postsTitle.classList.add("posts-title");
  let albumsTitle = document.createElement("h2");
  postsTitle.textContent = "POSTS";
  albumsTitle.textContent = "Albums";

  userInfo.style.marginBottom = "50px";
  let name = user.name;
  let username = user.username;
  let email = user.email;
  let address =
    user.address.street +
    " " +
    user.address.suite +
    "," +
    user.address.city +
    " " +
    user.address.zipcode;
  let lat = user.address.geo.lat;
  let lng = user.address.geo.lng;
  let phone = user.phone;
  let website = user.website;
  let company = user.company.name;

  userInfo.innerHTML = `
  <h1>${name}</h1>
  <p>Username: ${username}</p>
  <p>Email: ${email}</p>
  <p>Company name: ${company}</p>
  <h3>Contacts:</h3>
  <ul class="user-contacts">
  <li class="list-item">Address: <a href="https://maps.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">${address}</a></li>
  <li class="list-item">Phone: <a href=""> ${phone}</a></li>
  <li class="list-item">Website: <a href="">${website}</a></li>
</ul>`;

  content.append(userInfo, postsTitle, userPosts, albumsTitle, userAlbums);
}

getUser();

function getPosts(posts) {
  const userPosts = document.createElement("div");
  userPosts.classList.add("posts-wrapper");

  posts.map((post) => {
    let userPost = document.createElement("a");
    userPost.classList.add("post-item");
    userPost.href = `./post.html?id=${post.id}`;
    let title = post.title;
    let body = post.body;
    console.log(post);

    userPost.innerHTML = `
<h3>${toUpperCase(title)}</h3>
<p>${toUpperCase(body)}</p>`;
    userPosts.append(userPost);
  });
  return userPosts;
}

function getAlbums(albums) {
  const userAlbums = document.createElement("div");
  userAlbums.classList.add("user-albums");
  const albumList = document.createElement("ul");

  albums.map((album) => {
    const albumItem = document.createElement("li");
    let title = album.title;
    let albumLink = document.createElement("a");
    albumLink.href = `./album.html?id=${album.id}`;
    albumLink.textContent = toUpperCase(title);
    albumItem.append(albumLink);
    albumList.append(albumItem);
  });

  userAlbums.append(albumList);
  return userAlbums;
}
