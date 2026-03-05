const category = new URLSearchParams(window.location.search).get("category");
console.log("category:", category);
console.log("productlist.js is connected");

const container = document.querySelector(".grid");

const endpoint = `https://kea-alt-del.dk/t7/api/products?limit=12&category=${category}`;

let allData; // <-- gemmer produkter her
let udsnit;

//Klader på sorter inde i html
document.querySelectorAll("#sorter button").forEach((knap) => {
  knap.addEventListener("click", sorter);
});
//Klader på filter inde i html
document.querySelectorAll("#filter button").forEach((btn) => {
  btn.addEventListener("click", filter);
});

function getData() {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      allData = udsnit = data; // <-- vigtigt!
      showData(allData); // <-- vis første gang
    });
}

//Sortere fra lav til høj og A - Z//
function sorter(event) {
  const priceDir = event.target.dataset.price;
  const textDir = event.target.dataset.text;

  // Pris
  if (priceDir === "up") {
    udsnit.sort((a, b) => a.price - b.price);
  } else if (priceDir === "down") {
    udsnit.sort((a, b) => b.price - a.price);
  }

  // A-Z / Z-A
  if (textDir === "az") {
    udsnit.sort((a, b) =>
      a.productdisplayname.localeCompare(b.productdisplayname),
    );
  } else if (textDir === "za") {
    udsnit.sort((a, b) =>
      b.productdisplayname.localeCompare(a.productdisplayname),
    );
  }

  showData(udsnit); // <-- tegn igen
}

//Sortere efter køn//
function filter(event) {
  const valgt = event.target.textContent;

  if (valgt === "All") {
    showData(allData);
  } else {
    udsnit = allData.filter((element) => element.gender === valgt);
    showData(udsnit);
  }
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
