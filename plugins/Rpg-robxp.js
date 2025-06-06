const ro = 3000; // Max XP that can be robbed
const handler = async (m, {conn, usedPrefix, command}) => {
  // Assuming rcanal and fake are global context variables or have defaults
  const rcanal = global.rcanal;
  const fake = global.fake;

  const time = global.db.data.users[m.sender].lastrob + 7200000; // 2 hours cooldown
  if (new Date - global.db.data.users[m.sender].lastrob < 7200000) {
    conn.reply(m.chat, `🚩 ¡Espera ${msToTime(time - new Date())} para volver a robar XP!`, m, rcanal);
    return;
  }
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat; // In DMs, this would target the chat partner, which might be unintended for "robbing".
                     // However, the command is likely group-only or owner-restricted for specific targets.
                     // For now, keeping original logic for 'who' in DMs.

  if (!who) {
    conn.reply(m.chat, `🚩 Etiqueta al usuario al que quieres robar XP.`, m, fake);
    return;
  }
  if (!(who in global.db.data.users)) {
    conn.reply(m.chat, `🚩 El usuario @${who.split('@')[0]} no está en mi base de datos.`, m, { mentions: [who] });
    return;
  }
  if (who === m.sender) {
    return conn.reply(m.chat, `🚩 No puedes robarte XP a ti mismo.`, m);
  }

  const users = global.db.data.users[who];
  if (!users.exp) users.exp = 0; // Initialize exp if undefined

  const rob = Math.floor(Math.random() * ro);
  if (users.exp < rob) {
    return conn.reply(m.chat, `😔 @${who.split('@')[0]} tiene menos de ${ro} XP.\nNo le robes a un pobre. :(`, m, {mentions: [who]});
  }

  if (!global.db.data.users[m.sender].exp) global.db.data.users[m.sender].exp = 0; // Initialize sender's exp if undefined

  global.db.data.users[m.sender].exp += rob;
  global.db.data.users[who].exp -= rob;

  conn.reply(m.chat, `🚩 ¡Robaste ${rob} XP a @${who.split('@')[0]}!`, m, {mentions: [who]});
  global.db.data.users[m.sender].lastrob = new Date() * 1;
};

handler.help = ['robarxp [@tag]', 'robxp [@tag]'];
handler.tags = ['rpg'];
handler.command = ['robarxp', 'robxp', 'robar', 'rob']; // Added robxp aliases
// handler.group = true; // Consider if this should be group only. Robbing from bot in DM?
export default handler;

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let str = "";
  if (hours > 0) str += hours + "h ";
  if (minutes > 0 || (hours > 0 && (seconds > 0 || str === ""))) str += minutes + "min ";
  if (seconds > 0 || str === "") str += seconds + "s";

  return str.trim() || '0s';
}
