module.exports = {
	name: 'prune',
	description: 'prune!',
	execute(message, args) {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply('that doesnot seems to be a valid number.');
		} else if (amount < 2 || amount > 100) {
			return message.reply('You need to input a number between 2 and 100');
		}

		message.channel.bulkDelete(amount, true)
			.then(() => message.reply(`No of ${amount} message deleted successfully!!`))
			.catch(err => {
				console.error(err);
				message.channel.reply('There was error trying to pruue message in this channel!');
			});
	},
};