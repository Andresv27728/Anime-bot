const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    let user;
    let db = global.db.data.users; // Ensure db is accessed correctly, assuming it's global

    if (m.quoted) {
        user = m.quoted.sender;
    } else if (args.length >= 1 && args[0].startsWith('@')) {
        // Extract JID from mention like @1234567890
        user = args[0].replace('@', '') + '@s.whatsapp.net';
    } else if (args.length >= 1 && !args[0].startsWith('@')) {
        // Assume it's a JID directly if not a mention (less common for users to type JID)
        // This part could be risky if users type random text.
        // For robustness, it's often better to strictly require a mention or reply.
        // However, I'll keep the original logic's flexibility for now.
        user = args[0] + '@s.whatsapp.net';
    } else {
        return conn.reply(m.chat, `🚩 Etiqueta o responde al mensaje del usuario a desbanear.\nEjemplo: ${usedPrefix + command} @usuario`, m);
    }

    // Validate if the constructed JID is valid before proceeding
    if (!user || !/^\d+@s\.whatsapp\.net$/.test(user)) {
        return conn.reply(m.chat, `🚩 Formato de usuario inválido. Asegúrate de etiquetar correctamente.\nEjemplo: ${usedPrefix + command} @usuario`, m);
    }

    if (db[user]) {
        if (!db[user].banned) {
            return conn.reply(m.chat, `✅ El usuario @${user.split('@')[0]} no está baneado.`, m, { mentionedJid: [user] });
        }
        db[user].banned = false;
        db[user].banRazon = ''; // Clear ban reason
        // const nametag = await conn.getName(user); // getName can be slow and is only for display
        const senderName = conn.getName(m.sender); // For notification

        await conn.reply(m.chat, `✅ El usuario @${user.split('@')[0]} ha sido desbaneado.`, m, { mentionedJid: [user] });

        // Notification to another number (ensure this number is correctly configured)
        // const adminNumber = '5493876432076@s.whatsapp.net'; // Example, should be a config variable
        // if (adminNumber && adminNumber !== conn.user.jid) { // Avoid bot sending to itself
        //    conn.reply(adminNumber, `🚩 El usuario @${user.split('@')[0]} fue desbaneado por @${m.sender.split('@')[0]}.`, null, { mentions: [user, m.sender] });
        // }
        // Commenting out direct notification to a fixed number for safety unless it's configurable.
        // The original rcanal variable usage is unclear without seeing its definition.
        // If rcanal is a specific chat for logs, it can be used:
        // if (global.rcanal) conn.reply(global.rcanal, `🚩 El usuario @${user.split('@')[0]} fue desbaneado por @${m.sender.split('@')[0]}.`, null, { mentions: [user, m.sender] });


    } else {
        await conn.reply(m.chat, `🚩 El usuario @${user.split('@')[0]} no está en la base de datos.`, m, { mentionedJid: [user] });
    }
};
handler.help = ['unbanuser <@tag>'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;
// handler.group = true; // Not strictly necessary for unbanning, can be done in DMs too if bot is admin there
export default handler;
