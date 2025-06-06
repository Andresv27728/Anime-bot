const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('✧ Tú ya eres admin.');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done) // Assuming 'done' is a global reaction emoji
   m.reply('✧ Listo, ya tienes admin.');
    let nn = conn.getName(m.sender);
     conn.reply('525544876071@s.whatsapp.net', `🚩 ${nn} se dio Auto Admin en:\n> ${groupMetadata.subject}`, m, rcanal); // Assuming rcanal is a global context variable
  } catch {
    m.reply('✦ Ocurrió un error.');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
