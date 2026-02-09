let btn = document.querySelectorAll(".btn");
const input = document.querySelectorAll(".inp");
const cart = document.getElementsByClassName("add-item-cart");
const alertMessage = document.getElementsByClassName("alert-message");
const display = document.querySelectorAll(".display-list");
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", () => {
    btn[i].classList.toggle("remove");
    if (btn[i].classList.contains("remove")) {
      btn[i].innerHTML =
        `Remove Item<ion-icon name="remove-circle-outline"></ion-icon>`;
      cart[0].classList.remove("visible");
      alertMessage[0].innerHTML = "";
    } else {
      btn[i].innerHTML =
        `Add Item<ion-icon name="add-circle-outline" class="plus"></ion-icon>`;
      cart[0].classList.add("visible");
    }
  });
}
input.forEach((inp) => {
  inp.addEventListener("click", () => {
    cart[0].classList.add("visible");
  });
});
