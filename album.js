import { createPageMainHeader } from "./header.js";

async function getAlbum() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("id");
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`
  );
  const album = await res.json();
  const content = document.getElementById("page-content");

  createPageMainHeader();
  let photo = getPhoto(album.photos);

  let albumWrap = document.createElement("div");
  albumWrap.classList.add("album-wrapper");

  let { title, user } = album;

  let albumTitle = document.createElement("h1");
  albumTitle.textContent = title;
  let name = document.createElement("a");
  name.textContent = user.name;
  name.href = `./user.html?id=${album.userId}`;

  albumWrap.append(albumTitle, name);

  content.append(albumWrap, photo);
}

getAlbum();

function getPhoto(photos) {
  let photosWrap = document.createElement("div");

  photos.map((photo) => {
    const photoLink = document.createElement("a");
    photoLink.classList.add("photo-item");
    photoLink.href = photo.url;
    photoLink.setAttribute("target", "_blank");
    photosWrap.append(photoLink);

    const image = document.createElement("img");
    image.classList.add("photo-item");
    image.src = photo.thumbnailUrl;
    image.alt = photo.title;
    photoLink.append(image);
  });
  return photosWrap;
}
