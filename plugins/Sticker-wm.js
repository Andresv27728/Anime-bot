import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) return m.reply('⚠ Responde a un sticker.')
  let stiker = false
  try {
   await m.react(rwait) // Assuming rwait is a global variable for reaction
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply('⚠️ Responde a un sticker.')
    let img = await m.quoted.download()
    if (!img) return m.reply('⚠ Responde a un sticker.') // Repeated message, but keeping structure
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
  // await conn.reply(m.chat, global.wait, m) // Assuming global.wait is defined if uncommented
     if (stiker) {
        conn.sendFile(m.chat, stiker, 'wm.webp', '', m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: `Black Clover ☘︎`, body: `Sticker por: YaemoriBot`, mediaType: 2, sourceUrl: global.redes, thumbnail: global.icons}}}, { quoted: m }) // Assuming redes and icons are global
        await m.react(done) // Assuming done is a global variable for reaction
     } else {
        await m.react(error) // Assuming error is a global variable for reaction
        // throw '⚠️ La conversión falló. Intenta de nuevo.'; // Throwing an error might crash, better to reply
        m.reply('⚠️ La conversión falló. Intenta de nuevo.');
     }
  }
}
handler.help = ['take <nombre>|<autor>']
handler.tags = ['sticker']
handler.command = ['take', 'robar', 'wm']

export default handler
