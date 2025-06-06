const ro = 30;
const handler = async (m, {conn, usedPrefix, command}) => {
  const time = global.db.data.users[m.sender].lastrob2 + 7200000;
  if (new Date - global.db.data.users[m.sender].lastrob2 < 7200000) {
  conn.reply(m.chat, `🚩 ¡Espera ${msToTime(time - new Date())} para volver a robar!`, m, global.rcanal); // Assuming rcanal is global
  return;
  }
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) {
  conn.reply(m.chat, `🚩 Etiqueta al usuario.`, m, global.fake) // Assuming fake is global
  return;
    };
  if (!(who in global.db.data.users)) {
  conn.reply(m.chat, `🚩 El usuario no está en mi base de datos.`, m, global.rcanal) // Assuming rcanal is global
return;
  }
  const users = global.db.data.users[who];
  if (!users.cookies) users.cookies = 0; // Initialize if undefined

  const rob = Math.floor(Math.random() * ro);
  if (users.cookies < rob) return conn.reply(m.chat, `😔 @${who.split`@`[0]} tiene menos de ${ro} monedas 🪙.\nNo le robes a un pobre. :(`, m, {mentions: [who]});

  global.db.data.users[m.sender].cookies += rob;
  global.db.data.users[who].cookies -= rob;
  conn.reply(m.chat, `🚩 Robaste ${rob} monedas 🪙 a @${who.split`@`[0]}.`, m, {mentions: [who]});
  global.db.data.users[m.sender].lastrob2 = new Date * 1;
};
handler.help = ['rob2 [@tag]']; // Clarified help
handler.tags = ['rpg'];
handler.command = ['robar2', 'rob2'];
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let str = "";
  if (hours > 0) str += hours + 'h ';
  if (minutes > 0 || hours > 0) str += minutes + 'min '; // Show minutes if hours are present or minutes > 0
  // Always show seconds for precision if duration is less than a minute, or if it's not exactly 0.
  if (duration < 60000 || seconds > 0) str += seconds + 's';

  return str.trim() || '0s'; // Return '0s' if duration is very small or zero
}
