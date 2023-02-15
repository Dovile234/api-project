export function createPageMainHeader() {
  const header = document.createElement("header");
  header.classList.add("header");
  const nav = document.createElement("nav");
  nav.classList.add("nav");
  const list = document.createElement("ul");
  list.classList.add("nav-list");

  document.body.prepend(header);
  nav.append(list);
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
}
