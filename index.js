const endpoint = "https://kea-alt-del.dk/t7/api/categories";
const container = document.querySelector(".categories");

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData)
    .catch((err) => console.error("Fetch fejl:", err));
}

function showData(data) {
  console.log("Data fra API:", data);

  container.innerHTML = ""; // rydder containeren først

  data.forEach((kategori) => {
    container.innerHTML += `
      <a href="productlist.html?category=${kategori.category}">
        ${kategori.category}
      </a>
    `;
  });
}

getData();
