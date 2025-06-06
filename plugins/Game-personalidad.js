var handler = async (m, { conn, command, text }) => {

if (!text) return conn.reply(m.chat, '🚩 Ingresa un nombre:\n\nEjemplo: !personalidad Ai Yaemori', m, rcanal, )

let personalidad = `> Nombre: ${text}
> Buena Moral: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Mala Moral: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Tipo de Persona: ${pickRandom(['De buen corazón','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde','Entrometido','Sensible','No Binarie'])}
> Siempre está: ${pickRandom(['Pesado','De malas','Distraído','Molestando','Chismoso','De compras','Viendo anime','Chateando en WhatsApp (soltero/a)','Descansando','Coqueteando','En el celular'])}
> Inteligencia: ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Morosidad: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Coraje: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Miedo: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Fama: ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98.3%','99.7%','99.9%','1%','2.9%','0%','0.4%'])}
> Género: ${pickRandom(['Hombre', 'Mujer', 'Gay/Lesbiana', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Macho Alfa', 'Mujer Fuerte', 'Tomboy', 'PlayStationSexual'])}`

conn.reply(m.chat, personalidad, m, rcanal, )

}
handler.help = ['personalidad']
handler.tags = ['fun']
handler.command = ['personalidad']

handler.register = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}
