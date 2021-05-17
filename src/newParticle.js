import {colors, functions, types} from "./config.js";
import {Vector2Zero} from "./Vector.js";
export function newParticle(name) {
  return {
    name,
    color: colors.get(name),
    move: functions.get(name),
    velocity: Vector2Zero,
    lifetime: 0,
    type: types.get(name)
  };
}
