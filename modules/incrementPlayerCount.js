import { differenceInDays } from 'date-fns'

export function incrementPlayerCount(worldStatus) {
  let currentPlayers = worldStatus.currentPlayers + 1

  if (currentPlayers >= worldStatus.targetPlayers) {
    currentPlayers = 0
    let targetPlayers = worldStatus.targetPlayers

    const currentBlock = worldStatus.currentBlock + 1
    const lastBlockActivation = worldStatus.blockActivation

    const currentDate = new Date()
    const blockActivation = currentDate

    const daysInterval = Math.max(
      differenceInDays(currentDate, lastBlockActivation),
      1
    )

    const difficultyBalance = targetPlayers / daysInterval
    targetPlayers = Math.floor(targetPlayers / daysInterval) * 10

    return {
      targetPlayers,
      currentPlayers,
      currentBlock,
      blockActivation,
      difficultyBalance,
    }
  } else {
    return {
      currentPlayers,
    }
  }
}
