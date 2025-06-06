
import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'

// Lista de cuentas de Crunchyroll
const cuentasList = [
    { email: "SuccessfulmissionBK@gmail.com", password: "Grimmjow456", plan: "Mega Fan", expiry: "2025-06-19" },
    { email: "genirogers88@icloud.com", password: "Roman9088", plan: "Mega Fan", expiry: "2025-06-13" },
    { email: "jhon.numbeka@gmail.com", password: "jhon1210", plan: "Fan", expiry: "2025-06-27" },
    { email: "gaurm3952@gmail.com", password: "7518914686", plan: "Fan", expiry: "2025-06-22" },
    { email: "nicomartin.852@gmail.com", password: "pame39699467/", plan: "Mega Fan", expiry: "2025-06-13" },
    { email: "victor.ks.93@hotmail.com", password: "25258vic", plan: "Mega Fan", expiry: "2026-03-15" },
    { email: "Alientoes26@gmail.com", password: "Pickles12!", plan: "Fan", expiry: "2025-07-04" },
    { email: "luhaag1@outlook.com", password: "Dont@edit3?", plan: "Mega Fan", expiry: "2026-04-23" },
    { email: "aw00846@imax.pw", password: "Cq123456@", plan: "Mega Fan", expiry: "2025-12-26" },
    { email: "alarcon.streaming.4.0@gmail.com", password: "CrunchyS404A", plan: "Mega Fan", expiry: "2025-11-07" },
    { email: "treissy.cardenas@hotmail.com", password: "rominacardenas9", plan: "Mega Fan", expiry: "2025-06-27" },
    { email: "zorattv731@gmail.com", password: "Toprak123", plan: "Fan", expiry: "2025-06-06" },
    { email: "fabiomalexviticurro@gmail.com", password: "Vivamalenia02", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "suarezlara236@gmail.com", password: "NarutoeslaperradeGoku1*", plan: "Mega Fan", expiry: "2025-06-18" },
    { email: "bravojonathan312@gmail.com", password: "paulaluna_22A", plan: "Mega Fan", expiry: "2025-06-24" },
    { email: "huzaifamalik1.804@gmail.com", password: "Joker9it", plan: "Mega Fan", expiry: "2025-06-24" },
    { email: "fortnitetest104a@gmail.com", password: "2Constable!", plan: "Fan", expiry: "2025-06-15" },
    { email: "malakmalakkaka30@gmail.com", password: "Malak2007.", plan: "Mega Fan", expiry: "2025-07-05" },
    { email: "maycon.volpee@gmail.com", password: "maycon007", plan: "Mega Fan", expiry: "2025-06-10" },
    { email: "peperalta2012@gmail.com", password: "Peralta2002!", plan: "Mega Fan", expiry: "2025-08-22" },
    { email: "soyunestafadorminumeroes997777721@gmail.com", password: "Soyunarata997777721", plan: "Mega Fan", expiry: "2025-12-04" },
    { email: "chrislv077@gmail.com", password: "OnePieceReal123321", plan: "Mega Fan", expiry: "2025-06-14" },
    { email: "jaydinshuck14@outlook.com", password: "MyKidsLuv214", plan: "Ultimate Fan", expiry: "2025-06-21" },
    { email: "vandohbpaiva@gmail.com", password: "Giovanne1979", plan: "Fan", expiry: "2025-06-21" },
    { email: "Gercekkanat@gmail.com", password: "123Kere123..", plan: "Mega Fan", expiry: "2025-11-28" },
    { email: "listenhlayiseko2@gmail.com", password: "Jesusoursaver123", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "killiamswuke@gmail.com", password: "coolkid123", plan: "Mega Fan", expiry: "2026-06-04" },
    { email: "catschatten@gmail.com", password: "01732886702Viki", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "louisonhemart06@icloud.com", password: "LouisonZelia", plan: "Fan", expiry: "2026-03-28" },
    { email: "skillstudywith@gmail.com", password: "Skrieds@20402040", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "vitorrei1276@gmail.com", password: "heliaelisa00", plan: "Mega Fan", expiry: "2025-07-02" },
    { email: "stephen_champion@att.net", password: "Westside1$", plan: "Mega Fan", expiry: "2025-06-11" },
    { email: "Mauritoped@hotmail.com", password: "623248q", plan: "Fan", expiry: "2025-06-13" },
    { email: "elizabethelaine02@gmail.com", password: "Faith-1234", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "afart6299@gmail.com", password: "Alexlovesdiana111", plan: "Mega Fan", expiry: "2025-07-02" },
    { email: "holmax@gmail.com", password: "M@x84029075", plan: "Fan", expiry: "2025-06-15" },
    { email: "eduardomoreira5@gmail.com", password: "85256550", plan: "Mega Fan", expiry: "2025-06-13" },
    { email: "movfabs+16a@gmail.com", password: "331702crunchy", plan: "Mega Fan", expiry: "2025-09-04" },
    { email: "doubleotx22@gmail.com", password: "cctriage22!", plan: "Fan", expiry: "2025-06-23" },
    { email: "bestinbaja@icloud.com", password: "Emizoer", plan: "Mega Fan", expiry: "2025-06-20" },
    { email: "mederaf5@gmail.com", password: "kaze1212", plan: "Mega Fan", expiry: "2025-07-01" },
    { email: "hussaintt.26@gmail.com", password: "hussain13951395@@", plan: "Mega Fan", expiry: "2025-06-27" },
    { email: "vignesh131.vv@gmail.com", password: "qwerty", plan: "Mega Fan", expiry: "2025-06-08" },
    { email: "propleierb@gmail.com", password: "belisa25#", plan: "Fan", expiry: "2025-06-29" },
    { email: "williryan00@gmail.com", password: "Ryan@98193302", plan: "Fan", expiry: "2025-06-15" },
    { email: "mariolalacaracola@gmail.com", password: "Ninaeslaluna4516", plan: "Mega Fan", expiry: "2025-06-08" },
    { email: "lolita181058luchito@gmail.com", password: "carlos130201", plan: "Mega Fan", expiry: "2025-06-21" },
    { email: "gutinhoplays008@gmail.com", password: "CCbb1212", plan: "Mega Fan", expiry: "2026-05-02" },
    { email: "rahulkrishnamangalath@gmail.com", password: "rmrcrunchy1", plan: "Mega Fan", expiry: "2025-06-10" },
    { email: "matthiasgeorgschulz@outlook.de", password: "8g.EyA-yP{", plan: "Mega Fan", expiry: "2026-04-20" },
    { email: "boivinmatthew679@gmail.com", password: "K_XLzaswa=lsIG$tho7AChOT?*Sp*fR+TR+D7es#9D!KO8ibl#8+8P2*HUB&$lDr", plan: "Mega Fan", expiry: "2025-06-20" }
]

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Verificar si hay cuentas disponibles
        if (cuentasList.length === 0) {
            return m.reply('❌ No hay cuentas disponibles en este momento.')
        }

        // Verificar si el usuario existe en la base de datos
        let user = global.db.data.users[m.sender]
        if (!user) {
            global.db.data.users[m.sender] = {
                exp: 0,
                money: 0,
                level: 0
            }
            user = global.db.data.users[m.sender]
        }

        // Verificar si el usuario tiene suficiente dinero
        const costo = 2000000
        if (user.money < costo) {
            return m.reply(`❌ No tienes suficiente dinero para generar una cuenta.\n\n💰 *Costo:* ${costo.toLocaleString()} monedas\n💳 *Tu dinero:* ${user.money.toLocaleString()} monedas\n\n¡Necesitas ${(costo - user.money).toLocaleString()} monedas más!`)
        }

        // Cobrar al usuario
        user.money -= costo

        // Seleccionar una cuenta aleatoria
        const randomIndex = Math.floor(Math.random() * cuentasList.length)
        const cuenta = cuentasList[randomIndex]

        // Crear función para actualizar barra de progreso
        const crearBarraProgreso = (porcentaje) => {
            const barLength = 20
            const filled = Math.floor((porcentaje / 100) * barLength)
            const empty = barLength - filled
            const bar = '█'.repeat(filled) + '░'.repeat(empty)
            return `[${bar}] ${porcentaje}%`
        }

        // Mostrar 5 barras de carga progresivas
        const loadingMsg = await m.reply('🔄 Generando cuenta premium...\n\n' + crearBarraProgreso(0))

        for (let barra = 1; barra <= 5; barra++) {
            for (let progreso = 0; progreso <= 100; progreso += 10) {
                const mensajeCarga = `🔄 Procesando datos... (${barra}/5)\n\n${crearBarraProgreso(progreso)}`
                
                try {
                    await conn.sendMessage(m.chat, { text: mensajeCarga, edit: loadingMsg.key })
                } catch (e) {
                    // Si falla la edición, continuar
                }
                
                // Esperar un poco para simular carga
                await new Promise(resolve => setTimeout(resolve, 200))
            }
            
            // Pausa entre barras
            if (barra < 5) {
                await new Promise(resolve => setTimeout(resolve, 500))
            }
        }

        // Mensaje final de éxito
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Crear el mensaje con la información de la cuenta
        const mensaje = `
╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃       🍥 *CRUNCHYROLL PREMIUM* 🍥       ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

✅ *Generación completada exitosamente*

📧 *Email:* ${cuenta.email}
🔑 *Contraseña:* ${cuenta.password}
📋 *Plan:* ${cuenta.plan}
📅 *Vence:* ${cuenta.expiry}

💰 *Costo:* ${costo.toLocaleString()} monedas
💳 *Dinero restante:* ${user.money.toLocaleString()} monedas

⚠️ *Importante:*
• No cambies los datos de la cuenta
• Úsala solo para ver anime
• No compartas con otros
• Disfruta responsablemente

╭━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╮
┃      ¡Disfruta tu anime! 🎌🍿      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

Power by 💖💝 Y⃟o⃟ S⃟o⃟y⃟ Y⃟o⃟ 💝 💖`

        // Enviar la cuenta al usuario
        try {
            await conn.sendMessage(m.chat, { text: mensaje, edit: loadingMsg.key })
        } catch (e) {
            // Si falla la edición, enviar mensaje nuevo
            await m.reply(mensaje)
        }

        // Opcional: Remover la cuenta de la lista para evitar duplicados
        // cuentasList.splice(randomIndex, 1)

        // Log para el propietario
        console.log(`[CUENTA ENVIADA] Usuario: ${m.sender} | Email: ${cuenta.email} | Pagó: ${costo}`)

    } catch (error) {
        console.error('Error en el comando cuentas:', error)
        m.reply('❌ Ocurrió un error al generar la cuenta. Inténtalo de nuevo.')
    }
}

handler.help = ['cuenta', 'cuentas', 'freecuenta']
handler.tags = ['tools']
handler.command = /^(cuenta|cuentas|freecuenta|generarcuenta)$/i
handler.register = false

export default handler
