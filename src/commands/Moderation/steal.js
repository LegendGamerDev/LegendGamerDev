const { SlashCommandBuilder } = require('@discordjs/builders');
const { default: axios } = require('axios');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('steal')
        .setDescription('Adds a given emoji to the server')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji you would like to add to the server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name for your emoji')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageEmojisAndStickers)) {
            return await interaction.reply({ content: "You must have the Manage Emojis & Stickers permission to run this command!", ephemeral: true });
        }

        let emoji = interaction.options.getString('emoji').trim();
        const name = interaction.options.getString('name').trim();

       
        if (emoji.startsWith("<") && emoji.endsWith(">")) {
            const emojiId = emoji.match(/\d+/)[0];
            emoji = `https://cdn.discordapp.com/emojis/${emojiId}`;

           
            try {
                await axios.head(`${emoji}.gif`);
                emoji += '.gif';
            } catch (error) {
                emoji += '.png';
            }
        } else {
            
            return await interaction.reply({ content: "You cannot add default (unicode) emojis.", ephemeral: true });
        }

        try {
            const addedEmoji = await interaction.guild.emojis.create({ attachment: emoji, name });
            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setDescription(`Added emoji: ${addedEmoji} with the name "**${name}**".`);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            if (error.code === 30008) {
                await interaction.reply({ content: "You cannot add this emoji because the server has reached its emoji limit!", ephemeral: true });
            } else {
                console.error("Failed to add emoji:", error);
                await interaction.reply({ content: "Failed to add the emoji due to an unexpected error.", ephemeral: true });
            }
        }
    }
};
