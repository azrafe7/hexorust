'use strict';


var assign = require('object-assign');

/**
 * Soundcloud tag plugin
 *
 * Author: Andrew Boni
 *
 * Syntax:
 *   {% soundcloud <soundcloud song url> [type of player] %}
 *
 * Description:
 *   Embeds Soundcloud songs from a URL. Comes with an option to use the visual player or the default player. Possible
 *   options are 'visual', 'default', or simply leave it blank.
 *
 * Examples:
 *   {% soundcloud https://soundcloud.com/only-the-beat/3lau-electric-daisy-carnival-edc-new-york-2014 visual %}
 *   {% soundcloud https://soundcloud.com/only-the-beat/3lau-electric-daisy-carnival-edc-new-york-2014 default %}
 *   {% soundcloud https://soundcloud.com/only-the-beat/3lau-electric-daisy-carnival-edc-new-york-2014 %}
 */
hexo.extend.tag.register("soundcloud", function(args) {
    var options, songUrl, soundcloudUrl, type;
    songUrl = args[0];
    type = args[1] || "default";
    soundcloudUrl = "https://w.soundcloud.com/player/?url=" + (encodeURIComponent(songUrl));
    if (type === "visual") {
        options = "visual=true";
    } else if (type === "default") {
        options = "color=ff5500&amp;show_artwork=true";
    } else {
        return "Error: Soundcloud player type option needs to be either <b>visual</b> or <b>default</b>.";
    }
    return "<iframe width='100%' height='160' scrolling='no' frameborder='no' src='" + soundcloudUrl + "&amp;auto_play=false&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;" + options + "'></iframe>";
});