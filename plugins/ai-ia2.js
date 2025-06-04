
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingrese una petición para que la IA lo responda.`, m)
    
    try {
        await m.react(rwait)
        conn.sendPresenceUpdate('composing', m.chat)
        
        const { key } = await conn.sendMessage(m.chat, {
            text: `${emoji2} IA está procesando tu petición, espera unos segundos.`
        }, { quoted: m })
        
        // Usar la API de Google AI con tu API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB8SaxwbWDCpOJb-sqs6-PO5T6xVRR7FWA`
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: text
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024
                }
            })
        })
        
        const data = await response.json()
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const result = data.candidates[0].content.parts[0].text
            await conn.sendMessage(m.chat, { text: result, edit: key })
            await m.react(done)
        } else {
            throw new Error('No se pudo obtener respuesta de la IA')
        }
        
    } catch (error) {
        console.error('Error en ia2:', error)
        await m.react(error)
        await conn.reply(m.chat, '✘ La IA no puede responder a esa pregunta en este momento.', m)
    }
}

handler.help = ['ia2']
handler.tags = ['ai']
handler.register = true
handler.command = ['ia2', 'gemini2']
handler.group = true

export default handler
