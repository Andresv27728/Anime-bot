let R = Math.random;
let Fl = Math.floor;
let toM = (a) => "@" + a.split("@")[0];

function handler(m, {groupMetadata}) {
  let ps = groupMetadata.participants.map((v) => v.id);
  if (ps.length < 2) {
    return m.reply('Se necesitan al menos 2 participantes en el grupo para formar parejas.');
  }

  // Improved logic to select unique participants for pairs, if possible
  // This is a simple shuffle and pick, not guaranteeing all are unique if group is small,
  // but better than original which had high chance of duplicates in a,b vs c,d etc.
  let uniqueParticipants = [...new Set(ps)]; // Ensure all participants are unique to start
  if (uniqueParticipants.length < 2) {
    return m.reply('No hay suficientes participantes únicos para formar parejas significativamente.');
  }

  // Shuffle the unique participants array
  for (let i = uniqueParticipants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [uniqueParticipants[i], uniqueParticipants[j]] = [uniqueParticipants[j], uniqueParticipants[i]];
  }

  // Take up to 10 unique participants for 5 pairs.
  // If less than 10, some pairs might not be formed or logic below needs adjustment.
  // The original code picked 10 random people, allowing duplicates across pairs and even within a pair if a=b.
  // This version aims for more unique pairs from the available members.

  const selected = [];
  const usedIndexes = new Set();

  for (let k = 0; k < 10 && uniqueParticipants.length > selected.length; k++) {
      let randomIndex;
      do {
          randomIndex = Fl(R() * uniqueParticipants.length);
      } while (usedIndexes.has(randomIndex) && selected.length < uniqueParticipants.length); // Ensure we don't get stuck if not enough unique people
      if(selected.length >= uniqueParticipants.length && usedIndexes.has(randomIndex)) break; // Break if we can't find more unique people
      selected.push(uniqueParticipants[randomIndex]);
      usedIndexes.add(randomIndex);
  }

  // Ensure we have enough people for 5 pairs, otherwise adjust or message
  if (selected.length < 10 && selected.length % 2 !== 0) { // If odd number and less than 10, remove last to make even pairs
      if(selected.length > 1) selected.pop();
      else return m.reply('No hay suficientes participantes para formar ni una pareja única.'); // Not enough for even one pair
  } else if (selected.length < 2) {
      return m.reply('No hay suficientes participantes para formar parejas.');
  }


  let messageText = `*💞 Las 5 Mejores Parejas del Grupo 💞*\n\n`;
  let mentions = [];

  let pairCount = 0;
  for (let k = 0; k < selected.length - 1 && pairCount < 5; k += 2) {
    pairCount++;
    let user1 = selected[k];
    let user2 = selected[k+1];
    mentions.push(user1, user2);

    let pairText = "";
    switch(pairCount) {
      case 1:
        pairText = `*${pairCount}. ${toM(user1)} y ${toM(user2)}*\n- Esta pareja está destinada a estar junta. 💙\n\n`;
        break;
      case 2:
        pairText = `*${pairCount}. ${toM(user1)} y ${toM(user2)}*\n- Son dos tortolitos enamorados. ✨\n\n`;
        break;
      case 3:
        pairText = `*${pairCount}. ${toM(user1)} y ${toM(user2)}*\n- ¡Qué pareja! Ya deberían tener familia. 🤱🧑‍🍼\n\n`;
        break;
      case 4:
        pairText = `*${pairCount}. ${toM(user1)} y ${toM(user2)}*\n- ¡Estos ya se casaron en secreto! 💍\n\n`;
        break;
      case 5:
        pairText = `*${pairCount}. ${toM(user1)} y ${toM(user2)}*\n- ¡Esta pareja está de luna de miel! ❤️✨\n\n`;
        break;
    }
    messageText += pairText;
  }

  if (pairCount === 0) {
      return m.reply('No se pudieron formar parejas con los participantes actuales.');
  }

  m.reply(messageText.trim(), null, { mentions });
}
handler.help = ["formarparejas", "formarpareja"]; // Simplified and added alias
handler.tags = ["juegos", "fun"]; // Corrected "main" to "juegos" or "diversion"
handler.command = ["formarpareja5", "formarparejas", "formarpareja"];
handler.register = true;
handler.group = true;
export default handler;
