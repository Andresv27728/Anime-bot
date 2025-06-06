const handler = async (m, { conn }) => {
    const user = global.db.data.users[m.sender];
    // Assuming fkontak is a global variable for quoted context
    conn.sendMessage(m.chat, {text: `🚩 @${m.sender.split('@')[0]}, ahora tienes recursos ilimitados.`, mentions: [m.sender]}, {quoted: global.fkontak});

    user.money = Infinity;
    user.cookies = Infinity; // Assuming 'cookies' is another currency like 'money'
    user.level = Infinity;
    user.exp = Infinity;
    // Note: Directly setting to Infinity might have unintended side effects in other parts of the system
    // if they don't handle Infinity correctly (e.g., in calculations or displays).
};
handler.help = ['chetar', 'ilimitado', 'infinito'];
handler.tags = ['owner'];
handler.command = ['ilimitado', 'infinito', 'chetar'];
handler.rowner = true;
handler.fail = null; // This typically means no specific error message will be sent by the handler itself on failure
export default handler;
