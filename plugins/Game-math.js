global.math = global.math ? global.math : {};
const handler = async (m, {conn, args, usedPrefix, command}) => {
  const mat =`
🌵 Elige la dificultad:

🚩 Dificultades: *${Object.keys(modes).join(' | ')}*
• Ejemplo: *${usedPrefix + command} noob*
`.trim();
  if (args.length < 1) return await conn.reply(m.chat, mat, m, global.rcanal); // Assuming rcanal is global

  const mode = args[0].toLowerCase();
  if (!(mode in modes)) return await conn.reply(m.chat, mat, m, global.rcanal); // Assuming rcanal is global

  const id = m.chat;
  if (id in global.math) return conn.reply(m.chat, '🌵 Todavía hay una pregunta activa en este chat.', global.math[id][0]); // global.math[id][0] is the message object to quote

  const math = genMath(mode);
  global.math[id] = [
    await conn.reply(m.chat, `¿Cuál es el resultado de: *${math.str}*?\n\n🕝 Tiempo: ${(math.time / 1000).toFixed(2)}s\n🎁 Premio: ${math.bonus} Galletas 🍪`, m, global.rcanal), // Assuming rcanal is global
    math,
    4, // Number of attempts? This was '4' in original.
    setTimeout(() => {
      if (global.math[id]) {
        conn.reply(m.chat, `🌵 Se acabó el tiempo.\n\n✨️ Respuesta correcta: *${math.result}*`, global.math[id][0]) // Quoting the question message
        delete global.math[id];
      }
    }, math.time),
  ];
};
handler.help = ['math [dificultad]']; // Added [dificultad] for clarity
handler.tags = ['fun'];
handler.command = ['math', 'mates', 'matemáticas']; // Kept original aliases
export default handler;

const modes = {
  noob: [-3, 3, -3, 3, '+-', 15000, 10],
  easy: [-10, 10, -10, 10, '*/+-', 20000, 40],
  medium: [-40, 40, -20, 20, '*/+-', 40000, 150],
  hard: [-100, 100, -70, 70, '*/+-', 60000, 350],
  extreme: [-999999, 999999, -999999, 999999, '*/', 99999, 9999],
  impossible: [-99999999999, 99999999999, -99999999999, 999999999999, '*/', 30000, 35000],
  impossible2: [-999999999999999, 999999999999999, -999, 999, '/', 30000, 50000],
};

const operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷',
};

function genMath(mode) {
  const [a1, a2, b1, b2, ops, time, bonus] = modes[mode];
  let a = randomInt(a1, a2);
  const b = randomInt(b1, b2);
  const op = pickRandom([...ops]);
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))();
  if (op == '/') [a, result] = [result, a]; // Ensure 'a' is the dividend for display if result is not integer
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result,
  };
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from];
  from = Math.floor(from);
  to = Math.floor(to);
  return Math.floor((to - from) * Math.random() + from);
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
