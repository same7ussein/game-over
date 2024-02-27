import { DisplayGames } from "./game-module-display.js";

$(document).ready(function () {
  $(".loadingScreen").fadeOut(500, function () {
    $("body").css("overflow", "auto");
  });
});

// ---------------------
const links = document.querySelectorAll(".nav-link");
// ********** class active *********
for (const cate of links) {
  cate.addEventListener("click", function () {
    for (const active of links) {
      active.classList.remove("active");
    }
    cate.classList.add("active");
  });
}

const cateName = new DisplayGames("mmorpg");
cateName.display();

for (const cate of links) {
  cate.addEventListener("click", function () {
    const val = cate.innerText;
    cateName.category = val;
    cateName.display();
  });
}
