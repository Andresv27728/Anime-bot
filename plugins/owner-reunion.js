let handler = async(m, { conn, command, text }) => {
  const emoji = '📢'; // Default emoji
  const emoji2 = '⚠️'; // Default emoji2

  if (!text) return m.reply(`${emoji} Ingresa el motivo de la reunión.`);
  if (text.length < 10) return m.reply(`${emoji2} El motivo debe tener al menos 10 caracteres.`);
  
  let texto = `${emoji2} El Owner @${m.sender.split`@`[0]} ha iniciado una reunión.\nÚnete pronto al grupo de staff.\nMotivo: ${text}`;
  m.reply(`${emoji} Enviando aviso de reunión a los Owners.`);
  
  let mentions = [m.sender]
  
  for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
    let data = (await conn.onWhatsApp(jid))[0] || {}
    if (data.exists) {
      await conn.sendMessage(data.jid, { text: texto, mentions })
    }
  }
}

handler.tags = ['owner']
handler.command = handler.help = ['reunion', 'meeting']
handler.rowner = true

export default handler