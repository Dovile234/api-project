function header() {
  const header = document.createElement("header");
  header.classList.add("header");
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const list = document.createElement("ul");
  list.classList.add("nav-list");
  const form = document.createElement("form");

  document.body.prepend(header);
  nav.append(list, form);
  header.append(nav);

  const arr = [
    {
      title: "Home",
      path: "./index.html",
    },
    {
      title: "Users",
      path: "./users.html",
    },
    {
      title: "Posts",
      path: "./posts.html",
    },
    {
      title: "Albums",
      path: "./albums.html",
    },
  ];

  arr.map((item) => {
    const liElement = document.createElement("li");

    const link = document.createElement("a");
    link.href = item.path;
    link.textContent = item.title;

    liElement.append(link);

    list.append(liElement);
  });

  form.action = "./search.html";
  form.innerHTML = `
  <input type="text" name="search" id="search-form">
  <input type="submit" value="Search">`;
}

export default header;
