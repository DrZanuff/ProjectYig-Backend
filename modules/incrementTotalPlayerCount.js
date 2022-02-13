export function incrementTotalPlayerCount(multiverseMetric) {
  const newMultiverseMetric = {
    totalPlayers: multiverseMetric.totalPlayers + 1,
    totalPlayersCurrentEon: multiverseMetric.totalPlayersCurrentEon + 1,
  }

  return newMultiverseMetric
}
