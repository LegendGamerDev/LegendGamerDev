const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('This is help command!'),
    async execute(interaction, client) {

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Help Center")
            .setDescription(`Help command Guide:`)
            .addFields({ name: "Page 1", value: "Help & Resources (button1)" })
            .addFields({ name: "Page 2", value: "Community Commands (button2)" })
            .addFields({ name: "Page 3", value: "Moderation Commands (button3)" })

        const embed2 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Community Commands")
            .addFields({ name: "/help", value: "Do /help for the commands list & support" })
            .addFields({ name: "/invites", value: "Do /invites to get a user invites" })
            .addFields({ name: "/test", value: "Do /test to check if the bot is working!" })
            .setFooter({ text: "Community Commands" })
            .setTimestamp()

        const embed3 = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Moderation Commands")
            .addFields({ name: "/clearwarn", value: "Do /help for the commands list & support" })
            .addFields({ name: "/purge", value: "This purge channel messages" })
            .addFields({ name: "reactionroles", value: "This sends a reaction role message" })
            .addFields({ name: "/steal", value: "Adds emoji to the server" })
            .addFields({ name: "/ticket", value: "This sends a ticket message" })
            .addFields({ name: "verify", value: "This verifies a server member" })
            .addFields({ name: "verify2", value: "This send a Verification message" })
            .addFields({ name: "/warn", value: "This warns a server member" })
            .addFields({ name: "/warnings", value: "This gets a server members warnings" })
            .setFooter({ text: "Community Commands" })
            .setTimestamp()

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`page1`)
                    .setLabel(`page1`)
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId(`page2`)
                    .setLabel(`page2`)
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId(`page3`)
                    .setLabel(`page3`)
                    .setStyle(ButtonStyle.Success),
            )

        const message = await interaction.reply({ embeds: [embed], components: [button] });
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i => {

            if (i.customId === 'page1') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true })
                }
                await i.update({ embeds: [embed], components: [button] })
            }

            if (i.customId === 'page2') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true })
                }
                await i.update({ embeds: [embed2], components: [button] })
            }

            if (i.customId === 'page3') {

                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true })
                }
                await i.update({ embeds: [embed3], components: [button] })
            }
        })

    }

}