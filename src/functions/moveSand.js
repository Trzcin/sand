import {gravityVelocity} from "../config.js";
import {Vector2Zero} from "../Vector.js";
export function moveSand(x, y, data) {
  if (y + 1 < data.length && (!data[y + 1][x] || data[y + 1][x].type == "fluid" || data[y + 1][x].type == "passthrough")) {
    data[y][x].velocity = {x: 0, y: gravityVelocity};
  } else if (y + 1 < data.length && x - 1 >= 0 && (!data[y + 1][x - 1] || data[y + 1][x - 1].type == "fluid" || data[y + 1][x - 1].type == "passthrough")) {
    data[y][x].velocity = {x: -gravityVelocity, y: gravityVelocity};
  } else if (y + 1 < data.length && x + 1 < data[0].length && (!data[y + 1][x + 1] || data[y + 1][x + 1].type == "fluid" || data[y + 1][x + 1].type == "passthrough")) {
    data[y][x].velocity = {x: gravityVelocity, y: gravityVelocity};
  } else {
    data[y][x].velocity = Vector2Zero;
  }
  let move = Vector2Zero;
  let fluidInTheWay = false;
  const iterations = Math.abs(data[y][x].velocity.x) > Math.abs(data[y][x].velocity.y) ? Math.abs(data[y][x].velocity.x) : Math.abs(data[y][x].velocity.y);
  for (let i = 0; i < iterations; i++) {
    const newMove = {...move};
    if (Math.abs(newMove.x) < Math.abs(data[y][x].velocity.x)) {
      newMove.x += Math.sign(data[y][x].velocity.x);
    }
    if (Math.abs(newMove.y) < Math.abs(data[y][x].velocity.y)) {
      newMove.y += Math.sign(data[y][x].velocity.y);
    }
    if (x + newMove.x < 0 || x + newMove.x >= data[0].length || y + newMove.y < 0 || y + newMove.y >= data.length || data[y + newMove.y][x + newMove.x] && data[y + newMove.y][x + newMove.x].type != "fluid" && data[y + newMove.y][x + newMove.x].type != "passthrough") {
      break;
    }
    if (data[y + newMove.y][x + newMove.x] && data[y + newMove.y][x + newMove.x].type == "fluid")
      fluidInTheWay = true;
    else
      fluidInTheWay = false;
    move = newMove;
  }
  if (move != Vector2Zero) {
    let temp = void 0;
    if (fluidInTheWay) {
      temp = {...data[y + move.y][x + move.x]};
    }
    data[y + move.y][x + move.x] = data[y][x];
    data[y][x] = temp;
  }
  return data;
}
