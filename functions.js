export function toUpperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export async function fetchData(url, params) {
  const res = await fetch(url, params);
  const data = await res.json();

  return data;
}

export function getParams(param) {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get(param);

  return id;
}
