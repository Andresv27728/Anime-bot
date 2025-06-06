let handler = async (m, { conn, isOwner }) => {
let adv = Object.entries(global.db.data.users).filter(user => user[1].warn)
let user = global.db.data.users // user.warn is used in the map

// Assuming 'warns' was meant to refer to a specific user's warning count,
// but it's not clearly defined in the original snippet for the last line.
// For the list, user[1].warn or (in map) user.warn is used.
// If the last line is a global summary or bot's own warn level, this might need context.
// For now, simplifying the text as presented.
// The original code had 'let warns = global.db.data.users.warn', which is ambiguous
// if global.db.data.users.warn is not a single value but an object.
// Assuming it was meant to be a placeholder or a specific global warning count if available.
// Let's use a placeholder for now if a direct global.db.data.users.warn value isn't appropriate.
// For the purpose of this exercise, I will assume global.db.data.users.warn is a single counter.
let globalWarnCount = global.db.data.users.warn || 0; // Default to 0 if undefined

let caption = `⚠️ USUARIOS ADVERTIDOS
╭─────────────────·•
│ Total: ${adv.length} Usuarios
${adv.length > 0 ? adv.map(([jid, userData], i) => `│
│ ${i + 1}. ${conn.getName(jid) == undefined ? 'Nombre Desconocido' : conn.getName(jid)} (${userData.warn}/4)
│ ${isOwner ? '@' + jid.split('@')[0] : jid}
│ ---------------`).join('\n') : '│ Ningún usuario advertido.'}
╰─────────────────·•

Advertencias Globales (o de Chat): ${globalWarnCount}/4
${botname}`.trim()

await conn.reply(m.chat, caption, m, { mentions: await conn.parseMention(caption) })}

handler.command = ['listaadv','listadv','adv','advlist','advlista'] 

export default handler