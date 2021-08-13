const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'intro',
	description: 'Emmits when guild member adds',
	execute(message) {
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Tama')
			.setURL('https://discord.js.org/')
			.setAuthor('Chhiring', 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 'https://discord.js.org')
			.setDescription('If I survive but couldn\'t protect what was important to me, then I might as well be dead.')
			.setThumbnail('https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80')
			.addFields(
				{ name: 'Introduction', value: 'Tama is a maidroid working at Otose\'s Snack House. She is often tasked to collect rent from Gintoki by Otose when she isn\'t working.' },
				// { name: '\u200B', value: '\u200B' },
				{ name: 'Race', value: 'Robot', inline: true },
				{ name: 'Status', value: 'Active', inline: true },
				{ name: 'Gender', value: 'Female', inline: true },
			)
			// .addField('Inline field title', 'Some value here', true)
			.setImage('https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80')
			.setTimestamp()
			.setFooter('I promised, didn\'t', 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80');

		message.channel.send(embed);
	},
};