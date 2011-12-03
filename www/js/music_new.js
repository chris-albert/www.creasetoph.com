/**
 * This is js for the music section of creasetoph.com
 * @author creasetoph
 *
 * **VIEW**
 * MusicLibraryController  - Controlls the library element
 * MusicPlaylistController - Controlls the playlist element
 * MusicPlayerController   - Controlls the player element
 *
 * **MODEL**
 * MusicPlaylistModel      - Controlls the playlist
 * SoundDevice             - Controlls the sound
 *
 * **CONTROLLER**
 * MusicController         - Interfaces between model ad view
 */
//(function() {

    ///**
     //* Data Controllers
     //* Stores data and interfaces with MusicController
     //*/
    //C$.inherit('MusicPlaylistModel','CreasetophController').prototype = {
        //Objects: {
            //Sound          : 'SoundController',
            //MusicController: 'MusicController'
        //},
        //playlist: {
            //tracks : [],
            //current: 0
        //},
        //cache: [],
        //playing: false,
        //paused: false,
        //repeat: {
                //'song'  : false,
                //'album' : true,
                //'artist': false
        //},
        //init: function(e) {
            ////this.Sound = C$.find_object('SoundController').prototype;
        //},
        //play_pause: function(e) {
            //if(this.playing) {
                //this.pause();
            //}else {
                //this.play();
            //}
            //this.set_play_pause();
            //return this;
        //},
        //play: function() {
                  //debugger;
            //var curr_track;
            //if(this.paused) {
                //this.Sound.play();
                //this.paused = false;
            //}else {
                //curr_track = this.playlist.tracks[this.playlist.current];
                //if(curr_track) {
                    //this.Sound.load('/music/stream/' + curr_track.artist + '/' + curr_track.album + '/' + curr_track.track);
                    //this.Sound.play();
                //}
            //}
            //this.playing = true;
            //return this;
        //},
        //stop: function() {
            //if(this.playing) {
                //this.Sound.stop();
                //this.playing = false;
                //this.paused = false;
            //}
            //return this;
        //},
        //pause: function() {
            //if(this.playing) {
                //this.Sound.pause();
                //this.paused = true;
                //this.playing = false;
            //}
            //return this;
        //},
        //next: function() {
            //this.next_playlist();
            //return this;
        //},
        //prev: function() {
            //this.prev_playlist();
            //return this;
        //},
        //add_to_playlist: function(artist,album,track) {
            //this.playlist.tracks.push({
                //'artist': artist,
                //'album' : album,
                //'track' : track
            //});
            //return this;
        //},
        //add_album_to_playlist: function(artist,album,track) {
            //var tracks = creasetoph.MusicController.prototype.library[artist][album];
            //for(var i = 0,l = tracks.length;i < l;i++) {
                //this.add_to_playlist(artist,album,tracks[i]);
                //if(tracks[i] === track) {
                    //this.playlist.current = i;
                //}
            //}
            //this.play();
            //return this;
        //},
        //remove_from_playlist: function(track) {
            //this.playlist.tracks.splice(track,1);
            //if(track == this.playlist.current) {
                //this.play();
            //}
        //},
        //clear_playlist: function() {
            //this.stop();
            //this.playlist.tracks = [];
            //this.playlist.current = 0;
            //return this;
        //},
        //next_playlist: function() {
            //this.stop();
            //if(this.playlist.current < this.playlist.tracks.length - 1) {
                //this.playlist.current++;
                //this.play();
            //}else if(this.repeat.album) {
                //this.playlist.current = 0;
                //this.play();
            //}
            //return this;
        //},
        //prev_playlist: function() {
            //this.stop();
            //if(this.playlist.current > 0) {
                //this.playlist.current--;
                //this.play();
            //}else if(this.repeat.album) {
                //this.playlist.current = this.playlist.tracks.length - 1;
                //this.play();
            //}
            //return this;
        //},
        //get_current_track: function() {
            //return this.playlist.tracks[this.playlist.current];                 
        //},
 
    //};

    ///**
     //* Controller Controller
     //* This is the interface between the view and the model Interfaces with the views and the MusicPlaylistController
     //*/
    //C$.inherit('MusicController','CreasetophController').prototype = {
        //Objects: {
            //PlaylistModel: 'MusicPlaylistModel',
            //LibraryView  : 'MusicLibraryViewController',
            //PlaylistView : 'MusicPlaylistViewController',
            //PlayerView   : 'MusicPlayerViewController'
        //},
        //init: function() {
            ////this.PlaylistModel = C$.find_object('MusicPlaylistModel').prototype;
            ////debugger;
            ////this.PlaylistModel = creasetoph.MusicPlaylistModel.prototype;
        //},
        //add_to_playlist: function(attributes) {
                             //debugger;
            //this.PlaylistModel.add_to_playlist(attributes['artist'],attributes['album'],attributes['track']);
            //this.PlaylistModel.play();
        //}
    //};

    ///**
     //* View Controllers
     //* Controlls the view elements on the page, interacts with the MusicController
     //*/
    //C$.inherit('MusicLibraryViewController','CreasetophController').prototype = {
        //Objects: {
            //MusicController: 'MusicController'
        //},
        //Events: {
            //click: 'onClick'
        //},
        //library: null,
        //Playlist: null,
        //init: function() {
            
        //},
        //load_library: function(library_json) {
            //console.log(library_json);
            //this.library = library_json;
            //this.add_artists();
        //},
        //add_artists: function() {
            //var artist_obj,
                //element = $(this.element);
            //C$.foreach(this.library,function(artist,albums) {
                //element.append($().new_el({
                    //type      : 'div',
                    //text      : artist,
                    //attributes: {'artist':artist}
                //}));
            //},this);
        //},
        //onClick: function(e) {
            //var clicked_el = $(e.target_element),
                //attributes = clicked_el.get_attributes(['artist','album','track']),
                //type = null;
            //if(attributes.track !== null) {
                //type = 'track';
            //}else if(attributes.album !== null) {
                //type = 'album';
            //}else if (attributes.artist !== null) {
                //type = 'artist';
            //}

            //if(type === 'track') {
                //this.track_clicked(attributes);
            //}else {
                //this.determine_state(clicked_el,type,attributes);
            //}
        //},
        //determine_state: function(el,type,attributes) {
            //var children = $(el).get_attribute('children');
            //if(children === 'shown') {
                //this.hide_children(el);
            //}else if(children === 'hidden') {
                //this.show_children(el);
            //}else {
                //this.add_children(el,type,attributes);
            //}
        //},
        //add_children: function(el,type,attributes) {
            //var children,
                //container = $().new_el({
                    //type : 'div',
                    //class: type + '_container',
                //}).insert_after(el);
            //if(type === 'artist') {
                //children = this.library[attributes['artist']];
                //attributes = {
                    //artist: attributes['artist']
                //};
            //}else if(type === 'album'){
                //children = this.library[attributes['artist']][attributes['album']];
                //attributes = {
                    //artist: attributes['artist'],
                    //album : attributes['album']
                //};
            //}
            //C$.foreach(children,function(k,v) {
                //var name = k, attr = {album: k};
                //if(type === 'album') {
                    //name = v;
                    //attr = {
                        //album: attributes['album'],
                        //track: v
                    //}
                //}
                //container.append($().new_el({
                    //type        : 'div',
                    //text        : name,
                    //'attributes': C$.extend_obj(attributes,attr)
                //}));
            //},this);
            //$(el).set_attribute({'children':'shown'});
        //},
        //show_children: function(el) {
            //$(el.nextSibling).css({display:'block'});
            //$(el).set_attribute({'children':'shown'});
        //},
        //hide_children: function(el) {
            //$(el.nextSibling).css({display:'none'});
            //$(el).set_attribute({'children':'hidden'});
        //},
        //track_clicked: function(attributes) {
            //this.MusicController.add_to_playlist(attributes);
        //}
    //};

    //C$.inherit('MusicPlaylistViewController','CreasetophController').prototype = {
        //Objects: {
            //MusicController: 'MusicController'
        //}
    //};

    //C$.inherit('MusicPlayerViewController','CreasetophController').prototype = {
        //Objects: {
            //MusicController: 'MusicController'
        //}
    //};

//})();
