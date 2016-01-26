/*
    Github: jQuery plugin
 */

(function( $ ) {

    $.fn.github = function( options ) {

        // Parameters
        var settings = $.extend( {
            // required parameters
            'owner': null,
            'repo': null,
            // display parameters (optional)
            'showDesc': true,
            'showOwnerName': true,
            'showRepoName': true,
            'showVersion': true,
            'showCommits': true,
            'showContributors': true,
            'showStars': true,
            'showWatchers': true,
            'showForks': true,
            'showLanguages': true,
            'showLastUpdated': true,
            // link parameters (optional)
            'linkRepo': true,
            'linkOwner': true,
            'linkVersion': true,
            // Configuration options (optional)
            'bootstrap': true
        }, options );

        // Variables
        var root = 'https://api.github.com';
        var repos = '/repos/';
        var that = this;

        // Hide element
        this.hide();

        // Build DOM
        function buildDOM ( data ) {

            var el = $( '<div>' ).addClass( 'gh-main' );
            var header = $( '<div>').addClass( 'gh-header' );
            var content = $( '<div>').addClass( 'gh-content' );
            var badges = $( '<div>').addClass( 'gh-badges' );


            /*
                Header Code
             */

            // Repository Name
            if( settings.showRepoName ) {
                var repo = settings.linkRepo ? '<a>' : '<span>';
                $( repo )
                    .attr( 'href', data.html_url )
                    .addClass( 'gh-repo' )
                    .text( data.name )
                    .appendTo( header );
            }

            // Owner Name
            if( settings.showOwnerName ) {
                if( settings.showRepoName ) {
                    $( '<span>' ).text( ' by ' ).appendTo( header );
                }
                var owner = settings.linkOwner ? '<a>' : '<span>';
                $( owner )
                    .attr( 'href', data.owner.html_url )
                    .addClass('gh-owner')
                    .text( data.owner.login )
                    .appendTo( header );
            }

            /*
                Description Code
             */

            // Description
            if( settings.showDesc ) {
                $( '<p>' ).addClass( 'gh-desc' ).text( data.description ).appendTo( content );
            }

            /*
                Badge Content Code
             */
            // Last Updated
            if( settings.showLastUpdated ) {
                $( '<span>' ).addClass( 'gh-lastUpdated' ).text( 'Last Updated ' + data.updated_at.toString().slice( 0, 10 ) ).appendTo( badges );
            }

            // Forks
            if( settings.showForks ) {
                $( '<span>' ).addClass('gh-forks').text( data.forks_count + ' forks').appendTo( badges );
            }

            // Stars
            if(settings.showStars) {
                $( '<span>' ).addClass('gh-stars').text( data.stargazers_count + ' stars').appendTo( badges );
            }

            // Watchers
            if( settings.showWatchers ) {
                $( '<span>' ).addClass('gh-watchers').text( data.watchers + ' watchers').appendTo ( badges );
            }

            // Version
            if( settings.showVersion ) {
                $.ajax( {
                    url: root + repos + settings.owner + '/' + settings.repo + '/releases/latest',
                    success: function ( data ) {
                        var version = settings.linkVersion ? '<a>' : '<span>';
                        $( version )
                            .addClass( 'gh-version' )
                            .attr( 'href', data.html_url )
                            .text( data.tag_name )
                            .appendTo( badges );
                        },
                    error: function () {
                        console.log( 'No Releases for ' + settings.repo );
                    }
                } );
            }

            // Commits (in the last year)
            if( settings.showCommits ) {
                $.ajax( {
                    url: root + repos + settings.owner + '/' + settings.repo + '/stats/commit_activity',
                    success: function ( data ) {

                        // Set Counter
                        var total = 0;

                        // Count Commits
                        data.forEach(function ( e ) {
                            total += e.total;
                        });

                        // Add to DOM
                        $( '<span>' )
                            .addClass( 'gh-commits' )
                            .text( total + ' Commits (in the last year)')
                            .appendTo( badges );
                        },
                    error: function () {
                        console.log( 'No Commits Returned for ' + settings.repo );
                    }
                } );
            }

            // Contributors
            if( settings.showContributors ) {
                $.ajax( {
                    url: root + repos + settings.owner + '/' + settings.repo + '/stats/contributors',
                    success: function ( data ) {
                        $( '<span>' )
                            .addClass( 'gh-contributors' )
                            .attr( 'href', data.html_url )
                            .text( data.length + ' Contributors')
                            .appendTo( badges );
                        },
                    error: function () {
                        console.log( 'No Contributors Found for ' + settings.repo );
                    }
                } );
            }

            // Languages
            if( settings.showLanguages ) {
                $.ajax( {
                    url: root + repos + settings.owner + '/' + settings.repo + '/languages',
                    success: function ( data ) {
                        var languages = [];
                        var container = $( '<div>' );

                        $.each( data, function ( key, value ) {
                            $( '<span>' )
                                .addClass( 'gh-languages' )
                                .text( key )
                                .appendTo( container );
                        });

                        container.appendTo( badges );
                    },
                    error: function () {
                        console.log( 'No Languages Found for ' + settings.repo );
                    }
                } );
            }

            header.appendTo( el );
            content.appendTo( el );
            badges.appendTo( el );

            return el;
        }

        // Fetch Data
        $.ajax({
            url: root + repos + settings.owner + '/' + settings.repo
        }).done( function ( data ) {

            console.log( data );
            that.append( buildDOM( data ) );

        });

        $(document).ajaxStop(function() {
            // Bootstrap
            if( settings.bootstrap ) {
                $('.gh-main').addClass('well well-lg');
                $('.gh-header').addClass('h2').find('span, .gh-owner').addClass('small');
                $('.gh-desc').addClass('lead');
                $('.gh-badges > span').addClass('label label-info');
                $('.gh-languages').addClass('label label-warning');
            }

            // Show element after everything loads
            that.show();
        });

        return this;
    };

})( jQuery );