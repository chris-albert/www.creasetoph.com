(function() {
    C$.inherit('MusicController','CreasetophController').prototype = {
        Events: {
            click    : 'onClick',
            mouseover: 'onMouseover',
            mouseout : 'onMouseout'
        },
        orig_border_color: 'white',
        curr_border_color: '#555555',
        onClick: function(e) {
            var parent_el = $(this.target_element).get_parent('[type]'),
                type = parent_el.get_attribute('type');
           switch(type) {
		        case 'artist':
                    this.add_albums(parent_el);
                    break;
                case 'album':
                    this.add_tracks(parent_el);
                    break;
                case 'track':
                    this.play_track(e,parent_el);
                    break;
            }
        },
        validate_mouse_over: function(e,func) {
             var checks = ['music_artist_name','music_album_name','music_track_name'],
                found = false;
            C$.foreach(checks,function(k,v) {
                if($(e.target_element).has_class(v)) {
                    found = true;    
                }        
            });
            if(found) {
                func(e.target_element);
            }
        },
        onMouseover: function(e) {
            this.validate_mouse_over(e,this.add_info);
        },
        onMouseout: function(e) {
            this.validate_mouse_over(e,this.remove_info);
        },
        add_info: function(el) {
            $(el).append(
               $().new_el('span').add_class('add_track')
            );
        },
        remove_info: function(el) {
            var track = $('.add_track',el);
            if(track) {
                el.removeChild(track);
            }
        },
        add_albums: function(parent_el) {
            var album_div = $('.music_album_container',parent_el),artist, albums_el;
            if(album_div) {
                album_div.css({
                    'display': album_div.style.display == 'none' ? 'block' : 'none'
                });
            }else {
                artist = $('.music_artist_name',parent_el).get_attribute('artist');
                album_div = document.createElement('div');
                $(album_div)
                    .set_attribute('type','album')
                    .add_class('music_album_container')
                    .css({'display':'block'});
                for(var i in this.library[artist]) {
                    albums_el = document.createElement('div');
                    $(albums_el)
                        .add_class('music_album_name')
                        .set_attribute('album',i)
                        .set(i);
                    album_div.appendChild(albums_el);
                }
                parent_el.appendChild(album_div);
            }
        },
        add_tracks: function(parent_el) {
            var parent = $(this.target_element).get_parent('.music_album_name'),
                tracks_div = parent.nextSibling,
                artist,album,tracks_el;
            if(tracks_div && $(tracks_div).get_attribute('class') == 'music_track_container') {
                tracks_div.css({
                    'display': tracks_div.style.display == 'none' ? 'block' : 'none'
                });
            }else {
                artist = $('.music_artist_name',$(parent_el).get_parent('[type=artist]')).get_attribute('artist');
                album = parent.get_attribute('album');
                tracks_div = document.createElement('div');
                $(tracks_div)
                    .set_attribute('type','track')
                    .add_class('music_track_container')
                    .set_attribute('album',album)
                    .css({'display':'block'});
                for(var i in this.library[artist][album]) {
                    tracks_el = document.createElement('div');
                    $(tracks_el)
                        .add_class('music_track_name')
                        .set_attribute('track',this.library[artist][album][i])
                        .set(this.library[artist][album][i]);
                    tracks_div.appendChild(tracks_el);
                }
                $(tracks_div).insert_after(parent);
            }
        },
        play_track: function(e,parent_el) {
            var track = $(this.target_element).get_parent('.music_track_name').get_attribute('track'),
                album = $(parent_el.previousSibling).get_attribute('album'),
                artist = $('.music_artist_name',$(parent_el).get_parent('.music_artist_container')).get_attribute('artist'),
                dialog = C$.find_object('MusicDialog').prototype,
                path = artist + '/' + album + '/' + track;

            C$.find_object('MusicDialog').prototype.open(e);

//            C$.find_object('PlaylistController').prototype.add_to_playlist(artist,album,track);
            C$.find_object('PlaylistController').prototype.clear_playlist().add_album_to_playlist(artist,album,track);
        },
        set_playing: function() {
        	var playlist = C$.find_object('PlaylistController').prototype;
//        	this.find_el_by_data(playlist.c, , )
        },
        find_el_by_data: function(artist,album,track) {
            	if(artist) {
            		var els = C$('.music_container');
            		debugger;
            	}
        },
        set_current: function() {
            var curr_track = C$.find_object('PlaylistController').prototype.get_current_track(),
                music_container = $('.music_container'),
                current = {},
                self = this,
                old_current = $('.current',music_container);
            //unset old current
            C$.foreach(old_current,function(k,v) {
                $(v)
                    .css({'borderColor': self.orig_border_color})
                    .remove_class('current_music');
            });    

            //set current
            debugger;
            current.artist = $('.music_artist_name[artist="' +  curr_track.artist.replace("'","\\'") + '"]',music_container);
            current.album = $('.music_artist_container[artist="' + curr_track.artist.replace("'","\\'") + '"] .music_album_name[album="' +  curr_track.album.replace("'","\\'") + '"]',music_container);
            current.track = $('.music_artist_container[artist="' + curr_track.artist.replace("'","\\'") + '"] .music_track_container[album="' +  curr_track.album.replace("'","\\'") + '"] [track="' +  curr_track.track.replace("'","\\'") + '"]',music_container);
            C$.foreach(current,function(k,v) {
                $(v)
                    .css({'borderColor': self.curr_border_color})
                    .add_class('current_music');
            });
            
        }
    };

    C$.inherit('OpenPlayerController','CreasetophController').prototype = {
        onClick: function(e) {
            C$.find_object('MusicDialog').prototype.open(e);
        }
    };

    C$.inherit('MusicDialog','CreasetophDialogMoveable').prototype = {
        dialog_height    : '',
        dialog_width     : '',
        dialog_resizeable: false,
//        dialog_fixed_box : true,
        dialog_content: function() {
            return this.Model.get_cache('player');
        },
        open: function(e) {
            this.open_dialog(e);
            C$.find_object('PlaylistController').prototype.set_player_to_current_song();
//            C$.find_object('PlaylistController').prototype.set_play_pause();
        }
    };

    C$.inherit('OpenPlaylistController','CreasetophController').prototype = {
        onClick: function(e) {
            C$.find_object('PlaylistDialog').prototype.open(e);
        }
    };
    
    C$.inherit('PlaylistDialog','CreasetophDialogMoveable').prototype = {
        dialog_height    : '',
        dialog_width     : '',
        dialog_resizeable: false,
        playlist_container: null,
        playlist: null,
        on_build: function() {
            this.playlist = C$.find_object('PlaylistController').prototype.playlist;
            this.playlist_container = $().new_el('div').add_class('playlist_container').append(
                $().new_el('div').append([
                    $().new_el('span')
                        .add_class('artist')
                        .set('Artist'),
                    $().new_el('span')
                        .add_class('album')
                        .set('Album'),
                    $().new_el('span')
                        .add_class('track')
                        .set('Track')
                ]).add_class('playlist_header')
            );
            $(this.dialog.body.element).append(this.playlist_container);
            this.render_playlist();
            this.set_current();
        },
        render_playlist: function() {
            var self = this;
            $(this.playlist_container).append(
                $().new_el('div').add_class('playlist_tracks').append(
                    C$.foreach(this.playlist.tracks,function(key,value) {
                        return $().new_el('div').append([
                            $().new_el('span')
                                .add_class('artist')
                                .set(value.artist),
                            $().new_el('span')
                                .add_class('album')
                                .set(value.album),
                            $().new_el('span')
                                .add_class('track')
                                .set(value.track),
                            self.build_track_controls(key)
                        ]).add_class('playlist_entry').set_attribute({'track': key});
                    })
                ).set_controller(C$.find_object('PlaylistTrack'))
            );
        },
        build_track_controls: function(i) {
            var up_class = 'playlist_track_move_up',
                down_class = 'playlist_track_move_down';
            if(i == 0) {
                up_class = '';
            }else if(i == this.playlist.tracks.length - 1) {
                down_class = '';
            }
            return $().new_el('span')
                .add_class('playlist_track_controls')
                .append([
                    $().new_el('span')
                        .add_class(up_class),
                    $().new_el('span')
                        .add_class(down_class),
                    $().new_el('span')
                        .add_class('playlist_track_remove'),    
                ]);
        },
        clear_playlist: function() {
            this.playlist_container.remove($('.playlist_tracks'));
        },
        set_current: function() {
            C$.find_object('PlaylistTrack').prototype.set_current();
        },
        open: function(e) {
            this.open_dialog(e);
        }
    };
    
    C$.inherit('PlaylistTrack','CreasetophController').prototype = {
        orig_border_color: 'white',
        curr_border_color: '#555555',
        Events: {
            mouseover: 'onMouseover',
            mouseout : 'onMouseout',
            click    : 'onClick'
        },
        set_current: function() {
            var tracks = C$.find_object('PlaylistDialog').prototype,playlist,parent,current,self = this;
            if(tracks.playlist_controller) {
                playlist = C$.find_object('PlaylistController').prototype;
                parent = $('[track="' + playlist.playlist.current + '"]',tracks.playlist_container);
                current = $('.current_playlist',tracks.playlist_container);
                if(current) {
                    $(current).remove_class('current_playlist');
                    C$.foreach($('span',current),function(i,el) {
                         $(el).css({'borderColor': self.orig_border_color});
                    });
                }
                if(parent) {
                    $(parent).add_class('current_playlist');
                    C$.foreach($('span',parent),function(i,el){
                        $(el).css({'borderColor': self.curr_border_color});
                    }); 
                }
            }
        },
        onMouseover: function(e) {
            C$.foreach($('span',$(this.target_element).get_parent('[track]')),function(i,el){
                $(el).css({'borderColor': 'black'});
            }); 
        },
        onMouseout: function() {
            var parent = $(this.target_element).get_parent('[track]'),
                tracks = C$.find_object('PlaylistDialog').prototype,
                color = this.orig_border_color;
            if($(parent).get_attribute('track') == tracks.playlist.current) {
                color = this.curr_border_color;
            }
            C$.foreach($('span',parent),function(i,el){
                $(el).css({'borderColor': color});
            }); 
        },
        onClick: function(e) {
            var track = $(this.target_element).get_parent('[track]').get_attribute('track'),
                class_name = this.target_element.className.substr(15),
                dialog = C$.find_object('PlaylistDialog').prototype;
            if(typeof this['on_' + class_name] === 'function') {
                this['on_' + class_name](track);
                dialog.clear_playlist();
                dialog.render_playlist();
                dialog.set_current();
            } 
        },
        on_remove: function(track) {
            C$.find_object('PlaylistController').prototype.remove_from_playlist(track);
        },
        on_move_up: function(track) {
            C$.find_object('PlaylistController').prototype.move_track(track,'up'); 
        },
        on_move_down: function(track) {
            C$.find_object('PlaylistController').prototype.move_track(track,'down');
        }
    };

    C$.inherit('SoundController','CreasetophController').prototype = {
        swf_location: '/flash/index/audio.swf',
        object_id   : 'CreasetophFlashObject',
        flash_id    : 'CreasetophFlashPlayer',
        flash_obj   : {},
        init: function() {
            var movie_element = "",element;
            movie_element += '<object type="application/x-shockwave-flash" data="' + this.swf_location + '" width="0" height="0" id="' + this.object_id + '">';
            movie_element += '  <param name="movie" value="' + this.swf_location + '" />';
            movie_element += '  <param name="FlashVars" value="js_namespace=window.creasetoph.SoundController.prototype.listeners&debug=false" />';
            movie_element += '</object>';

            element = document.createElement("div");
            element.id = this.flash_id;
            element.innerHTML = movie_element;
            document.body.appendChild(element);
            this.flash_obj = document[this.object_id];
        },
        /**
         * This is used by the flash bridge to do callbacks
         */
        listeners: {
            on_open: function() {
                console.log('on_open');
            },
            on_complete: function() {
                console.log('on_complete'); 
            },
            on_end: function() {
                console.log('on_end');
                C$.find_object('PlaylistController').prototype.next_playlist();
            },
            on_id3: function(id3) {
                console.log(id3);
                console.log('on_id3');
            },
            on_play: function() {
                console.log('on_play');
            },
            on_pause: function(time) {
                console.log('Paused at: ' + time); 
            },
            on_flash_load: function() {
                console.log('flash_loaded');
            },
            on_update: function(info) {
                C$.find_object('PlaylistController').prototype.update_player(info);
            }
        },
        load: function(url) {
            this.flash_obj.load(url);
        },
        stop: function() {
            this.flash_obj.stop();
        },
        play: function() {
            this.flash_obj.play();
        },
        pause: function() {
            this.flash_obj.pause();
        }
    };

    C$.inherit('PlaylistController','CreasetophController').prototype = {
        Sound: {},
        playlist: {
            tracks : [],
            current: null
        },
        cache: [],
        play_image: '/images/play.png',
        pause_image: '/images/pause.png',
        playing: false,
        paused: false,
        repeat: {
            	'song'  : false,
            	'album' : true,
            	'artist': false
        },
        controlls: {
            play_pause : null,
            stop       : null,
            prev       : null,
            status     : null,
            next       : null,
            status_bar : null,
            status_time: null
        },
        init: function(e) {
            this.Sound = C$.find_object('SoundController').prototype;
        },
        onBind: function() {
            for(var i in this.controlls) {
                this.controlls[i] = $('.' + i,this.element);
            }
            this.status_progress_width = this.controlls.status_bar.innerWidth;
        },
        onClick: function(e) {
            if(typeof this[e.target_element.className] !== 'undefined') {
                this[e.target_element.className](e);
            }
        },
        play_pause: function(e) {
            if(this.playing) {
                this.pause();
            }else {
                this.play();
            }
//            this.playing = !this.playing;
            this.set_play_pause();
            return this;
        },
        set_play_pause: function() {
            if(this.playing) {
                $(this.controlls.play_pause).css({
                    'backgroundImage': 'url(' + this.pause_image + ')'
                });
            }else {
                $(this.controlls.play_pause).css({
                    'backgroundImage': 'url(' + this.play_image + ')'
                });
            }
            return this;
        },
        play: function() {
            var curr_track;
            if(this.paused) {
                this.Sound.play();
                this.paused = false;
            }else {
                curr_track = this.playlist.tracks[this.playlist.current];
                if(curr_track) {
                    this.set_player_to_current_song(curr_track);
                    C$.find_object('PlaylistTrack').prototype.set_current();
                    this.Sound.load(creasetoph.CreasetophModel.prototype.base_url + ':1338/music/stream/' + curr_track.artist + '/' + curr_track.album + '/' + curr_track.track);
                    this.Sound.play();
                }
            }
            this.playing = true;
            this.set_play_pause();
            return this;
        },
        stop: function() {
            if(this.playing) {
            	this.Sound.stop();
            	this.playing = false;
            	this.paused = false;
            }
            this.set_play_pause();
            return this;
        },
        pause: function() {
            if(this.playing) {
                this.Sound.pause();
                this.paused = true;
                this.playing = false;
            }
            this.set_play_pause();
            return this;
        },
        next: function() {
            	this.next_playlist();
            	return this;
        },
        prev: function() {
            	this.prev_playlist();
            	return this;
        },
        set_player_to_current_song: function(track) {
            var curr_track = track || this.playlist.tracks[this.playlist.current];
            if(curr_track) {
                this.set_artist(curr_track.artist);
                this.set_album(curr_track.album);
                this.set_track(curr_track.track);
            }
            return this;
        },
        set_status_bar: function(str) {
            this.controlls.status_time.innerHTML = this.format_time(str);
            	return this;
        },
        set_status_bar_progress: function(percent) {
            this.controlls.status_bar.css({
                'width': percent + '%'
            });
        	    return this;
        },
        add_to_playlist: function(artist,album,track) {
            this.playlist.tracks.push({
                'artist': artist,
                'album' : album,
                'track' : track
            });
            return this;
        },
        add_album_to_playlist: function(artist,album,track) {
            var tracks = creasetoph.MusicController.prototype.library[artist][album];
            for(var i = 0,l = tracks.length;i < l;i++) {
                this.add_to_playlist(artist,album,tracks[i]);
                if(tracks[i] === track) {
                    this.playlist.current = i;
                }
            }
            this.play();
            return this;
        },
        remove_from_playlist: function(track) {
            this.playlist.tracks.splice(track,1);
            if(track == this.playlist.current) {
                this.play();
            }
        },
        move_track: function(track,dir) {
            var obj = this.playlist.tracks.splice(track,1);
            if(dir === 'up') {
                this.playlist.tracks.splice(parseInt(track) - 1,0,obj[0]);
            }else if(dir === 'down') {
                this.playlist.tracks.splice(parseInt(track) + 1,0,obj[0]);
            }
        },
        clear_playlist: function() {
            this.stop();
            this.playlist.tracks = [];
            this.playlist.current = 0;
            return this;
        },
        next_playlist: function() {
            this.stop();
            if(this.playlist.current < this.playlist.tracks.length - 1) {
                this.playlist.current++;
                this.play();
            }else if(this.repeat.album) {
                this.playlist.current = 0;
                this.play();
            }
            return this;
        },
        prev_playlist: function() {
            this.stop();
            if(this.playlist.current > 0) {
                this.playlist.current--;
                this.play();
            }else if(this.repeat.album) {
                this.playlist.current = this.playlist.tracks.length - 1;
                this.play();
            }
            return this;
        },
        get_current_track: function() {
            return this.playlist.tracks[this.playlist.current];                 
        },
        format_time: function(milliseconds) {
            var secs = Math.round(milliseconds / 1000),
                mins = Math.floor(secs / 60),time;
            secs = secs - (mins * 60);
            if(secs < 10) {
                secs = '0' + secs;
            }
            time = mins + ':' + secs;

            return time;
        },
        update_player: function(params) {
            if(this.playing) {
                this.set_status_bar(params.position);
                this.set_status_bar_progress(Math.round((params.position / params.duration) * 100));
            }
            return this;
        },
        set_album: function(album) {
            $('.dialog_main_container .now_playing_container .album').set(album);
            return this;
        },
        set_artist: function(artist) {
            $('.dialog_main_container .now_playing_container .artist').set(artist);
            return this;
        },
        set_track: function(track) {
            $('.dialog_main_container .now_playing_container .track').set(track);
            return this;
        }
    };

})();
