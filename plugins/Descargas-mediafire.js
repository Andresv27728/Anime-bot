/*- `PLUGIN DOWNLOAD MEDIAFIRE`- By KenisawaDev*/

import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw m.reply(`Ingresa un enlace de MediaFire.\nEjemplo: ${usedPrefix}${command} https://www.mediafire.com/file/example.apk/file`);
conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });
	let ouh = await fetch(`https://api.agatz.xyz/api/mediafire?url=${text}`)
  let gyh = await ouh.json()
  if (!gyh.data || !gyh.data[0] || !gyh.data[0].link) { // Basic check for API response structure
    await conn.sendMessage(m.chat, { react: { text: '✖️', key: m.key }})
    return m.reply("No se pudo obtener la información del archivo o el enlace es inválido.");
  }
	await conn.sendFile(m.chat, gyh.data[0].link, `${gyh.data[0].nama}`, `📝 Nombre: ${gyh.data[0].nama}\n🎮 Tamaño: ${gyh.data[0].size}\n💾 Extensión: ${gyh.data[0].mime}`, m)
	await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['mediafire']
handler.tags = ['descargas']
handler.command ='mediafire' , /^(mediafire|mf)$/i
handler.premium = false
handler.dragones = 1 // Assuming this is a custom property and not a typo for 'dragon' or similar.
handler.register = true
export default handler
