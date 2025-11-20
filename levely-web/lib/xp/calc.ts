export const XP_RULES = {
  CREATE_POST: 100,
  RECEIVE_LIKE: 1,
}

export function calculateLevel(xp: number) {
  return 1 + Math.floor(Math.sqrt(xp / 100))
}

export function xpAfterAction(currentXp: number, action: keyof typeof XP_RULES) {
  return currentXp + XP_RULES[action]
}
