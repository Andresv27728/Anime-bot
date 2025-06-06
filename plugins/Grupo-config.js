let handler = async (m, { conn, args, usedPrefix, command }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => global.icons || 'https://telegra.ph/file/24fa902ead26340f3df2c.png') // Assuming icons is global or provide a fallback
let isClose = { // Switch Case Like :v
'open': 'not_announcement',
'close': 'announcement',
'abierto': 'not_announcement',
'cerrado': 'announcement',
'abrir': 'not_announcement',
'cerrar': 'announcement',
}[(args[0] || '').toLowerCase()] // Added toLowerCase for broader matching
if (isClose === undefined) {
  // Removed "bloquear / desbloquear" from examples as they are not handled by this logic
  return conn.reply(m.chat, `Elige una opción para la configuración del grupo:\n\nEjemplo:\n*○ ${usedPrefix + command} abrir*\n*○ ${usedPrefix + command} cerrar*`, m, global.rcanal); // Assuming rcanal is global
}
await conn.groupSettingUpdate(m.chat, isClose)

if (isClose === 'not_announcement'){
m.reply(`🔓 Grupo abierto. Todos pueden escribir.`)
} else if (isClose === 'announcement'){ // Added else if for clarity
m.reply(`🔐 Grupo cerrado. Solo admins pueden escribir.`)
}}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['grupo']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true
export default handler
