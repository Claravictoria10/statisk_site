const category = new URLSearchParams(window.location.search).get("category");

console.log(category);
("productlist.js is connected");

const container = document.querySelector(".grid");

const endpoint =
  "https://kea-alt-del.dk/t7/api/products?limit=12&category=${category}";

function getData() {
  fetch(endpoint).then((respons) => respons.json().then(showData));
}

function showData(data) {
  console.table(data);
  let markup = "";
  data.array.forEach((element) => {
    console.log(element);
    markup += `<article class="productlist">
            <img
              src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
              alt="product image"
            />
            <h3>${element.productdislayname}</h3>
            <p class="product">T-shirt</p>
            <p class="price">DKK <span>899</span>,-</p>
            <div class="discounted">
              <p>Now DKK <span>699</span>.-</p>
              <p><span>%</span></p>
            </div>
          </article>`;
  });
}
