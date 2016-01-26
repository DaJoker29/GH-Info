/*
    Github: jQuery plugin
 */
(function($) {
    $.fn.github = function(options) {
        // Parameters
        var settings = $.extend({
            // required parameters
            owner: null,
            repo: null,
            // display parameters (optional)
            showDesc: true,
            showOwnerName: true,
            showRepoName: true,
            showVersion: true,
            showCommits: true,
            showContributors: true,
            showStars: true,
            showWatched: true,
            showForks: true,
            showLanguages: true,
            showLastUpdated: true,
            // link parameters (optional)
            linkRepo: true,
            linkOwner: true,
            linkVersion: true
        }, options);
        // Variables
        var root = "https://api.github.com";
        var repos = "/repos/";
        var that = this;
        // Build DOM
        function buildDOM(data) {
            var el = $("<div></div>");
            // Repository Name
            if (settings.showRepoName) {
                var repo = settings.linkRepo ? "<a>" : "<span>";
                $(repo).attr("href", data.html_url).text(data.name).appendTo(el);
            }
            // Owner Name
            if (settings.showOwnerName) {
                if (settings.showRepoName) {
                    $("<span>").text(" by ").appendTo(el);
                }
                var owner = settings.linkOwner ? "<a>" : "<span>";
                $(owner).attr("href", data.owner.html_url).text(data.owner.login).appendTo(el);
            }
            // Description
            if (settings.showDesc) {
                $("<p>").text(data.description).appendTo(el);
            }
            // Last Updated
            if (settings.showLastUpdated) {
                $("<span>").text(data.updated_at.toString().slice(0, 10)).appendTo(el);
            }
            // Forks
            if (settings.showForks) {
                $("<span>").text(data.forks_count).appendTo(el);
            }
            // Stars
            if (settings.showStars) {
                $("<span>").text(data.stargazers_count).appendTo(el);
            }
            // Watchers
            if (settings.showWatched) {
                $("<span>").text(data.watchers).appendTo(el);
            }
            /*

                STILL NEED TO ADD LANGUAGES and WATCHERS.

             */
            // Version
            if (settings.showVersion) {
                $.ajax({
                    url: root + repos + settings.owner + "/" + settings.repo + "/releases/latest",
                    success: function(data) {
                        var version = settings.linkVersion ? "<a>" : "<span>";
                        $(version).attr("href", data.html_url).text(data.tag_name).appendTo(el);
                    },
                    error: function() {
                        console.log("No Releases for " + settings.repo);
                    }
                });
            }
            // Commits (in the last year)
            if (settings.showCommits) {
                $.ajax({
                    url: root + repos + settings.owner + "/" + settings.repo + "/stats/commit_activity",
                    success: function(data) {
                        // Set Counter
                        var total = 0;
                        // Count Commits
                        data.forEach(function(e) {
                            total += e.total;
                        });
                        // Add to DOM
                        $("<span>").text(total).appendTo(el);
                    },
                    error: function() {
                        console.log("No Commits Returned for " + settings.repo);
                    }
                });
            }
            // Contributors
            if (settings.showContributors) {
                $.ajax({
                    url: root + repos + settings.owner + "/" + settings.repo + "/stats/contributors",
                    success: function(data) {
                        $("<span>").attr("href", data.html_url).text(data.length).appendTo(el);
                    },
                    error: function() {
                        console.log("No Contributors Found for " + settings.repo);
                    }
                });
            }
            // Watchers
            if (settings.showWatched) {
                $.ajax({
                    url: root + repos + settings.owner + "/" + settings.repo + "/stats/contributors",
                    success: function(data) {
                        $("<span>").attr("href", data.html_url).text(data.length).appendTo(el);
                    },
                    error: function() {
                        console.log("No Contributors Found for " + settings.repo);
                    }
                });
            }
            return el;
        }
        // Get Data
        function fetchData(data) {}
        // Fetch Data
        $.ajax({
            url: root + repos + settings.owner + "/" + settings.repo
        }).done(function(data) {
            console.log(data);
            that.append(buildDOM(data));
        });
        return this;
    };
})(jQuery);
//# sourceMappingURL=script.js.map