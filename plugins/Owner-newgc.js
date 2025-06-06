let handler = async (m, { conn, text }) => {
if (!text) return m.reply('🚩 Nombre para el grupo:')
try{
m.reply('🚩 Creando grupo...')
let group = await conn.groupCreate(text, [m.sender])
let link = await conn.groupInviteCode(group.gid)
m.reply(`https://chat.whatsapp.com/${link}`)
} catch (e) {
m.reply(`🚩 Error al crear grupo.`)
}
}
handler.help = ['grupocrear <nombre>']
handler.tags = ['owner']
handler.command = ['creargc', 'newgc', 'creargrupo', 'grupocrear']
handler.rowner = true
handler.register = true
export default handler
