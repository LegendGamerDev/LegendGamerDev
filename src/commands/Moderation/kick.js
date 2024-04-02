const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick') // Naam van de command
        .setDescription('This command kick a server member') // Beschrijving van de Command
        .addUserOption(option => option.setName('target').setDescription('The user you would like to kick')) // De persoon die de staff wilt kicken
        .addStringOption(option => option.setName('reason').setDescription('The user for kicking the user.')), // De reden hoezo je persoon wilt kicken
    async execute(interaction, client) {
        // Kick User Code!
        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        const channel = interaction.channel;
        // Als de persoon geen perms heeft, Moet tie zijn perms krijgen als staff!
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You must have Kick Members permission to use this command", ephemeral: true });
        if (!kickMember) return await interaction.reply({ content: 'The user mentioned is no longer within the server', ephemeral: true });
        if (!kickMember.kickable) return await interaction.reply({ content: "I cannot kick this user because they have roles above me or you", ephemeral: true });

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given.";

        const dmEmbed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark: You have been kicked from ${interaction.guild.name} | ${reason}, | If you want to get back to server use this invite! {https://discord.gg/KUH6stqT} `)

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`:white_check_mark: ${kickUser.tag} has been **kicked** | ${reason}`)

        await kickMember.send({ embeds: [dmEmbed] }).catch(err => {
            return
        });

        await kickMember.kick({ reason: reason }).catch(err => {
            interaction.reply({ content: "There was an error", ephemeral: true });
        });

        await interaction.reply({ embeds: [embed] });
    }
} 