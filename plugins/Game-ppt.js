// Piedra, Papel o Tijera
const handler = async (m, {conn, text, command, usedPrefix, args}) => {
  const emoji = '⚔️'; // Default emoji for game
  const rcanal = global.rcanal; // Assuming global

  // Cooldown logic
  const waitTime = 10000; // 10 segundos
  let users = global.db.data.users[m.sender];
  if (!users.ppt) users.ppt = {}; // Initialize if not present
  if (users.ppt.lastGame && (new Date - users.ppt.lastGame < waitTime)) {
    return conn.reply(m.chat, `🕓 Debes esperar ${Math.ceil((users.ppt.lastGame + waitTime - new Date()) / 1000)} segundos para volver a jugar.`, m, rcanal);
  }

  const options = ['piedra', 'papel', 'tijera'];
  const playerChoice = args[0]?.toLowerCase();

  if (!playerChoice || !options.includes(playerChoice)) {
    return conn.reply(m.chat,
`Piedra 🗿, Papel 📄 o Tijera ✂️

🌵 Elige una opción:
• ${usedPrefix + command} piedra
• ${usedPrefix + command} papel
• ${usedPrefix + command} tijera`, m, rcanal);
  }

  const botChoice = options[Math.floor(Math.random() * options.length)];
  let resultText = '';
  let premio = 0;

  if (playerChoice === botChoice) {
    resultText = '🌵 ¡Empate!';
    premio = 10; // Premio por empate
    if (!users.cookies) users.cookies = 0;
    users.cookies += premio;
  } else if (
    (playerChoice === 'piedra' && botChoice === 'tijera') ||
    (playerChoice === 'papel' && botChoice === 'piedra') ||
    (playerChoice === 'tijera' && botChoice === 'papel')
  ) {
    resultText = '🥳 ¡Ganaste!';
    premio = 50; // Premio por ganar
    if (!users.cookies) users.cookies = 0;
    users.cookies += premio;
  } else {
    resultText = '🌵 ¡Perdiste!';
    premio = -30; // Castigo por perder
    if (!users.cookies) users.cookies = 0;
    users.cookies = Math.max(0, users.cookies + premio); // Ensure cookies don't go negative from this game
  }

  users.ppt.lastGame = new Date * 1;

  let message = `${resultText}\n\n🚩 Tú: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}\n🌸 Bot: ${botChoice.charAt(0).toUpperCase() + botChoice.slice(1)}\n`;
  if (premio > 0) {
    message += `🎁 Premio: +${premio} Galletas 🍪`;
  } else if (premio < 0) {
    message += `❌ Castigo: ${premio} Galletas`; // Negative sign is already there
  } else { // Empate con premio 0 (si se cambia)
    message += `😐 Sin cambios en galletas.`;
  }

  conn.reply(m.chat, message, m, rcanal);
};

handler.help = ['ppt <piedra/papel/tijera>'];
handler.tags = ['fun', 'juegos']; // Added 'juegos' tag
handler.command = ['ppt', 'rps', 'piedrapapeltijera']; // Added aliases
handler.register = true;
handler.group = true; // Can be group or DM

export default handler;
