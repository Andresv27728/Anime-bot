var handler = async (m, { conn, text, usedPrefix, command }) => {
  const exampleUsage = `🚩 Ejemplo de uso:\n\n${usedPrefix + command} Hola @${m.sender.split('@')[0]} ¿Cómo estás?`;

  if (!text) return m.reply(exampleUsage, null, { mentions: [m.sender] });

  let cm = copy(m);
  let who;

  // Determine 'who' based on mention or if text includes '@0'
  if (text.includes('@0')) {
    who = '0@s.whatsapp.net';
  } else if (m.isGroup) {
    if (m.mentionedJid && m.mentionedJid.length > 0) {
      who = m.mentionedJid[0];
      // Ensure the mentioned JID is part of the text for splitting logic later
      if (!text.includes(`@${who.split('@')[0]}`)) {
         return m.reply(`Asegúrate de que la mención @${who.split('@')[0]} esté en el texto que citas.\n\n${exampleUsage}`, null, { mentions: [m.sender, who] });
      }
    } else {
      // If no mention in a group, it's an error or needs different handling.
      // For fakereply, a target for the fake quote is essential.
      return m.reply(`Debes mencionar a un usuario para citar.\n\n${exampleUsage}`, null, { mentions: [m.sender] });
    }
  } else { // Not in a group, implies DM with the bot or a specific chat target
      // This command structure seems designed for faking a reply *from* someone.
      // In a DM, 'who' would typically be m.chat (the other user).
      // However, the command expects to extract 'fake' text and 'real' text around a mention.
      // This might be difficult in DMs without a clear @mention target in the text itself.
      // For simplicity, let's assume in DMs it will fake from the sender of the command if no other @mention is in text.
      // Or better, require a mention even in DMs for this command to make sense.
      return m.reply(`Este comando usualmente requiere una mención.\n\n${exampleUsage}`, null, { mentions: [m.sender] });
  }

  // This check is now somewhat redundant due to earlier checks but kept for safety.
  if (!who) return m.reply(`No se pudo determinar el usuario a citar.\n\n${exampleUsage}`, null, { mentions: [m.sender] });

  cm.key.fromMe = false;
  // Ensure the remoteJid is the chat where the message should appear (m.chat)
  // and participant is the user 'who' we are faking the reply from.
  cm.key.remoteJid = m.chat;
  cm.key.participant = who;

  // Ensure m.msg is available (it might not be if the original message was, e.g., a reaction)
  if (!m.msg) {
      return m.reply("No puedo citar este tipo de mensaje.", null, {quoted: m});
  }
  cm.message = copy(m.message); // Deep copy the whole message structure of the original message to be faked

  let sp = '@' + who.split`@`[0];
  let [fake, ...realParts] = text.split(sp);
  let real = realParts.join(sp).trimStart();

  if (!fake.trim() && !real.trim()) {
    return m.reply(`Faltan los textos para el mensaje falso.\n\n${exampleUsage}`, null, { mentions: [m.sender, who] });
  }
  if (!real.trim()) { // If no "real" message is provided after mention, use the original message's text
    real = m.body; // or m.text, depending on what 'text' usually holds. Using m.body for more raw content.
    if (!real) return m.reply(`No hay texto en el mensaje original para usar como respuesta real, y no proporcionaste uno.\n\n${exampleUsage}`, null, {mentions: [m.sender, who]});
  }


  conn.fakeReply(m.chat, real, who, fake.trimEnd() || " ", m.isGroup ? m.chat : who, { contextInfo: { mentionedJid: conn.parseMention(real)}});

}
handler.help = ['fakereply <texto_falso> @<usuario> <texto_real>', 'fake <tf> @<usr> <tr>', 'fitnah <tf> @<usr> <tr>'];
handler.tags = ['tools'];
handler.command = ['fitnah', 'fakereply', 'fake'];

handler.register = true;
handler.group = true; // The command is more intuitive in groups.

export default handler;

function copy(obj) {
return JSON.parse(JSON.stringify(obj));
}
