const open = document.querySelector(".open-eye");
const close = document.querySelector(".close-eye");

const passInput = document.querySelector("#password");

const submit = document.querySelector("#submit");

const form = document.querySelector("form");
const inputs = document.querySelectorAll("form input:not(:last-child)");

open.addEventListener("click", () => {
  open.style = "display: none";
  close.style = "display: block";

  passInput.type = "text";
});

close.addEventListener("click", () => {
  close.style = "display: none";
  open.style = "display: block";

  passInput.type = "password";
});

submit.addEventListener("click", (formEvt) => {
  inputs.forEach((input) => {
    if (input.value === "") {
      formEvt.preventDefault();
      input.style = "border: 2px solid #a8200d;";
      input.placeholder = "Please fill this field";
    }
  });
});
