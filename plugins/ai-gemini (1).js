
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃          🧠 *GEMINI* 🧠          ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*Uso:* ${usedPrefix}${command} [pregunta]

*Ejemplo:* ${usedPrefix}${command} Hola

Ingrese un texto para usar este comando.`, m)
    }
    
    try {
        await m.react('🧠')
        conn.sendPresenceUpdate('composing', m.chat)
        
        const { key } = await conn.sendMessage(m.chat, {
            text: '🧠 Gemini está procesando tu pregunta...'
        }, { quoted: m })
        
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${encodeURIComponent(text)}`)
        let res = await api.json()
        
        if (res && res.result) {
            let response = `${res.result}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPower by 💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖`
            
            await conn.sendMessage(m.chat, { text: response, edit: key })
            await m.react('✅')
        } else {
            throw new Error('No se pudo obtener respuesta')
        }
        
    } catch (error) {
        console.error('Error en Gemini:', error)
        await m.react('❌')
        await conn.reply(m.chat, `❌ Ocurrió un error en el comando, reportalo al creador del bot.`, m)
    }
}

handler.command = ['gemini']
handler.help = ['gemini']
handler.tags = ['ai']
handler.register = true

export default handler
