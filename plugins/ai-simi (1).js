
import axios from 'axios'
import { translate } from '@vitalets/google-translate-api'

const handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) {
        return conn.reply(m.chat, `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃          🌸 *AKENO* 🌸          ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

*Uso:* ${usedPrefix}${command} [mensaje]

*Ejemplo:* ${usedPrefix}${command} Hola

Te faltó el texto para hablar con akeno.`, m)
    }

    try {
        await m.react('🌸')
        conn.sendPresenceUpdate('composing', m.chat)
        
        const { key } = await conn.sendMessage(m.chat, {
            text: '🌸 Akeno está pensando en su respuesta...'
        }, { quoted: m })
        
        const resSimi = await simitalk(text)
        
        if (resSimi && resSimi.resultado && resSimi.resultado.simsimi) {
            let response = `${resSimi.resultado.simsimi}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nPower by 💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖`
            
            await conn.sendMessage(m.chat, { text: response, edit: key })
            await m.react('✅')
        } else {
            throw new Error('No se pudo obtener respuesta')
        }
        
    } catch (error) {
        console.error('Error en Simi:', error)
        await m.react('❌')
        return conn.reply(m.chat, '❌ Ocurrió un error al hablar con Akeno.', m)
    }
}

handler.help = ['akeno', 'misa']
handler.tags = ['ai']
handler.register = true
handler.command = /^(akeno|misa)$/i

export default handler

async function simitalk(ask, language = "es") {
    if (!ask) return { status: false, resultado: { msg: "Debes ingresar un texto para hablar con simsimi." }}

    try {
        const response1 = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`)
        
        if (response1.data && response1.data.data && response1.data.data.message) {
            const trad1 = await translate(`${response1.data.data.message}`, { to: language, autoCorrect: true })
            
            return {
                status: true,
                resultado: {
                    simsimi: trad1.text || response1.data.data.message
                }
            }
        } else {
            return {
                status: true,
                resultado: {
                    simsimi: "¡Hola! ¿Cómo estás? 😊"
                }
            }
        }
        
    } catch (error) {
        console.error('Error en simitalk:', error)
        return {
            status: true,
            resultado: {
                simsimi: "¡Hola! ¿Cómo puedo ayudarte? 😊"
            }
        }
    }
}
