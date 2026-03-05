const category = new URLSearchParams(window.location.search).get("category");
console.log("category:", category);
console.log("productlist.js is connected");

const container = document.querySelector(".grid");

const endpoint = `https://kea-alt-del.dk/t7/api/products?limit=12&category=${category}`;

let allData; // <-- gemmer produkter her

document.querySelectorAll("#sorter button").forEach((knap) => {
  knap.addEventListener("click", sorter);
});

//Sortere fra lav til høj//
function sorter(event) {
  const priceDir = event.target.dataset.price;
  const textDir = event.target.dataset.text;

  // Pris
  if (priceDir === "up") {
    allData.sort((a, b) => a.price - b.price);
  } else if (priceDir === "down") {
    allData.sort((a, b) => b.price - a.price);
  }

  // A-Z / Z-A
  if (textDir === "az") {
    allData.sort((a, b) =>
      a.productdisplayname.localeCompare(b.productdisplayname),
    );
  } else if (textDir === "za") {
    allData.sort((a, b) =>
      b.productdisplayname.localeCompare(a.productdisplayname),
    );
  }

  showData(allData); // <-- tegn igen
}

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = data; // <-- vigtigt!
      showData(allData); // <-- vis første gang
    });
}

//Viser elementerne, altså billeder, tekst, priser og discount//
function showData(data) {
  console.table(data);

  let markup = "";

  data.forEach((element) => {
    markup += `
      <a href="productdetails.html?id=${element.id}">
        <article class="productlist" ${element.soldout && "soldout"}>
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp"
            alt="${element.productdisplayname}"
          />
          <h3>${element.productdisplayname}</h3>
          <p class="product">${element.articletype || ""}</p>
          <p class="price">DKK <span>${element.price}</span>,-</p>
          ${element.soldout ? `<p class="soldout_text">SOLD OUT</p>` : ""}
          ${
            element.discount
              ? ` <p id="discount_1">Discount: <span>${element.discount}%</span></p>`
              : ""
          }
        </article>
      </a>
    `;
  });

  container.innerHTML = markup;
}

getData();
