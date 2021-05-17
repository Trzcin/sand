import {brushRadius, brushSpawnChance, types} from "./config.js";
import {newParticle} from "./newParticle.js";
export function paintParticles(x, y, particle, data) {
  for (let yB = -brushRadius; yB <= brushRadius; yB++) {
    for (let xB = -brushRadius; xB <= brushRadius; xB++) {
      if (y + yB >= 0 && y + yB < data.length && x + xB >= 0 && x + xB < data[0].length && Math.sqrt(Math.pow(xB, 2) + Math.pow(yB, 2)) < brushRadius) {
        if (types.get(particle) == "solid" || Math.random() < brushSpawnChance) {
          data[y + yB][x + xB] = newParticle(particle);
        }
      }
    }
  }
  return data;
}
