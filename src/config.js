import {moveAcid} from "./functions/moveAcid.js";
import {moveFire} from "./functions/moveFire.js";
import {moveLava} from "./functions/moveLava.js";
import {moveSand} from "./functions/moveSand.js";
import {moveSteam} from "./functions/moveSteam.js";
import {moveWater} from "./functions/moveWater.js";
export const pixelSize = 2;
export const brushRadius = 8;
export const brushSpawnChance = 0.2;
export const gravityVelocity = 10;
export const spreadVelocity = 10;
export const gasVelocity = 5;
export const fireLifetime = 60 * 0.3;
export const fireSpread = 10;
export const fireSpreadChance = 1e-3;
export const acidDisolveChance = 0.04;
export const lavaSpreadVelocity = 4;
export const colors = new Map([
  ["sand", "#eabf7d"],
  ["water", "#2389da"],
  ["wood", "#8b5a2b"],
  ["fire", "#ff5a00"],
  ["steam", "#b1b1b1"],
  ["stone", "#888c8d"],
  ["acid", "#61de2a"],
  ["lava", "orange"]
]);
export const functions = new Map([
  ["sand", moveSand],
  ["water", moveWater],
  ["wood", void 0],
  ["fire", moveFire],
  ["steam", moveSteam],
  ["stone", void 0],
  ["acid", moveAcid],
  ["lava", moveLava]
]);
export const types = new Map([
  ["sand", "powdery"],
  ["water", "fluid"],
  ["wood", "solid"],
  ["fire", "passthrough"],
  ["steam", "gas"],
  ["stone", "solid"],
  ["acid", "fluid"],
  ["lava", "fluid"]
]);
