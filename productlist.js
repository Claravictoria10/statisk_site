const category = new URLSearchParams(window.location.search).get("category");
console.log("category:", category);
console.log("productlist.js is connected");

const container = document.querySelector(".grid");

const endpoint = `https://kea-alt-del.dk/t7/api/products?limit=12&category=${category}`;

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then(showData)
    .catch((err) => console.error("Fetch fejl:", err));
}

function showData(data) {
  console.table(data);

  let markup = "";

  data.forEach((element) => {
    markup += `
      <a href="productdetails.html?id=${element.id}">
        <article class="productlist">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="${element.productdisplayname}"
          />
          <h3>${element.productdisplayname}</h3>
          <p class="product">${element.articletype || ""}</p>
          <p class="price">DKK <span>${element.price}</span>,-</p>

          ${
            element.discount
              ? `<div class="discounted">
                   <p>Discount: <span>${element.discount}%</span></p>
                 </div>`
              : ""
          }
        </article>
      </a>
    `;
  });

  container.innerHTML = markup;
}

getData();
