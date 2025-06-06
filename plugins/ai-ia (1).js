
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃            🤖 *IA* 🤖            ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*Uso:* ${usedPrefix}${command} [pregunta]

*Ejemplo:* ${usedPrefix}${command} ¿Cómo estás?

Ingresa una pregunta para que la IA la responda.`)
    }

    try {
        await m.react('🤔')
        conn.sendPresenceUpdate('composing', m.chat)
        
        const { key } = await conn.sendMessage(m.chat, {
            text: '🤖 La IA está procesando tu pregunta, espera un momento...'
        }, { quoted: m })

        let api = await fetch(`https://deliriussapi-oficial.vercel.app/ia/chatgpt?q=${encodeURIComponent(text)}`)
        let json = await api.json()
        
        if (json && json.data) {
            let response = `${json.data}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPower by 💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖`
            
            await conn.sendMessage(m.chat, { text: response, edit: key })
            await m.react('✅')
        } else {
            throw new Error('No se pudo obtener respuesta')
        }
        
    } catch (error) {
        console.error('Error en IA:', error)
        await m.react('❌')
        await conn.reply(m.chat, `❌ La IA no puede responder a esa pregunta en este momento. Inténtalo de nuevo.`, m)
    }
}

handler.help = ['ia', 'chatgpt']
handler.tags = ['ai']
handler.command = /^(ia|chatgpt|ai)$/i
handler.register = true

export default handler
