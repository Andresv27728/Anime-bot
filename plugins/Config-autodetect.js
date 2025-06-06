let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
if (!m.messageStubType || !m.isGroup) return
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net"}
let chat = global.db.data.chats[m.chat]
let usuario = `@${m.sender.split`@`[0]}`
let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://qu.ax/QGAVS.jpg'  // Fallback image

let nombre, foto, edit, newlink, status, admingp, noadmingp
nombre = `${usuario}\n✨️ Cambió el nombre del grupo.\n\n🌻 Nuevo nombre: ${m.messageStubParameters[0]}`
foto = `${usuario}\n🚩 Cambió la imagen del grupo.`
edit = `${usuario}\n🌺 Ahora ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} pueden editar la info del grupo.`
newlink = `🌸 ${usuario} restableció el enlace del grupo.`
status = `El grupo ha sido ${m.messageStubParameters[0] == 'on' ? 'cerrado 🔒' : 'abierto 🔓'} por ${usuario}.\n\n💬 Ahora ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} pueden enviar mensajes.`
admingp = `@${m.messageStubParameters[0].split`@`[0]} ahora es admin del grupo. 🥳\n\n💫 Acción por: ${usuario}`
noadmingp =  `@${m.messageStubParameters[0].split`@`[0]} ya no es admin del grupo. 😿\n\n💫 Acción por: ${usuario}`

if (chat.detect && m.messageStubType == 21) { // Group name change
await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 22) { // Group image change
await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 23) { // Group link reset
await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 25) { // Group settings change (edit info)
await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 26) { // Group settings change (send messages)
await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 29) { // Promote
await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })

} else if (chat.detect && m.messageStubType == 30) { // Demote
await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`,`${m.messageStubParameters[0]}`] }, { quoted: fkontak })
}
// console.log({ messageStubType: m.messageStubType, messageStubParameters: m.messageStubParameters, type: WAMessageStubType[m.messageStubType] })
}
