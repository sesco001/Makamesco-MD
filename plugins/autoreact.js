const config = require('../config');
const { cmd } = require('../command');

cmd({ on: 'command', pattern: 'autoreact' }, async (conn, mek, m, { from, sender, args }) => {
  const botNumber = await conn.decodeJid(conn.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(sender);

  if (!isCreator) {
    return m.reply("*📛 THIS IS AN OWNER COMMAND*");
  }

  const text = args[0]?.toLowerCase();
  let responseMessage;

  if (text === 'on') {
    config.AUTO_REACT = true;
    responseMessage = "AUTO_REACT has been enabled.";
  } else if (text === 'off') {
    config.AUTO_REACT = false;
    responseMessage = "AUTO_REACT has been disabled.";
  } else {
    responseMessage = "Usage:\n- `autoreact on`: Enable Auto-React\n- `autoreact off`: Disable Auto-React";
  }

  try {
    await conn.sendMessage(from, { text: responseMessage }, { quoted: mek });
  } catch (error) {
    console.error("Error processing your request:", error);
    await conn.sendMessage(from, { text: 'Error processing your request.' }, { quoted: mek });
  }
});
