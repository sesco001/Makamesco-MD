const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "✅",
    desc: "Displays bot owner's contact info",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;

        if (!ownerNumber || !ownerName) {
            return reply("Owner details are missing in config file.");
        }

        const vcard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `FN:${ownerName}`,
            `TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}`,
            'END:VCARD'
        ].join('\n');

        // Send vCard contact
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send owner details with image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/degy3b.jpg' },
            caption:
`╭─〔 *OWNER* 〕─╮
│ 👤 ${ownerName}
│ ☎️ ${ownerNumber}
│ ⚙️ v2.0.0 Beta
│ 🧠 PEACEMAKER
╰──────────────╯
_Only for important queries._`,
            contextInfo: {
                mentionedJid: [`${ownerNumber.replace('+', '')}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '',
                    newsletterName: 'peace maker',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send voice message
        await conn.sendMessage(from, {
            audio: { url: '' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`An error occurred: ${error.message}`);
    }
});
