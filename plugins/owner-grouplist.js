const handler = async (m, { conn }) => {
  let txt = '';
try {    
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  const totalGroups = groups.length;
  for (let i = 0; i < groups.length; i++) {
    const [jid, chat] = groups[i];
    const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
    const participants = groupMetadata.participants || [];
    const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
    const isBotAdmin = bot?.admin || false;
    const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
    const participantStatus = isParticipant ? '👤 Participante' : '❌ No Participante';
    const totalParticipants = participants.length;
    txt += `◉ Grupo ${i + 1}
    ➤ Nombre: ${await conn.getName(jid)}
    ➤ ID: ${jid}
    ➤ Bot Admin: ${isBotAdmin ? '✔ Sí' : '❌ No'}
    ➤ Estado: ${participantStatus}
    ➤ Participantes: ${totalParticipants}
    ➤ Link: ${isBotAdmin ? `https://chat.whatsapp.com/${await conn.groupInviteCode(jid) || '(Error al obtener enlace)'}` : '(Bot no es admin)'}\n\n`;
  }
  m.reply(`Lista de Grupos del Bot 🤖\n\nTotal de grupos: ${totalGroups}\n\n${txt}`.trim());
} catch (e) { // Added error parameter
  console.error(e); // Log the error
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
  const totalGroups = groups.length;
  txt = ''; // Reset txt for error block
  for (let i = 0; i < groups.length; i++) {
    const [jid, chat] = groups[i];
    const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
    const participants = groupMetadata.participants || [];
    const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
    const isBotAdmin = bot?.admin || false;
    const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
    const participantStatus = isParticipant ? '👤 Participante' : '❌ No Participante';
    const totalParticipants = participants.length;    
    txt += `◉ Grupo ${i + 1}
    ➤ Nombre: ${await conn.getName(jid)}
    ➤ ID: ${jid}
    ➤ Bot Admin: ${isBotAdmin ? '✔ Sí' : '❌ No'}
    ➤ Estado: ${participantStatus}
    ➤ Participantes: ${totalParticipants}
    ➤ Link: ${isBotAdmin ? '(Error al obtener enlace)' : '(Bot no es admin)'}\n\n`; // Simplified link part in catch
  }
  m.reply(`Lista de Grupos del Bot 👾 (Error al obtener algunos detalles)\n\nTotal de grupos: ${totalGroups}\n\n${txt}`.trim());
 }    
};
handler.help = ['groups', 'grouplist'];
handler.tags = ['owner'];
handler.command = ['listgroup', 'gruposlista', 'grouplist', 'listagrupos']
handler.rowner = true;
handler.private = true

export default handler;