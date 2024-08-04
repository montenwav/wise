{
  const dropdownResponse = document.querySelector(".dropdown-response");
  const open = document.querySelector(".response-open");
  const close = document.querySelector(".response-close");

  const dropdownArrow = document.querySelector(".response-rightside");
  const featuresContent = document.querySelector(".features-dropdown-content");
  const featuresTrigger = document.querySelector(".response-content-right");

  open.addEventListener("click", () => {
    dropdownResponse.style.left = "calc(0% + 50px)";
    open.style = "right: -200px";
    close.style = "right: 25px";
    document.body.style = "overflow-y: hidden";
  });

  close.addEventListener("click", () => {
    document.body.style = "overflow-y: none";
    dropdownResponse.style.left = "calc(-100% - 50px)";
    open.style = "right: 25px";
    close.style = "right: -200px";
  });

  featuresTrigger.addEventListener("click", () => {
    if (featuresContent.classList.contains("featuresClass")) {
      featuresContent.style.display = "none";
      dropdownArrow.style = "rotate: 0deg";
      featuresContent.classList.remove("featuresClass");
    } else {
      featuresContent.classList.add("featuresClass");
      featuresContent.style.display = "block";
      dropdownArrow.style = "rotate: 180deg";
    }
  });
}

{
  const firstSelector = document.querySelector(".first-selector");
  const secondSelector = document.querySelector(".second-selector");

  const iElementFst = document.querySelectorAll(".currencies.first i");
  const iElementSec = document.querySelectorAll(".currencies.second i");

  const firstDropd = document.querySelector(".first");
  const secDropd = document.querySelector(".second");

  const sendInput = document.querySelector(".sendInput");
  const sendImg = document.querySelector(".sendImg");
  const sendCurr = document.querySelector(".sendCurr");

  const takeInput = document.querySelector(".takeInput");
  const takeImg = document.querySelector(".takeImg");
  const takeCurr = document.querySelector(".takeCurr");

  const currenciesFst = document.querySelectorAll(".currencies.first div");
  const currenciesSec = document.querySelectorAll(".currencies.second div");

  const currencySubmit = document.querySelector(".currency-submit");

  firstSelector.addEventListener("click", (event) => {
    event.stopPropagation();
    if (firstDropd.classList.contains("open")) {
      firstDropd.style.display = "none";
      firstDropd.classList.remove("open");
    } else {
      firstDropd.classList.add("open");
      firstDropd.style.display = "block";

      secDropd.classList.remove("open");
      secDropd.style.display = "none";
    }
  });

  secondSelector.addEventListener("click", (event) => {
    event.stopPropagation();
    if (secDropd.classList.contains("open")) {
      secDropd.style.display = "none";
      secDropd.classList.remove("open");
    } else {
      secDropd.classList.add("open");
      secDropd.style.display = "block";

      firstDropd.classList.remove("open");
      firstDropd.style.display = "none";
    }
  });

  document.addEventListener("click", () => {
    firstDropd.classList.remove("open");
    firstDropd.style.display = "none";
    secDropd.classList.remove("open");
    secDropd.style.display = "none";
  });

  let currFst = "EUR";
  let currSec = "USD";

  for (elem of currenciesFst) {
    elem.addEventListener("click", function (e) {
      firstDropd.style.display = "none";
      secDropd.style.display = "none";

      currFst = e.currentTarget.classList.value.toUpperCase();
      sendCurr.textContent = currFst;

      sendImg.src = `../img/converter/${e.currentTarget.classList.value}.svg`;

      iElementFst.forEach((element) => {
        if (element.classList.contains(e.currentTarget.classList.value)) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
        и;
      });
    });
  }

  for (elem of currenciesSec) {
    elem.addEventListener("click", function (e) {
      firstDropd.style.display = "none";
      secDropd.style.display = "none";

      currSec = e.currentTarget.classList.value.toUpperCase();
      takeCurr.textContent = currSec;

      takeImg.src = `../img/converter/${e.currentTarget.classList.value}.svg`;

      iElementSec.forEach((element) => {
        if (element.classList.contains(e.currentTarget.classList.value)) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    });
  }

  sendInput.addEventListener("click", () => {
    sendInput.classList.add("selectedInput");

    currencySubmit.addEventListener("click", function () {
      if (sendInput.classList.contains("selectedInput")) {
        converter(
          `https://api.api-ninjas.com/v1/convertcurrency?want=${currSec}&have=${currFst}&amount=${Number(
            sendInput.value
          )}`
        );
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && sendInput.classList.contains("selectedInput")) {
        converter(
          `https://api.api-ninjas.com/v1/convertcurrency?want=${currSec}&have=${currFst}&amount=${Number(
            sendInput.value
          )}`
        );
      }
    });
  });

  takeInput.addEventListener("click", () => {
    takeInput.classList.add("selectedInput");

    currencySubmit.addEventListener("click", function () {
      if (takeInput.classList.contains("selectedInput")) {
        converter(
          `https://api.api-ninjas.com/v1/convertcurrency?want=${currFst}&have=${currSec}&amount=${Number(
            takeInput.value
          )}`
        );
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && takeInput.classList.contains("selectedInput")) {
        converter(
          `https://api.api-ninjas.com/v1/convertcurrency?want=${currFst}&have=${currSec}&amount=${Number(
            takeInput.value
          )}`
        );
      }
    });
  });

  async function converter(usedURL) {
    sendInput.classList.remove("selectedInput");
    takeInput.classList.remove("selectedInput");
    try {
      const response = await fetch(usedURL, {
        headers: { "X-Api-Key": "CSywDEh0w8NMKWyRzB1eeQ==9gye7yjxsBViR744" },
        contentType: "application/json",
      });
      const json = await response.json();

      if (
        usedURL ===
        `https://api.api-ninjas.com/v1/convertcurrency?want=${currSec}&have=${currFst}&amount=${Number(
          sendInput.value
        )}`
      ) {
        takeInput.value = json.new_amount;
      } else if (
        usedURL ===
        `https://api.api-ninjas.com/v1/convertcurrency?want=${currFst}&have=${currSec}&amount=${Number(
          takeInput.value
        )}`
      ) {
        sendInput.value = json.new_amount;
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  }

  async function onloadConverter() {
    takeInput.onfocus = () => {
      let currFst = "USD";
      let currSec = "EUR";
    };
    const apiURL = `https://api.api-ninjas.com/v1/convertcurrency?want=${currSec}&have=${currFst}&amount=${Number(
      sendInput.value
    )}`;

    const response = await fetch(apiURL, {
      headers: { "X-Api-Key": "CSywDEh0w8NMKWyRzB1eeQ==9gye7yjxsBViR744" },
      contentType: "application/json",
    });
    const json = await response.json();

    takeInput.value = json.new_amount;
  }
  onloadConverter();
}

{
  const left = document.querySelector(".arr-left");
  const right = document.querySelector(".arr-right");
  const containers = document.querySelectorAll(".container > div");
  let cardWidth = containers[0].scrollWidth + 20;
  let counter = 0;

  left.addEventListener("click", () => {
    if (counter > 0) {
      counter--;
      slideImg();
    }
  });
  right.addEventListener("click", () => {
    if (counter < containers.length - 1) {
      counter++;
      slideImg();
    }
  });

  function slideImg() {
    left.classList.toggle("not-allowed", counter === 0);
    right.classList.toggle("not-allowed", counter === containers.length - 1);

    if (counter === 0) {
      containers.forEach((card) => (card.style = "opactiy: 1"));
    }
    containers[counter].style = "opacity: 1";
    containers[counter - 1].style = "opacity: 0";

    containers.forEach((card, index) => {
      card.style.transform = `translateX(-${counter * cardWidth}px)`;
    });
  }
}
