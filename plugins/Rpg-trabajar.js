let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender]
let tiempo = 5 * 60 // 5 minutos en segundos
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
conn.reply(m.chat, `🚩 Espera ${tiempo2} para volver a trabajar.`, m, global.rcanal) // Assuming rcanal is global
return
}
let rsl = Math.floor(Math.random() * 5000) + 500 // Added a base amount to avoid very low earnings
cooldowns[m.sender] = Date.now()
await conn.reply(m.chat, `🚩 ${pickRandom(global.trabajo)} ${toNum(rsl)} (${rsl}) XP 🍭.`, m, global.rcanal) // Assuming rcanal is global
user.exp = (user.exp || 0) + rsl // Initialize exp if undefined
}

handler.help = ['trabajar']
handler.tags = ['rpg']
handler.command = ['w','work', 'trabajar']
handler.register = true
export default handler

function toNum(number) {
if (number >= 1000000) {
return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
} else if (number >= 1000) {
return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
}
return number.toString()
}

function segundosAHMS(segundos) {
let horas = Math.floor(segundos / 3600);
let minutos = Math.floor((segundos % 3600) / 60);
let segundosRestantes = segundos % 60;

let str = "";
if (horas > 0) str += horas + "h ";
if (minutos > 0 || (horas > 0 && segundosRestantes > 0)) str += minutos + "min "; // Show minutes if hours or seconds are present
if (segundosRestantes > 0 || str === "") str += segundosRestantes + "s"; // Always show seconds if it's the only unit or non-zero

return str.trim() || '0s'; // Return '0s' if duration is zero
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())];
}

// Trabajos revisados y simplificados
global.trabajo = [
   "Trabajaste como cortador de galletas y ganaste",
   "Trabajaste para una empresa militar privada y ganaste",
   "Organizaste un evento de cata de vinos y obtuviste",
   "Limpiaste la chimenea y encontraste",
   "Desarrollaste un juego indie y ganaste",
   "Hiciste horas extras en la oficina y recibiste",
   "Trabajaste de niñero y ganaste",
   "Viste una obra de teatro y te dieron",
   "Compraste y vendiste artículos coleccionables y ganaste",
   "Cocinaste en el restaurante de tu abuela y ganaste",
   "Trabajaste 10 minutos en una pizzería local y ganaste",
   "Escribiste frases para galletas de la fortuna y ganaste",
   "Vendiste artículos inútiles de tu bolso y obtuviste",
   "Diseñaste un logo para una startup y te pagaron",
   "Trabajaste duro en una imprenta y ganaste",
   "Podaste arbustos en un vecindario y ganaste",
   "Hiciste de actor de voz para un personaje secundario y ganaste",
   "Cultivaste vegetales orgánicos y ganaste",
   "Construiste castillos de arena en la playa y ganaste",
   "Actuaste como artista callejero y ganaste",
   "Hiciste trabajo social y recibiste una donación de",
   "Reparaste un viejo tanque y la tripulación te pagó",
   "Estudiaste el comportamiento de las anguilas y ganaste una beca de",
   "Trabajaste en un parque de diversiones disfrazado y ganaste",
   "Reparaste máquinas arcade y recibiste",
   "Hiciste trabajos ocasionales en la ciudad y ganaste",
   "Limpiaste un conducto de ventilación y encontraste",
   "Resolviste un misterio local y te recompensaron con",
   "Trabajaste como cuidador en el zoológico y ganaste",
   "Vendiste sándwiches gourmet y obtuviste",
   "Ayudaste en una excavación arqueológica y encontraste artefactos por valor de",
   "Participaste en un estudio científico y recibiste",
   "Fuiste extra en una película y te pagaron",
   "Distribuiste folletos y ganaste",
   "Paseaste perros del vecindario y ganaste",
   "Tradujiste un documento y te pagaron",
   "Vendiste limonada en un día caluroso y ganaste",
   "Hiciste de guía turístico en tu ciudad y ganaste",
   "Escribiste un artículo para un blog y te pagaron",
   "Ayudaste a organizar un evento benéfico y recibiste"
]
