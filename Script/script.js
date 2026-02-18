const btn = document.querySelectorAll(".btn");
const input = document.querySelectorAll(".inp");
const cart = document.getElementsByClassName("add-item-cart");
const alertMessage = document.getElementsByClassName("alert-message");
const display = document.querySelector(".display-list");
const alertRow = document.querySelector(".alert-row");
const totalAmountEl = document.querySelector(".final-price");

let count = 0;
let totalAmount = 0;

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", () => {

    const serviceDiv = btn[i].previousElementSibling;
    const serviceName = serviceDiv.querySelector(".service-name").textContent;
    const priceText = serviceDiv.querySelector(".price").textContent;
    const price = parseInt(priceText.replace("₹", ""));

    btn[i].classList.toggle("remove");

    if (btn[i].classList.contains("remove")) {
      // ADD ITEM
      btn[i].innerHTML =
        `Remove Item <ion-icon name="remove-circle-outline"></ion-icon>`;

      count++;

      const row = document.createElement("tr");
      row.setAttribute("data-index", i);

      row.innerHTML = `
        <td class="table-d">${display.children.length + 1}</td>
        <td class="table-d">${serviceName}</td>
        <td class="table-d">₹${price}</td>
      `;

      display.appendChild(row);
      totalAmount += price;

    } else {
      // REMOVE ITEM
      btn[i].innerHTML =
        `Add Item <ion-icon name="add-circle-outline" class="plus"></ion-icon>`;

      count--;

      const rowToRemove = display.querySelector(`tr[data-index="${i}"]`);
      if (rowToRemove) {
        rowToRemove.remove();
        totalAmount -= price;
      }
    }

  
    totalAmountEl.textContent = `₹${totalAmount}`;

    alertRow.style.display =
      display.children.length === 0 ? "table-row" : "none";


    [...display.children].forEach((row, idx) => {
      row.children[0].textContent = idx + 1;
    });

 
    if (count > 0) {
      cart[0].classList.remove("visible");
      alertMessage[0].style.display = "none";
    } else {
      cart[0].classList.add("visible");
      alertMessage[0].style.display = "block";
    }
  });
}

input.forEach(inp => {
  inp.addEventListener("focus", () => {
    if (count === 0) {
      cart[0].classList.add("visible");
    }
  });
});
const bookNowBtn = document.getElementById("bookNow");
const emailStatus = document.getElementById("emailStatus");
const cartAlert = document.getElementById("cartAlert"); // add-items warning

bookNowBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (display.children.length === 0) {
    cartAlert.style.display = "block";
    cart[0].classList.add("visible");
    
    return;
  }

  cartAlert.style.display = "none";

  let orderDetails = "";

  [...display.children].forEach((row) => {
    const service = row.children[1].textContent;
    const price = row.children[2].textContent;
    orderDetails += `${service} - ${price}\n`;
  });

  const userEmail = document.querySelector('input[placeholder="Enter Email"]').value;

  const templateParams = {
    name: document.querySelector('input[placeholder="Enter Name"]').value,
    email: userEmail,
    phone: document.querySelector('input[type="tel"]').value,
    order: orderDetails,
    total: `₹${totalAmount}`,
    to_email: userEmail,
    reply_to: userEmail

  };

  emailjs
    .send("service_lrpo3gm", "template_mmloi9s", templateParams)
    .then(() => {
      cart[0].classList.add("visible");
      emailStatus.innerHTML =
        `<ion-icon name="checkmark-circle-outline"></ion-icon>
         Email sent successfully`;

      emailStatus.style.color = "green";
       display.innerHTML = "";
      totalAmount = 0;
      totalAmountEl.textContent = "₹0";

    
      btn.forEach(b => {
        b.classList.remove("remove");
        b.innerHTML =
          `Add Item <ion-icon name="add-circle-outline" class="plus"></ion-icon>`;
      });

    
      alertRow.style.display = "table-row";
    
      setTimeout(() => {
        emailStatus.innerHTML = "";
      }, 3000);
      document.querySelectorAll(".inp").forEach(inp => {
  inp.value = "";
      });
    })
    .catch((err) => {
      console.error(err);

      emailStatus.innerHTML =
        `<ion-icon name="alert-circle-outline"></ion-icon>
         Failed to send email`;

      emailStatus.style.color = "red";

      setTimeout(() => {
        emailStatus.innerHTML = "";
      }, 3000);
    });
});

