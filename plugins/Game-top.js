import util from 'util'
import path from 'path'
let user = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
// Assuming rcanal is a global variable for context
if (!text) return conn.reply(m.chat, `Ejemplo de uso: ${usedPrefix + command} Chistosos`, m, global.rcanal);

let ps = groupMetadata.participants.map(v => v.id)
// Ensure enough unique participants if possible, though current logic allows duplicates
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()

let k = Math.floor(Math.random() * 70); // This seems to be for a sound URL, not directly text
let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`
// let l = Math.floor(Math.random() * x.length); // 'l' is unused

// let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3` // Sound URL, not a user-facing text for simplification

let top = `*${x} Top 10 ${text} ${x}*

*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`

m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j].filter(id => id) }) // Filter out any potential undefined if ps is small
}
handler.help = ['top <texto>']
handler.command = ['top']
handler.tags = ['fun']
handler.group = true
export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
