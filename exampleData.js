const worldStatus = {
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
}

const globalEvents = {
  gameGlobalEvents: {
    yigPoison: {
      //Jogadores ficam com apenas 2 de vida
      active: false,
      targetValue: 10,
      currentValue: 0,
      eventActivation: 'dateObject',
    },
  },
}

const vortexList = {
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

const multiverseMetrics = {
  totalPlayers: 0,
  currentEon: 0,
  totalPlayersCurrentEon: 0,
}

const multiverseMetrics = {
  totalPlayers: 0,
  currentEon: 0,
  totalPlayersCurrentEon: 0,

  eons: [
    {
      eonId: 0,
      eonStartDate: '',
      eonEndDate: '',
      totalPlayers: 0,
      heroName: 'The First One',
      heroMessage:
        'Yig awakens, yet again, in another Universe, in another Eon. You must fulfill your destiny and try to save the Multiverse..., as you did before, as you will again, in the infinitive of the existence.',
    },
  ],
}
