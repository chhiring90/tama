const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(message) {
		let general = null;
		message.channels.cache.forEach(element => {
			if (element.name === 'general') general = element;
		});

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.addFields(
				{ name: 'Introduction', value: 'Beep Boop Tama is ready to roll.' },
			)
			// .addField('Inline field title', 'Some value here', true)
			.setImage('https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80')
			.setTimestamp()
			.setFooter('I promised, didn\'t', 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80');

		console.log('BeepBoop Tama is Ready to Roll');
		general.messages.channel.send(embed);
	},
};