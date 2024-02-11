const express = require("express");
const { Client, MessageEmbed } = require("discord.js-selfbot");
const app = express();
const config = require('./config.json');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("db");

const Discord = require("discord.js-selfbot");
const client = new Discord.Client();
const data = new Map();
const chalk = require("chalk");
const DiscordRPC = require("discord-rpc");

const rpcclientid = "876153252083798097";
const rpc = new DiscordRPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
    console.log(chalk.blue("Discord RPC Started!"));

    rpc.setActivity({
        details: "Selam",
        state: `Aktif`,
        startTimestamp: new Date(),
        largeImageKey: "logo",
        largeImageText: `v0.1`,
        instance: false,
        buttons: [
            {
                label: "Fiçuuuw",
                url: "https://turksigara.net/",
            },
        ],
    });
});

DiscordRPC.register(rpcclientid);
rpc.login({ clientId: rpcclientid }).then(() => {
    console.log("Discord RPC successfully logged in!");
}).catch((error) => {
    console.error("Error logging in Discord RPC:", error);
});

client.on("ready", () => {
    console.log(`${client.user.username} ismi ile giriş yapıldı!`);
    db.get("owodg") == "1" ? console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Bot Durduruldu`)) : console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Bot Açıldı`))
    db.get("batt") == "1" ? console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Otobattle Kapalı`)) : console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Otobattle Açık`));
    db.get("otosell") == "1" ? console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Otosell Kapalı`)) : console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Otosell Açık`));
    db.get("otopray") == "1" ? console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] OtoPray Kapalı`)) : console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] OtoPray Açık`));
    console.log(chalk.cyan("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.cyan(`] Captcha Koruması Açık`));
    client.user.setPresence({
        activity: {
            name: 'Çocuk İşçi',
            type: 'PLAYING', // 'PLAYING', 'WATCHING', 'LISTENING', 'STREAMING'
        },
        status: 'online' // 'online', 'idle', 'dnd', 'invisible'
    });
    // client.on("message", message => {
    //     message.channel.send(`owo daily`)
    // });
    // console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Günlük ödül alındı!`);
});


let sent = [];
client.on("message", async(msg) => {

    if (msg.channel.type === "dm") {
        if (msg.author.id === client.user.id) {} else {
            if (msg.author.bot) {} else {
                let kontrol = await data.get(msg.author.id);

                if (kontrol === 1) {}
            }
        }
    }
});
var huntsayi = 0
client.on("ready", () => {
    setInterval(() => {
        if (db.get("owodg") != "1") {
            let msg = client.channels.cache.get(config.kanal);

            msg.send("owo hunt");
            huntsayi++;
            console.log(chalk.redBright("[")+ chalk.grey(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)+ chalk.redBright(`] Hunt atıldı!`));
            // console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Hunt atıldı!`);
            // db.set("hunt",huntsayi);
        };
    }, 35000); //50000
});

var battlesayi = 0
client.on("ready", () => {
    setInterval(() => {
        if (db.get("owodg") != "1") {
            if (db.get("batt") != "1") {
                let msg = client.channels.cache.get(config.kanal);

                msg.send("owo battle");
                battlesayi++;

                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Battle atıldı!`);
                //db.set("battle",battlesayi);
            };
        };
    }, 120000);
});

client.on("ready", () => {
    setInterval(() => {
        if (db.get("owodg") != "1") {
            if (db.get("otosell") != "1") {
                let msg = client.channels.cache.get(config.kanal);

                msg.send("owo sell all");
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Petler Satıldı!`);
            };
        };
    }, 300000);
});

var praysayi = 0
client.on("ready", () => {
    setInterval(() => {
        // if (db.get("owodg") != "1") {
            if (db.get("otopray") != "1") {
                let msg = client.channels.cache.get(config.otopraykanal);

                msg.send(`owo pray <@` + config.otoprayid + '>')
                praysayi++;

                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Pray atıldı!`);
            };
        // };
    }, 330000);
});
client.on("message", message => {
    if (message.channel.id == config.kanal || message.channel.type == "dm") {
        if (message.author.id == "408785106942164992") {
            if (message.content.includes("Beep Boop") || message.content.includes("Please DM me") || message.content.includes("check")) {
                db.set("owodg", "1");
                client.channels.cache.get(config.kanal).send("Durduruldu açmak için !dogrula <captcha_kodu>");
                client.users.cache.get(config.owner).send(`:warning: Doğrulama kodu geldi!`)
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Doğrulama Kodu Geldi!`);
            };
        };
    };
    //doğrulandı
    if (message.channel.id == config.kanal || message.channel.type == "dm") {
        if (message.author.id == "408785106942164992") {
            if (message.content.includes("Thank you! :3")) {
                db.set("owodg", "0");
                client.channels.cache.get(config.kanal).send("Doğrulandı!");
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Doğrulandı!`);
            };
        };
    };

    //açıldı
    if (message.author.id == config.owner) {
        if (message.content == "!aç") {
            db.set("owodg", "0");
            message.channel.send(":white_check_mark: | Açıldı \n:x: | Kapatmak için !kapat ");
            // console.log("Acıldı");
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Bot Açıldı!`);
        };
    };
    //kapatıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!kapat") {
                db.set("owodg", "1");
                message.channel.send(":x: | Kapatıldı\n:white_check_mark: | açmak için !aç ");
                // console.log('Kapatıldı');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Bot Kapatıldı!`);
            };
        };
    };

    //battle açıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otobattle-aç") {
                db.set("batt", "0");
                message.channel.send(":white_check_mark: | otobattle Aktif \n:x: | Kapatmak için !otobattle-kapat");
                // console.log("Battle Acıldı");
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Battle Açıldı!`);
            };
        };
    };
    //battle kapatıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otobattle-kapat") {
                db.set("batt", "1");
                message.channel.send(":x: | Battle Kapatıldı \n:white_check_mark: | açmak için !otobattle-aç");
                // console.log('Battle Kapatıldı');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Battle Kapatıldı!`);
            };
        };
    };
    //otosell açıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otosell-aç") {
                db.set("otosell", "0");
                message.channel.send(":white_check_mark: | Otosell açık\n:x: | Kapatmak için !otosell-kapat ");
                // console.log('Otosell Aktif');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Otosell Açıldı!`);
            };
        };
    };
    //otosell kapatıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otosell-kapat") {
                db.set("otosell", "1");
                message.channel.send(":x: | Otosell Kapatıldı\n:white_check_mark: | açmak için !otosell-aç ");
                // console.log('Otosell Kapatıldı');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Otosell Kapatıldı!`);
            };
        };
    };
    //otopray açıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otopray-aç") {
                db.set("otopray", "0");
                message.channel.send(":white_check_mark: | Otopray açık\n:x: | kapatmak için !otopray-kapat");
                // console.log('Otopray Aktif');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Otopray Açıldı!`);
            };
        };
    };
    //otopray kapatıldı
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!otopray-kapat") {
                db.set("otopray", "1");
                message.channel.send(":x: | Otopray kapatıldı\n:white_check_mark: | açmak için !otopray-aç ");
                // console.log('otopray kapatıldı');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Otopray Kapatıldı!`);
            };
        };
    };
    //para gönderme 100k
    if (message.author.id == config.owner) {
        if (message.content == "!give 100k") {
            message.channel.send(`owo give <@` + config.owner + '> 100000')
            // console.log('-10k');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Ana hesaba 100k gönderildi!`);
        };
    };
    //para gönderme 10k
    if (message.author.id == config.owner) {
        if (message.content == "!give 10k") {
            message.channel.send(`owo give <@` + config.owner + '> 10000')
            // console.log('-10k');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Ana hesaba 10k gönderildi!`);
        };
    };
    //para gönderme 1k
    if (message.author.id == config.owner) {
        if (message.content == "!give 1k") {
            message.channel.send(`owo give <@` + config.owner + '> 1000')
            // console.log('-1k');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Ana hesaba 1k gönderildi!`);
        };
    };
    //para kontrol
    if (message.author.id == config.owner) {
        if (message.content == "!money") {
            message.channel.send(`owo cash`)
        };
    };
    //zoo
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!zoo") {
                message.channel.send(`owo zoo`)
                console.log('zoo');
            };
        };
    };
    //sc all
    if (message.author.id == config.owner) {
        if (message.content == "!sc all") {
            message.channel.send(`owo sc all`)
            console.log('Bütün hayvanlar feda edildi');
        };
    };
    //sell all
    if (message.author.id == config.owner) {
        if (message.content == "!sell all") {
            message.channel.send(`owo sell all`)
            // console.log('Bütün hayvanlar satıldı');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Bütün hayvanlar satıldı!`);
        };
    };
    //inventory
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!inv") {
                message.channel.send(`owo inv`)
                // console.log('Envanter gösterildi');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Envanter gösterildi!`);
            };
        };
    };
    //use <number>
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            const args = message.content.split(' ').slice(0);
            const gem = args.slice(1).join(" ");
            if (message.content == "!use " + gem) {
                message.channel.send(`owo use ` + gem);
                // console.log('Item kullanıldı' + gem);
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Item kullanıldı!` + gem);
                if (!args) {
                    return message.channel.send("Kullanılacak itemın numarasını belirtin.");
                }
            };
        };
    };
    //ah money
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const para = args.slice(2).join(" ");
        const password = args.slice(3).join(" ");
        if (message.content == "!owo ah " + para) {
            message.channel.send(`owo ah ` + para)
            // console.log('AutoHunt başlatılıyor...');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | AutoHunt başlatılıyor...`);
        };
    };
    //ah money password
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const para = args.slice(2).join(" ");
        const password = args.slice(3).join(" ");
        if (message.content == "!owo ah " + para + " " + password) {
            message.channel.send(`owo ah ` + para + " " + password)
            // console.log('AutoHunt başlatıldı.');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | AutoHunt başlatıldı.`);
        };
    };
    //ah
    if (message.author.id == config.owner) {
        if (message.content == "!owo ah") {
            message.channel.send(`owo ah`)
        };
    };
    //lootbox
    if (message.author.id == config.owner) {
        if (message.content == "!lb all") {
            message.channel.send(`owo lb all`)
            // console.log('Kutular açıldı');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Kutular açıldı!`);
        };
    };
    //wc
    if (message.author.id == config.owner) {
        if (message.content == "!wc all") {
            message.channel.send(`owo wc all`)
            // console.log('Silah kutuları açıldı');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Silah kutuları açıldı!`);
        };
    };
    //daily
    if (message.author.id == config.owner) {
        if (message.content == "!daily") {
            message.channel.send(`owo daily`)
            // console.log('Günlük ödül alındı');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Günlük ödül alındı!`);
        };
    };
    //quest
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!quest") {
                message.channel.send(`owo quest`)
                // console.log('Görevler gösterildi');
                console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Görevler gösterildi!`);
            };
        };
    };
    //cookie
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const cookie = args.slice(1).join(" ");
        if (message.content == "!cookie " + cookie) {
            message.channel.send(`owo cookie <@` + cookie + '>')
            // console.log('Kurabiye gönderildi');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Kurabiye gönderildi!`);
        };
    };
    //pray
    // if (message.author.id == config.owner) {
    //     const args = message.content.split(' ').slice(0);
    //     const pray = args.slice(1).join(" ");
    //     if (message.content == "!pray" + pray) {
    //         message.channel.send(`owo pray <@` + pray + '>')
    //         console.log('Pray gönderildi');
    //     };
    // };
    //pray
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const pray = args.slice(1).join(" ");
        if (message.content == "!pray " + pray) {
            message.channel.send(`owo pray <@` + pray + '>')
            // console.log('Pray gönderildi');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Pray gönderildi!`);
        };
    };
    //curse
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const curse = args.slice(1).join(" ");
        if (message.content == "!curse " + curse) {
            message.channel.send(`owo curse <@` + curse + '>')
            // console.log('Curse gönderildi');
            console.log(`[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}] | Curse gönderildi!`);
        };
    };

    //dogrula <captcha_kodu>
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            const args = message.content.split(' ').slice(0);
            const kod = args.slice(1).join(" ");
            if (message.content == "!dogrula " + kod) {
                client.users.cache.get("408785106942164992").send(`${kod}`);
                console.log('Doğrulama kodu: ' + kod);
                if (!args) {
                    return message.channel.send("Kullanılacak itemın numarasını belirtin.");
                }
            }
        };
    };
    //ah upgrade <yükseltilecek_özellik> <essence>
    if (message.author.id == config.owner) {
        const args = message.content.split(' ').slice(0);
        const ozellik = args.slice(2).join(" ");
        if (message.content == "!owo upg " + ozellik) {
            message.channel.send(`owo upgrade ${ozellik}`);
            console.log(ozellik + ' yükseltildi miktar:');
        };
    };
    //durum
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!durum" || message.content == "!durum" || message.content == "!durum") {
                if (db.get("otopray") == 1) {
                    var otoprayak = "kapalı :x: | Açmak için !otopray-aç"
                } else {
                    var otoprayak = "açık :white_check_mark: | Kapatmak için !otopray-kapat"
                }
                if (db.get("batt") == 1) {
                    var batts = "kapalı :x: | Açmak için !otobattle-aç"
                } else {
                    var batts = "açık :white_check_mark: | Kapatmak için !otobattle-kapat"
                }
                if (db.get("otosell") == 1) {
                    var osell = "kapalı :x: | Açmak için !otosell-aç"
                } else {
                    var osell = "açık :white_check_mark: | Kapatmak için !otosell-kapat"
                }
                if (db.get("owodg") == 1) {
                    var bak = "kapalı :x: | Açmak için !aç"
                } else {
                    var bak = "açık :white_check_mark: | Kapatmak için !kapat"
                }
                var kanals = `<#` + config.kanal + '>'
                message.channel.send(`========================\nBot Durumu: **${bak}**\n========================\nPrefix: **!**\n========================\nOtoPray: **${otoprayak}**\n========================\nOtoBattle: **${batts}**\n========================\nOtoSell: **${osell}**\n========================\nKanal: **${kanals}**\n========================`);
            };
        };
    };
    //istatistik
    if (message.author.id == config.owner) {
        if (message.channel.id == config.kanal) {
            if (message.content == "!istatistik") {
                message.channel.send(`========================\n**Owo Hunt** : ${huntsayi} :seedling:\n**Owo Battle** : ${battlesayi} :crossed_swords:\n**Owo Pray** : ${praysayi} :pray:\n========================`)
            };
        };
    };
    //help
    if (message.channel.id == config.kanal) {
        if (message.author.id == config.owner) {
            if (message.content == "!help" || message.content == "!yardım" || message.content == "!yardim") {
                message.channel.send(`**:robot:Bot Komut:robot:**  \n\n **!aç**  botunuzu aktif duruma getirir.\n **!kapat.** botunuzu kapatır.\n **!otosell- <aç/kapat>** botunuzun 8dk da bir bütün hayvanlarını satmasını sağlar.\n **!otobattle- <aç/kapat>** botunuzun 2dk da bir battle atmasını sağlar.\n **!otopray- <aç/kapat>** ana hesabınıza 5dk da bir pray atmanıza yarar.\n **!istatistik** botunuzun istatistiklerini görmenizi sağlar.\n **!dogrula <captcha kodu>** botunuza doğrulama geldiği zaman botunun gönderdiği captcha doğrulama kodunu girerek botunuzu aktif hale getirebiirsiniz.\n\n **:moneybag: Owo Bot Komutları :moneybag:** \n\n **!money** botunuzun para miktarını gösterir. \n **!give <1k/10k/100k>** ile belirtilen miktarda parayı ana hesabınıza yollar.\n **!zoo** botunuzun hayvanlarını gösterir.\n **!sell all** botunuzun bütün hayvanlarını owo cash e çevirirsiniz.\n **!inv** botunuzun envanterine bakarsınız.\n **!sc all** botunuzun hayvanlarını oto hunt parasına çevirir.\n **!use <sayı>** botunuzun envanterinden belirttiğiniz şeyi kullanırsınız.\n **!ah <para> <şifre>** oto huntunuzu açar.\n **!daily** botun günlük ödülünü alırsınız.\n **!cookie** ana hesabınıza cookie yollarsınız.\n **!pray** ana hesabınıza pray yollarsınız.\n **!curse** ana hesabınıza curse yollarsınız.\n **!quest** botun görevlerini açarsınız.\n **!wc all** silah kutularınızı açarsınız.\n **!lb all** kutularınızı açarsınız.`)
                console.log('Yardım menüsü açıldı');
            };
        };
    };
});
client.login(config.token);

//