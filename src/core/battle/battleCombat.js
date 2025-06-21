export function attack(attacker, defender) {
  const damage = 1;
  defender.hp = Math.max(0, defender.hp - damage);
  return damage;
}
