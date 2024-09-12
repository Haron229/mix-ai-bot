import { Telegraf } from "telegraf";
import { IConfigService } from "./config/config.interfce";
import { ConfigService } from "./config/config.service";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";

// import ngrok from "@ngrok/ngrok";

class Bot {
	bot: Telegraf<IBotContext>;
	commands: Command[] = [];

	constructor(private readonly configService: IConfigService) {
		this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
	}
	
	init() {
		this.commands = [new StartCommand(this.bot)];
		for (const command of this.commands) {
			command.handle();
		}
		this.bot.launch();
	}
}

const config = new ConfigService();
const bot = new Bot(config);
bot.init();

// ngrok.connect({ addr: 3000, authtoken: config.get("NGROK")})
// 	.then(listener => {
// 		const bot = new Bot(config);
// 		bot.init(listener.url() as string);

// 		console.log(`Ingress established at: ${listener.url()}`);
// 	});