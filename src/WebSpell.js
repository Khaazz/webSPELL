'use strict';

import AxonClient from 'axoncore';

import * as modules from './modules/index';

/**
 * Example - Client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends {AxonCore.AxonClient}
 */
class WebSpell extends AxonClient {
    constructor(token, options, config) {
        super(token, options, config, modules);
    }

    initStaff() {
        this.staff.manager = [];
    }

    /** CURRENTLY DISABLED */
    init() {
        return new Promise((resolve, reject) => {
            try {
                this.client.once('ready', () => this.modules.get('Rss').APIHandler.init());
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    sendFullHelp(msg) {
        return this.AxonUtils.sendMessage(msg.channel, {
            embed: {
                author: {
                    name: this.client.user.username,
                    url: 'https://webspell.fr',
                    icon_url: this.client.user.avatarURL,
                },
                title: 'Message d\'aide',
                url: 'https://webspell.fr',
                description: 'WebSPELL - un bot multi fonction pour le réseau WebSPELL.\nSuivez l\'actualité des sites du réseau WebSPELL simplement!',
                fields: [
                    {
                        name: 'RSS',
                        value: '`//rss enable <site> <#channel>`\n`//rss disable <site>`\n`//rss list`\n`//rss role <site>`\n`//rss push <list>`',
                    },
                    {
                        name: 'Liste des sites',
                        value: '<:splashtoon:481835135734382613> `splashtoon.fr`\n<:nintendoz:481835219733839882> `nintendoz.fr`\n<:xbox:479594781425532928> `xbox`\n<:playstation:479594780939255818> `playstation`\n<:paladins:479594780943187968> `paladins`\n<:fortnite:481853380382294022> `fortnite`\n<:steam:481839393410252800> `steam`\n<:ubisoft:481854145356365825> `ubisoft`\n<:overwatch:482583961483345950> `overwatch`\n<:nintendo:481840308641071104> `nintendo`\n<:vakarm:483570930342428672> `vakarm`',
                    },
                    {
                        name: 'Gestion',
                        value: '`//prefix <prefix>` - changer de prefix\n`//botnick <nickname>` - changer le nickname du bot',
                    },
                    {
                        name: 'Serveur de Support',
                        value: 'https://discord.gg/49sApBV',
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: 'Runs with AxonCore(https://github.com/Khaazz/AxonCore)',
                },
            },
        });
    }

    initStatus() {
        this.client.editStatus(null, {
            name: `webspell.fr | ${this.params.prefix[0]}help`,
            type: 3,
        });
    }
}

export default WebSpell;
