import {newParticle} from "../newParticle.js";
import {fireLifetime, fireSpread, fireSpreadChance} from "../config.js";
export function moveFire(x, y, data) {
  data[y][x].lifetime++;
  for (let yB = -fireSpread; yB <= fireSpread; yB++) {
    for (let xB = -fireSpread; xB < fireSpread; xB++) {
      if (data[y + yB] && data[y + yB][x + xB]) {
        if (data[y + yB][x + xB].name == "wood" && Math.random() < fireSpreadChance) {
          data[y + yB][x + xB] = newParticle("fire");
        } else if (data[y + yB][x + xB].type == "fluid" && data[y + yB][x + xB].name != "lava") {
          data[y][x] = void 0;
          return data;
        }
      }
    }
  }
  if (data[y][x].lifetime > fireLifetime) {
    data[y][x] = void 0;
  }
  return data;
}
