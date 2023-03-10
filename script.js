const TYPES = [
  {
    displayName: "Foam Type",
    name: "foam",
    folder: "foam",
    regex: /[a-z]/
  },
  {
    displayName: "Gips Type",
    name: "gips",
    folder: "gips",
    regex: /[a-z]/
  },
  {
    displayName: "Bread Type",
    name: "bread",
    folder: "bread",
    regex: /[a-zA-Z]/
  },
  {
    displayName: "Wiedikon Type",
    name: "wiedikon",
    folder: "wiedikon",
    regex: /[a-z]/
  },
  {
    displayName: "Glow Type",
    name: "glow",
    folder: "glow",
    regex: /[a-zA-Z]/
  },
  {
    displayName: "Pipe cleaner Type",
    name: "pipe_cleaner",
    folder: "pipe_cleaner",
    regex: /[a-z]/
  },
  {
    displayName: "Cress Type",
    name: "cress",
    folder: "cress",
    regex: /[a-zA-Z]/
  },
];
const BACKGROUND_COLORS = [
  {
    colorCode: "#FFFFFF",
    fontColor: "#000000"
  },
  {
    colorCode: "#000000",
    fontColor: "#FFFFFF"
  },
  {
    colorCode: "rgb(0, 255, 255)",
    fontColor: "#000000"
  },
  {
    colorCode: "rgb(255, 0, 255)",
    fontColor: "#000000"
  },
  {
    colorCode: "rgb(255, 255, 0)",
    fontColor: "#000000"
  },
];

let textContainer = document.getElementById("text-container");
let selectedType = {};
let text = [];

selectedType = TYPES.find(t => t.name === window.location.hash.substring(1)) || TYPES[0];
fillMenu();
fillColorMenu();
preloadImages();

function fillMenu() {
  const menu = document.getElementById("menu");
  TYPES.forEach(type => {
    const typeLink = menu.appendChild(document.createElement("a"));
    typeLink.innerHTML = type.displayName;
    typeLink.href = `#${type.name}`;
    if (type.name === selectedType.name) {
      typeLink.classList.add("selected");
    }
  });
}

function fillColorMenu() {
  let colorMenu = document.getElementById("color-menu");
  BACKGROUND_COLORS.forEach(bc => {
    colorBtn = colorMenu.appendChild(document.createElement("button"));
    colorBtn.style.backgroundColor = bc.colorCode;
    colorBtn.addEventListener("click", function () {
      document.querySelector('body').style.backgroundColor = bc.colorCode;
      document.querySelector('body').style.color = bc.fontColor;
      document.querySelectorAll('button').forEach(btn => btn.style.borderColor = bc.fontColor);
    });
  });
}

function preloadImages() {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  TYPES.forEach(type => {
    letters.forEach(letter => {
      if (letter.match(type.regex)) {
        const filename = `letters/${type.folder}/${letter}.png`;
        let img = new Image();
        img.src = filename;
      }
    });
  });
}

window.addEventListener("hashchange", function () {
  selectedType = TYPES.find(t => t.name === window.location.hash.substring(1));
  text = [];
  document.querySelectorAll(".selected").forEach(el => el.classList.remove("selected"));
  document.querySelector(`a[href='${window.location.hash}']`).classList.add("selected");
});

document.addEventListener("keydown", function (event) {
  if ((event.key.length === 1 && event.key.match(selectedType.regex)) || event.key === " " || event.key === "Enter") {
    text.push(event.key);
    draw();
  }
  if (event.key === "Backspace") {
    text.pop();
    draw();
  }
});

function draw() {
  textContainer.innerHTML = "";
  const lines = text.join("").split("Enter");
  lines.forEach(line => {
    let lineContainer = textContainer.appendChild(document.createElement("div"));
    lineContainer.classList.add("line");
    const words = line.split(" ");

    words.forEach(word => {
      let wordContainer = lineContainer.appendChild(document.createElement("div"));
      wordContainer.classList.add("word");
      const letters = word.split("");

      letters.forEach(letter => {
        const filename = `letters/${selectedType.folder}/${letter}.png`;
        let imageEl = wordContainer.appendChild(document.createElement("img"));
        imageEl.src = filename;
      });
    })
  });
}