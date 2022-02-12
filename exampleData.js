const data = {
  targetPlayers: 10, // Numero de jogadores necessários para ativar o próximo bloco
  currentPlayers: 0, // Quantos jogadores já jogaram neste bloco
  currentBlock: 0, // Indice do Bloco atual
  blockActivation: 'dateObject', // Data de inicio deste bloco
  difficultyBalance: 1.0, // Multiplicador das váraiveis

  gameMutations: {
    enemiesDamageBonus: 0.0,
    playersDamageMult: 1.0,
    playersMaxLife: 3.0,
  },
  gameGlobalEvents: {
    yigPoison: {
      //Jogadores ficam com apenas 2 de vida
      active: false,
      targetValue: 10,
      currentValue: 0,
      eventActivation: 'dateObject',
    },
  },
  vortexSpawn: [
    {
      id: 0,
      type: 'ammo',
      active: false,
      targetValue: 300,
      currentValue: 0,
    },
    {
      id: 1,
      type: 'health',
      active: false,
      targetValue: 10,
      currentValue: 0,
    },
  ],
}
