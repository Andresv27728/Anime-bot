const xpperestrellas = 350;
const handler = async (m, {conn, command, args}) => {
  let count = command.replace(/^rentar/i, '');
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperestrellas) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
  count = Math.max(1, count);

  if (!global.db.data.users[m.sender].estrellas) { // Initialize estrellas if undefined
    global.db.data.users[m.sender].estrellas = 0;
  }

  if (global.db.data.users[m.sender].estrellas >= xpperestrellas * count) {
    global.db.data.users[m.sender].estrellas -= xpperestrellas * count;
    if (!global.db.data.users[m.sender].tokens) { // Initialize tokens if undefined
        global.db.data.users[m.sender].tokens = 0;
    }
    global.db.data.users[m.sender].tokens += count;

    // The userRents logic seems to be a separate or possibly redundant system.
    // For now, I'll assume it's intended and initialize it if it doesn't exist.
    let userRents = global.db.data.userRents || {};
    if (!userRents[m.sender]) {
      userRents[m.sender] = {
        tokens: 0,
        groups: [] // Assuming groups might be used elsewhere
      };
    }
    userRents[m.sender].tokens += count; // This might be duplicating the user's main token count or a separate rental-specific token
    global.db.data.userRents = userRents;

    // Determine which token count to display; using the one from userRents as per original message.
    // If userRents is the primary way to track rental tokens, then the user.tokens might be for something else.
    // For this simplification, I'll use the userRents[m.sender].tokens as in the original display logic.

    conn.reply(m.chat, `
┌─「 ALQUILAR BOT 」─
│ Compra: +${count} Token(s)
│ Gastado: -${xpperestrellas * count} Estrellas 🌟
│ Tokens Disponibles (Alquiler): ${userRents[m.sender].tokens}
└─────────────────`, m, global.rcanal); // Assuming rcanal is global
  } else {
    conn.reply(m.chat, `😔 Lo siento, no tienes suficientes Estrellas 🌟 para comprar ${count} Token(s).`, m, global.rcanal); // Assuming rcanal is global
  }
};
handler.help = ['rentar [cantidad]']; // Added [cantidad] for clarity
handler.tags = ['grupo'];
handler.register = true;
handler.command = ['rentar'];

handler.disabled = false;

export default handler;