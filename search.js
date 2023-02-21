import { fetchData, toUpperCase, getParams } from "./functions.js";
import header from "./header.js";
import searchForm from "./search-form.js";

async function init() {
  const searchQuery = getParams("search");
  const pageContent = document.querySelector("#page-content");

  header();

  const form = searchForm();
  const allSearchResults = await renderAllSearchResults(searchQuery);
  pageContent.append(form, allSearchResults);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = event.target["search"].value;

    document.querySelector(".all-search-results").remove();

    const searchInputResults = await renderAllSearchResults(searchInput);
    pageContent.append(searchInputResults);
  });
}

function searchResults(searchArr, searchCategory) {
  const resultsWrapper = document.createElement("div");
  resultsWrapper.classList.add("results-wrapper");

  const searchWrapperTitle = document.createElement("h2");

  resultsWrapper.append(searchWrapperTitle);

  if (searchArr.length === 0) {
    searchWrapperTitle.textContent = `No ${searchCategory} found`;
    return resultsWrapper;
  }

  searchWrapperTitle.textContent = `${toUpperCase(searchCategory)} (${
    searchArr.length
  }):`;

  const searchList = document.createElement("ul");
  searchList.classList.add("search-list");

  resultsWrapper.append(searchList);

  searchArr.map((item) => {
    const searchItem = document.createElement("li");
    searchItem.classList.add("search-item");

    const searchLink = document.createElement("a");
    searchLink.text = item.title;
    searchLink.href = item.path;

    searchItem.append(searchLink);
    searchList.append(searchItem);
  });

  return resultsWrapper;
}

async function renderAllSearchResults(searchQuery) {
  const allSearchResults = document.createElement("div");
  allSearchResults.classList.add("all-search-results");

  if (!searchQuery) {
    return;
  }

  console.log(searchQuery);

  const users = await fetchData(
    `https://jsonplaceholder.typicode.com/users?q=${searchQuery}&_limit=10`
  );
  const posts = await fetchData(
    `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}&_limit=10&_expand=user`
  );
  const albums = await fetchData(
    `https://jsonplaceholder.typicode.com/albums?q=${searchQuery}&_limit=10&_expand=user`
  );
  const comments = await fetchData(
    `https://jsonplaceholder.typicode.com/comments?q=${searchQuery}&_limit=10`
  );
  const photos = await fetchData(
    `https://jsonplaceholder.typicode.com/photos?q=${searchQuery}&_limit=10`
  );

  const usersSearchData = users.map((user) => {
    const userData = {
      title: user.name,
      path: "./user.html?user_id=" + user.id,
    };

    return userData;
  });

  const postsSearchData = posts.map((post) => {
    return {
      title: `${toUpperCase(post.title)} (${post.user.name})`,
      path: "./post.html?post_id=" + post.id,
    };
  });

  const albumsSearchData = albums.map((album) => {
    return {
      title: `${toUpperCase(album.title)}, created by ${album.user.name}`,
      path: "./album.html?album_id=" + album.id,
    };
  });

  const searchUsers = searchResults(usersSearchData, "users");
  const searchPosts = searchResults(postsSearchData, "posts");
  const searchAlbums = searchResults(albumsSearchData, "albums");

  allSearchResults.append(searchUsers, searchPosts, searchAlbums);

  return allSearchResults;
}

init();
