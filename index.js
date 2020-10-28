/*
 * Copyright (c) 2020 Bowser65
 * Licensed under the Open Software License version 3.0
 */

const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { React, getModuleByDisplayName } = require('powercord/webpack');
const TwitterEmbed = require('./TwitterEmbed');

module.exports = class BetterTwitterEmbeds extends Plugin {
  async startPlugin () {
    this.loadStylesheet('style.css');
    const Embed = await getModuleByDisplayName('Embed');

    inject('bte-embed', Embed.prototype, 'render', function (_, res) {
      const { embed } = this.props;
      if (embed.footer?.text === 'Twitter' && embed.url?.startsWith('https://twitter.com') && !embed.rawTitle) {
        return React.createElement(TwitterEmbed, {
          childrenImages: this.renderMedia(),
          embed
        });
      }
      return res;
    });
  }

  pluginWillUnload () {
    uninject('bte-embed');
  }
};
