let handler  = async (m, { conn }) => {

conn.reply(m.chat, '🚩 Buscando un reto para ti...', m, {
contextInfo: { externalAdReply :{ mediaUrl: null, mediaType: 1, showAdAttribution: true,
title: packname,
body: dev,
previewType: 0, thumbnail: icons,
sourceUrl: channel }}})
// Reto message will be sent after picking one
}

handler.help = ['reto']
handler.tags = ['fun']
handler.command ='reto',/^reto/i
export default handler

function pickRandom(list) {
  const randomIndex = Math.floor(list.length * Math.random());
  return list[randomIndex];
}

// Lista de retos actualizada y simplificada
global.bucin = [
  "Envía una foto de una hormiga.",
  "Dile a tus amigos que te mudas a EE.UU. y envía captura de su respuesta.",
  "Escribe el nombre de tu crush.",
  "Pon el nombre del creador del bot en tu estado de WhatsApp, sin contexto.",
  "Envía una fotografía tuya.",
  "Dibuja en tu cuerpo el nombre de un miembro del grupo, toma una foto y envíala.",
  "Hazte una foto dándole un beso a una televisión.",
  "Escribe en tu estado de WhatsApp que te gusta comer tierra.",
  "Pon la foto de un miembro del grupo (sexo opuesto) en tu perfil de WhatsApp por 3 días.",
  "Envía un audio cantando: 'Un pato que va cantando alegremente cua cua 🦆'.",
  "Envía a tu ex: 'Todavía me gustas'.",
  "Envía un audio diciendo: 'Amo a The Shadow Brokers - Bot'.",
  "Dile a tu crush que le amas y envía captura al grupo.",
  "Envía un audio cantando.",
  "Envía una foto tuya sin taparte la cara.",
  "Envía un video bailando.",
  "Tómate una selfie con desconocidos y envíala al grupo.",
  "Envía 'Estoy embarazad@' a contactos aleatorios.",
  "Mezcla una bebida cercana con chile y bébela. (¡Cuidado!)",
  "Llama a un contacto aleatorio y dile 'te amo'.",
  "Compra lo más barato en una tienda y di llorando a otros: 'Esta es la comida más cara que he comprado'.",
  "Compra una Coca-Cola y rocía flores con ella en público.",
  "Con los ojos cerrados, elige comida del refrigerador y cómela con los ojos aún cerrados.",
  "En medio de una cancha, grita: '¡TE AMO MI PRÍNCIPE/PRINCESA!'.",
  "Haz una reverencia a alguien y di: 'Estoy a su servicio, Majestad'.",
  "Camina aplaudiendo y cantando 'Feliz cumpleaños' por un pasillo.",
  "Arrodíllate y di '¿Te casas conmigo?' a la primera persona que entre a la habitación.",
  "Haz un sombrero ridículo con papel y posa para fotos.",
  "Dile a la persona que consideres más bonita de la clase: 'ERES HERMOSA/O, NO MIENTAS'.",
  "Dile a alguien: 'Me dijeron que éramos gemelos separados y me operé. Es en serio'.",
  "Tira el cuaderno de alguien a la basura (con su permiso previo) diciendo: 'Este libro nadie lo entiende'.",
  "¡Arráncate 3 pelos de la pierna!",
  "Chatea con tus padres diciéndoles que los extrañas con emojis tristes.",
  "Busca en Google 'tripofobia' u otras cosas raras/terroríficas (bajo tu propio riesgo).",
  "Relájate en medio de una cancha como si fuera una playa.",
  "Llena tu boca de agua y aguanta dos rondas sin reírte ni tragarla.",
  "Saluda al primero que entre a la habitación diciendo: '¡Bienvenido a Quién Quiere Ser Millonario!'.",
  "Envía a tus padres: '¡Hola, hermano! ¡Compré la nueva Playboy!'.",
  "Envía a tus padres: 'Mamá, papá, sé que soy adoptado. No lo oculten más'.",
  "Envía a tres contactos aleatorios: 'Me convertí en modelo de Playboy'.",
  "¡Come una cucharada de salsa de soya dulce y salsa picante!",
  "Come algo sin usar las manos.",
  "Enojate con amigos que no llegaron a una cita de 'Verdad o Reto'.",
  "¡Rompe un huevo con tu cabeza! (Con cuidado).",
  "Come una mezcla extraña de alimentos (asegúrate que no sea dañino).",
  "Baila como un grupo K-Pop frente a la clase.",
  "Iza un asta sin bandera.",
  "Describe a la persona que te gusta, a tus amigos cercanos o a un desconocido del sexo opuesto.",
  "Copia los peinados de tus amigos.",
  "Canta 'Hakuna Matata' en público mientras bailas.",
  "Canta 'Baby Shark' en voz alta en clase.",
  "Pide algo prestado a tus vecinos.",
  "Pide la firma de un profesor estricto diciendo: 'Usted es la persona que más admiro'.",
  "Pide dinero en la calle diciendo: 'No tengo para el autobús'.",
  "Bebe una mezcla acordada (no peligrosa), como jarabe con salsa de soya.",
  "Habla con la persona que te gusta usando solo emojis de miedo.",
  "Canta tu canción de Disney favorita afuera de tu casa gritando.",
  "Nombra colores del 1 al 20 rápidamente sin equivocarte. Si fallas, repite.",
  "Ponte una corona de papel y di a todos: 'HONOR AL REY', señalándolos con una regla.",
  "Usa tus pantalones al revés hasta mañana.",
  "Abraza a la persona que menos te agrade en clase y di: 'Gracias por ser la mejor persona para mí'.",
  "Corre en un campo amplio gritando: '¡Estoy loco, estoy loco!'.",
  "Regala una flor a un desconocido del sexo opuesto.",
  "Dile a un desconocido en la calle: 'No sabes lo hermoso/a que eres'.",
  "Finge estar poseído por un animal.",
  "Intenta silbar con la boca llena de comida.",
  "Actúa como mesero para tus amigos durante el almuerzo.",
  "Usa calcetines como guantes.",
  "Usa el sombrero más raro o un casco absurdo en la siguiente ronda.",
  "Llama a tu mamá y dile: 'Mamá, quiero casarme ya'.",
  "Llama a tu ex y dile: 'Te extraño'.",
  "Intercambia ropa con la persona más cercana hasta la siguiente ronda.",
  "Actualiza tu estado de WhatsApp solo con palabras que empiecen con 'S'.",
  "Sube un video tuyo cantando una canción popular a YouTube.",
  "Pinta tus uñas de manos y pies de diferentes colores por una semana.",
  "Come 2 cucharadas de arroz sin acompañamiento.",
  "Envía el emoji '🦄💨' cada vez que escribas en un grupo durante 1 día.",
  "Di '¡Bienvenido a Quién Quiere Ser Millonario!' en todos tus grupos de WhatsApp.",
  "Canta el coro de la última canción que escuchaste.",
  "Envía un audio a tu ex/crush/novio/a: 'Hola (nombre), quiero llamarte un momento. Te extraño 🥺👉🏼👈🏼'.",
  "Dile a desconocidos: 'Me dijeron que éramos gemelos, nos separaron y me operé. Es en serio'.",
  "¡Haz una rima para el primer jugador!",
  "Cuenta algo vergonzoso que te haya pasado.",
  "Cambia tu nombre a 'Soy Gay' por 24 horas (si te sientes cómodo/a).",
  "¡Describe tu tipo de pareja ideal!",
  "Di 'Estoy enamorado de ti, ¿quieres ser mi novio/a?' al último contacto del sexo opuesto con quien chateaste. Espera su respuesta.",
  "Habla con tu ex por WhatsApp y dile 'Te amo, por favor vuelve'. Envía captura como prueba."
];

// Added the reply here so it uses the updated global.bucin
handler.setExecute(async (m, { conn }) => {
  conn.reply(m.chat, `*┏━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┓*\n\n❥ *"${pickRandom(global.bucin)}"*\n\n*┗━_͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡⚘-͜͡-͜͡-͜͡-͜͡-͜͡-͜͡_͜͡━┛*`, m, rcanal);
});
