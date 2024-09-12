import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command{
	constructor(bot:Telegraf<IBotContext>) {
		super(bot);
	}
	
	handle(): void {
		this.bot.start((ctx) => {
			ctx.reply("Привет, чтобы запустить приложение с AI-питомцем нажмите на кнопку ниже!", Markup.inlineKeyboard([
				Markup.button.webApp("Открыть Mini App", "https://themixreality.com")
			]));
		});
	}

}