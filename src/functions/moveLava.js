import {Vector2Zero} from "../Vector.js";
import {
  fireSpread,
  fireSpreadChance,
  gravityVelocity,
  lavaSpreadVelocity
} from "../config.js";
import {newParticle} from "../newParticle.js";
export function moveLava(x, y, data) {
  for (let yB = -fireSpread; yB <= fireSpread; yB++) {
    for (let xB = -fireSpread; xB < fireSpread; xB++) {
      if (data[y + yB] && data[y + yB][x + xB] && data[y + yB][x + xB].name == "wood" && Math.random() < fireSpreadChance) {
        data[y + yB][x + xB] = newParticle("fire");
      }
    }
  }
  if (y + 1 < data.length && (!data[y + 1][x] || data[y + 1][x].type == "passthrough")) {
    data[y][x].velocity = {x: 0, y: gravityVelocity};
  } else if (y + 1 < data.length && x - 1 >= 0 && (!data[y + 1][x - 1] || data[y + 1][x - 1].type == "passthrough")) {
    data[y][x].velocity = {x: -lavaSpreadVelocity, y: gravityVelocity};
  } else if (y + 1 < data.length && x + 1 < data[0].length && (!data[y + 1][x + 1] || data[y + 1][x + 1].type == "passthrough")) {
    data[y][x].velocity = {x: lavaSpreadVelocity, y: gravityVelocity};
  } else if (x - 1 >= 0 && (!data[y][x - 1] || data[y][x - 1].type == "passthrough")) {
    data[y][x].velocity = {x: -lavaSpreadVelocity, y: 0};
  } else if (x + 1 < data[0].length && (!data[y][x + 1] || data[y][x + 1].type == "passthrough")) {
    data[y][x].velocity = {x: lavaSpreadVelocity, y: 0};
  } else {
    data[y][x].velocity = Vector2Zero;
  }
  let move = Vector2Zero;
  const iterations = Math.abs(data[y][x].velocity.x) > Math.abs(data[y][x].velocity.y) ? Math.abs(data[y][x].velocity.x) : Math.abs(data[y][x].velocity.y);
  for (let i = 0; i < iterations; i++) {
    const newMove = {...move};
    if (Math.abs(newMove.x) < Math.abs(data[y][x].velocity.x)) {
      newMove.x += Math.sign(data[y][x].velocity.x);
    }
    if (Math.abs(newMove.y) < Math.abs(data[y][x].velocity.y)) {
      newMove.y += Math.sign(data[y][x].velocity.y);
    }
    if (x + newMove.x < 0 || x + newMove.x >= data[0].length || y + newMove.y < 0 || y + newMove.y >= data.length || data[y + newMove.y][x + newMove.x] && data[y + newMove.y][x + newMove.x].type != "passthrough") {
      break;
    }
    move = newMove;
  }
  if (move != Vector2Zero) {
    data[y + move.y][x + move.x] = data[y][x];
    data[y][x] = void 0;
  }
  return data;
}
