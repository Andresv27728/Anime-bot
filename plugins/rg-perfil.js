import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
var handler = async (m, { conn }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who, 'image').catch(_ => imagen1) // Assuming imagen1 is a global fallback
let { premium, level, cookies, exp, lastclaim, registered, regTime, age, role } = global.db.data.users[who] // Changed m.sender to who for consistency
let username = conn.getName(who)
let noprem = `
🚩 PERFIL DE USUARIO
☁️ Nombre: ${username}
💥 Tag: @${who.replace(/@.+/, '')}
🌀 Registrado: ${registered ? '✅': '❌'}

👑 RECURSOS
💥 Nivel: ${level}
💫 Experiencia: ${exp}
✨️ Rango: ${role}

👑 Premium: ${premium ? '✅': '❌'}
`.trim()

let prem = `╭──⪩ USUARIO PREMIUM ⪨
│👤 Usuario: ${username}
│💌 Registrado: ${registered ? '✅': '❌'}
│🔱 Rol: Vip 👑
╰───⪨

╭────⪩ RECURSOS ⪨
│🔰 Nivel: ${level}
│💫 Experiencia: ${exp}
│⚜️ Rango: ${role}
╰───⪨ Usuario Destacado ⪩`.trim()
conn.sendFile(m.chat, pp, 'perfil.jpg', `${premium ? prem.trim() : noprem.trim()}`, m, rcanal, { mentions: [who] })
}
handler.help = ['profile']
handler.register = true
handler.group = true
handler.tags = ['rg']
handler.command = ['profile', 'perfil']
export default handler
