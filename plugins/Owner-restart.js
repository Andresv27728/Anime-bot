import { spawn } from 'child_process'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let handler = async (m, { conn, isROwner, text }) => { // isROwner is available from parameters

    // The condition 'conn.user.jid == conn.user.jid' is always true.
    // It might have been intended to check if (isROwner || m.sender === conn.user.jid)
    // or something similar, but as it is, it doesn't serve a purpose.
    // The check 'handler.rowner = true' already restricts this to the owner.
    // Thus, the 'else throw 'eh'' part is effectively unreachable if isROwner check is primary.

    if (!process.send) {
        // Assuming rcanal is a global for message context if available
        return conn.reply(m.chat, '✦ Para reiniciar manualmente, usa el comando desde la consola:\nnode start.js\no\nnode index.js', m, global.rcanal);
    }

    await m.react("🔄"); // Initial reaction

    const { key } = await conn.sendMessage(m.chat, { text: `🗂️ Reiniciando...` }, { quoted: m });
    await delay(1000 * 1);
    await conn.sendMessage(m.chat, { text: `📦 Reiniciando...`, edit: key });
    await delay(1000 * 1);
    await conn.sendMessage(m.chat, { text: `♻️ Reiniciando...`, edit: key });
    await conn.sendMessage(m.chat, { text: `⛏️ Reinicio completo en curso...`, edit: key });

    process.send('reset');
    // The 'else throw' part is removed due to the always-true condition and rowner check.
    // If there was another intent for that 'else', it's unclear from the original code.
}

handler.help = ['restart', 'reiniciar'] // Kept both, as 'reiniciar' is Spanish for restart
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']
handler.rowner = true // Ensures only the owner can use this command

export default handler;
