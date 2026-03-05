const id = new URLSearchParams(window.location.search).get("id");
const endpoint = `https://kea-alt-del.dk/t7/api/products/${id}`;

const container = document.querySelector("main");

fetch(endpoint)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(product) {
  container.innerHTML = `
    <div>
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" class="product_pic" alt="${product.productdisplayname}" />
    </div>
    <div>
      <h2 id="productname">${product.productdisplayname}</h2>
      <div id="list">
        <p>Type: ${product.articletype}</p>
        <p>Kategori: ${product.category}</p>
        <p>Pris: ${product.price},-</p>
${product.soldout ? `<p class="soldout_text">SOLD OUT</p>` : ""}
${
  product.discount
    ? `<p id="discount_1">Discount: <span>${product.discount}%</span></p>`
    : ""
}
      </div>
      <button>Køb nu</button>
    </div>
  `;
}
