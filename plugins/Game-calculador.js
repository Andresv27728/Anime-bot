const handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `🚩 Menciona a un usuario o escribe un nombre.`, m, global.rcanal); // Assuming rcanal is global

  const targetUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;
  const targetName = targetUser ? conn.getName(targetUser) : text;

  // Ensure text for display is the name, not the full mention if a user was tagged.
  const displayName = targetUser ? targetName : text;

  const percentages = Math.floor(Math.random() * 101); // 0-100%
  let emoji = '';
  let description = '';
  let commandToDisplay = command; // Use the actual command for display

  switch (command) {
    case 'gay':
      emoji = '🏳️‍🌈';
      description = `💙 Según mis cálculos, ${displayName.toUpperCase()} es ${percentages}% Gay ${emoji}.\n`;
      if (percentages < 30) description += "> Apenas un toque de arcoíris.";
      else if (percentages < 70) description += "> ¡Celebrando la diversidad!";
      else description += "> ¡Orgullosamente radiante!";
      break;
    case 'lesbiana':
      emoji = '🏳️‍🌈';
      commandToDisplay = 'Lesbiana'; // Ensure consistent capitalization for display
      description = `💜 Según mis cálculos, ${displayName.toUpperCase()} es ${percentages}% ${commandToDisplay} ${emoji}.\n`;
      if (percentages < 30) description += "> Un susurro de Safo.";
      else if (percentages < 70) description += "> ¡Viviendo el amor libremente!";
      else description += "> ¡Diosa del Olimpo!";
      break;
    case 'manco':
    case 'manca':
      emoji = '🎮';
      commandToDisplay = command === 'manco' ? 'Manco' : 'Manca';
      description = `👾 Según mis cálculos, ${displayName.toUpperCase()} es ${percentages}% ${commandToDisplay} ${emoji}.\n`;
      if (percentages < 30) description += "> ¡Todos tenemos días malos!";
      else if (percentages < 70) description += "> La práctica hace al maestro.";
      else description += "> Quizás los controles estaban fallando...";
      break;
    default:
      // This case should ideally not be reached if commands are filtered by handler.command
      return m.reply(`☁️ Comando '${command}' no reconocido para cálculo. Usa ${usedPrefix}help para ver comandos.`);
  }

  const responses = [
    "El universo ha hablado.",
    "Los cálculos cósmicos no mienten.",
    "¡Ahí lo tienes!",
    "Científicamente comprobado (casi).",
    "¡Qué revelación!"
  ];
  const response = responses[Math.floor(Math.random() * responses.length)];

  const cal = `CALCULADORA DE PERSONALIDAD 💫\n\n${description}\n\n➤ ${response}`.trim();

  async function loading() {
    var hawemod = [
      "Calculando... 10%",
      "Calculando... 30%",
      "Calculando... 50%",
      "Calculando... 80%",
      "Calculando... 100%"
    ];
    // Assuming fkontak is a global variable for quoted message context
    let { key } = await conn.sendMessage(m.chat, {text: `Calculando porcentaje... 🤍`, mentions: conn.parseMention(cal)}, {quoted: global.fkontak});
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 750)); // Slightly faster animation
      await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(cal)}, {quoted: global.fkontak});
    }
    await conn.sendMessage(m.chat, {text: cal, edit: key, mentions: conn.parseMention(cal)}, {quoted: global.fkontak});
  }
  loading();
};

// Updated help and command list after removing offensive/sensitive terms
handler.help = [
  'gay <@tag/nombre>',
  'lesbiana <@tag/nombre>',
  'manco <@tag/nombre>',
  'manca <@tag/nombre>'
];
handler.tags = ['fun'];
handler.register = true;
handler.group = true; // Can be used in groups
handler.command = ['gay', 'lesbiana', 'manco', 'manca'];

export default handler;
