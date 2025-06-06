
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    // Verificar que solo el owner pueda usar este comando
    if (!isOwner) {
        return m.reply('❌ Este comando solo puede ser usado por el propietario del bot.')
    }

    if (!args[0]) {
        return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃         🪙 *ADD COINS* 🪙         ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*Uso:* ${usedPrefix}addcoins [@usuario] [cantidad]

*Ejemplo:* ${usedPrefix}addcoins @usuario 500

Este comando permite agregar coins a cualquier usuario.`)
    }

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    let user = global.db.data.users[who]
    
    if (!user) {
        return m.reply('❌ Usuario no encontrado en la base de datos.')
    }

    let amount = parseInt(args[1])
    if (isNaN(amount) || amount < 1) {
        return m.reply('❌ La cantidad debe ser un número válido mayor a 0.')
    }

    // Agregar coins al usuario
    user.limit = (user.limit || 0) + amount
    
    let mensaje = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       🪙 *COINS AGREGADOS* 🪙       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

👤 *Usuario:* @${who.split('@')[0]}
🪙 *Coins agregados:* ${amount.toLocaleString()}
💎 *Total de coins:* ${user.limit.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Power by 💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖`

    await conn.sendMessage(m.chat, { text: mensaje, mentions: [who] }, { quoted: m })
    console.log(`[ADD COINS] ${m.sender} agregó ${amount} coins a ${who}`)
}

handler.help = ['addcoins']
handler.tags = ['owner']
handler.command = /^(addcoins|coins|addlimit)$/i
handler.owner = true
handler.register = false

export default handler
