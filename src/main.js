import {colors, pixelSize} from "./config.js";
import {paintParticles} from "./paintParticles.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sizeX = Math.round(window.innerWidth / pixelSize);
const sizeY = Math.round(window.innerHeight / pixelSize);
let data = [];
let currentParticle = "sand";
function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  for (let y = 0; y < sizeY; y++) {
    data.push([]);
    for (let x = 0; x < sizeX; x++) {
      data[y].push(void 0);
    }
  }
  const particleContainer = document.getElementById("particle-container");
  for (let [key, val] of colors) {
    const button = document.createElement("button");
    button.classList.add("particle-icon");
    button.style.backgroundColor = val;
    button.addEventListener("click", () => {
      currentParticle = key;
    });
    particleContainer.appendChild(button);
  }
  window.requestAnimationFrame(step);
}
function step() {
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let y = sizeY - 1; y >= 0; y--) {
    if (Math.random() < 0.5) {
      for (let x = 0; x < sizeX; x++) {
        if (data[y][x] && data[y][x].move) {
          data = data[y][x].move(x, y, data);
        }
      }
    } else {
      for (let x = sizeX - 1; x >= 0; x--) {
        if (data[y][x] && data[y][x].move) {
          data = data[y][x].move(x, y, data);
        }
      }
    }
  }
  for (let y = sizeY - 1; y >= 0; y--) {
    for (let x = 0; x < sizeX; x++) {
      if (data[y][x]) {
        ctx.fillStyle = data[y][x].color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }
  window.requestAnimationFrame(step);
}
let mousePressedDown = false;
canvas.addEventListener("mousedown", () => {
  mousePressedDown = true;
});
canvas.addEventListener("mousemove", (e) => {
  if (!mousePressedDown)
    return;
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left) / pixelSize);
  const y = Math.round((e.clientY - rect.top) / pixelSize);
  data = paintParticles(x, y, currentParticle, data);
});
canvas.addEventListener("mouseup", () => {
  mousePressedDown = false;
});
canvas.addEventListener("touchstart", () => {
  mousePressedDown = true;
});
canvas.addEventListener("touchend", () => {
  mousePressedDown = false;
});
canvas.addEventListener("touchmove", (e) => {
  if (!mousePressedDown)
    return;
  const touch = e.touches[0];
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((touch.pageX - rect.left) / pixelSize);
  const y = Math.round((touch.pageY - rect.top) / pixelSize);
  data = paintParticles(x, y, currentParticle, data);
});
init();
