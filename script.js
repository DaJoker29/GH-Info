/*
    Github: jQuery plugin
 */
(function($) {
    $.fn.github = function(options) {
        // Parameters
        var settings = $.extend({
            username: null,
            repo: null
        }, options);
        var that = this;
        $.ajax({
            url: "https://api.github.com/repos/" + settings.username + "/" + settings.repo
        }).done(function(data) {
            console.log(data);
            that.append('<a href="' + data.html_url + '"><h2>' + data.name + "</a><small> by " + data.owner.login + "</small></h2>");
            that.append("<p>");
            that.append('<span class="label label-default"> Last Updated: ' + data.updated_at.toString().slice(0, 10) + "</span> ");
            that.append('<span class="label label-warning">' + data.language + "</span> ");
            that.append('<span class="label label-info">' + data.forks_count + " Forks</span> ");
            that.append('<span class="label label-info">' + data.stargazers_count + " Stars</span>");
            that.append("</p>");
            that.append("<p>" + data.description + "</p>");
        });
        return this;
    };
})(jQuery);
//# sourceMappingURL=script.js.map