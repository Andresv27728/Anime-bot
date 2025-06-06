let handler = async (m, { conn, isAdmin, isROwner }) => {
    // Assuming dfail is a global function that handles admin checks and replies
    if (!(isAdmin || isROwner)) return global.dfail('admin', m, conn);

    global.db.data.chats[m.chat].isBanned = true;
    // Assuming rcanal is a global context variable
    await conn.reply(m.chat, `✅ Chat baneado con éxito.`, m, global.rcanal);
    await m.react('✅');
}
handler.help = ['banchat']; // Simplified help to primary command
handler.tags = ['group'];
handler.command = ['banearbot', 'banchat']; // Kept both aliases
handler.group = true;
// handler.admin = true; // This is implicitly checked by (isAdmin || isROwner)
// handler.botAdmin = true; // Not necessarily needed for this command if only setting a flag

export default handler;
