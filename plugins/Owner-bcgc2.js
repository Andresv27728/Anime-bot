const handler = async (m, {conn, text, participants, isAdmin, isOwner, usedPrefix, command}) => {
  const users = participants.map((u) => u.id).filter((v) => v !== conn.user.jid); // Unused in current logic, but kept from original
  const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map((v) => v[0]);

  // Assuming imagen1 is a global variable for thumbnail, or provide a fallback
  const fproducto = {
    key: {
      fromMe: false,
      participant: `0@s.whatsapp.net`,
      ...(false ? { remoteJid: '17608914335@s.whatsapp.net' } : {}) // This condition is always false, so remoteJid is never set.
    },
    message: {
      'productMessage': {
        'product': {
          'productImage': {
            'mimetype': 'image/jpeg',
            'jpegThumbnail': global.imagen1 || Buffer.alloc(0) // Use global.imagen1 or an empty buffer
          },
          'title': `COMUNICACIÓN GENERAL`,
          'description': 'Yotsuba-Nakano-MD', // Kept original description
          'currencyCode': 'USD',
          'priceAmount1000': '1000000000',
          'retailerId': 'Ghost',
          'productImageCount': 1
        },
        'businessOwnerJid': `0@s.whatsapp.net`
      }
    }
  };

  if (!m.quoted) throw `Responde a un mensaje usando el comando *${usedPrefix + command}* para enviar el comunicado.`;

  m.reply(` Enviando mensaje a ${groups.length} grupo(s)...`); // Added initial feedback

  let sentCount = 0;
  let errorCount = 0;

  for (const id of groups) {
    try {
      await conn.sendMessage(id, {forward: m.quoted.fakeObj, mentions: (await conn.groupMetadata(`${id}`)).participants.map((v) => v.id)}, {quoted: fproducto});
      sentCount++;
      // Optional: Add a small delay to avoid rate limiting if sending to many groups
      // await new Promise(resolve => setTimeout(resolve, 200));
    } catch (e) {
      errorCount++;
      console.error(`Error al enviar a ${id}:`, e);
    }
  }

  let replyMsg = `🛑 MENSAJE ENVIADO A ${sentCount} GRUPO(S).`;
  if (errorCount > 0) {
    replyMsg += `\n⚠️ Falló el envío a ${errorCount} grupo(s).`;
  }
  replyMsg += `\n\nNota: Es posible que este comando tenga fallos y no se envíe a todos los chats. Disculpa las molestias.`;
  m.reply(replyMsg);
};

handler.help = ['bcgc2 <responder a mensaje>']; // Clarified help
handler.tags = ['owner'];
handler.command = ['bcgc2', 'comunicadogc2']; // Added alias
handler.owner = true;
export default handler;
