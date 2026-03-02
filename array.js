const musik = [
  "Det ku jeg ik se (feat. Sira Jovina) - milo",
  "Gemmer på noget (feat. KOPS) - URO",
  "Minder hoa andre - Mille",
  "Vi ved - Josef, Sira Jovina",
  "Hader ikke mig selv sammen med dig - Mille",
  "Før jeg falder - Sira Jovina",
  "Tabt noget - Bette, GUZO",
  "MOONLIGHT - DIMA",
  "Lod væggen brænde - Will",
  "Blind - Bette, MAS",
];

const liste = document.querySelector("ul");

musik.forEach(lavMusikListe);

function lavMusikListe(musik) {
  liste.innerHTML += "<li>" + musik + "</li>";
}
