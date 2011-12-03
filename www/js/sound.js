(function() {
    C$.inherit('SoundController','CreasetophController').prototype = {
        options: {},
        swf_location: '/flash/index/SoundBridge.swf',
        count: 0,
        init: function() {
            this.count++;

            this.object_id = 'object_id_' + this.count;

            var movie_element = "";
            movie_element += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="0" height="0"';
            movie_element += ' id="' + this.object_id + '"';
            movie_element += ' align="middle">';
            movie_element += '<param name="movie" value="'+ this.swf_location +'" />';
            movie_element += '<param name="quality" value="high" />';
            movie_element += '<param name="bgcolor" value="#ffffff" />';
            movie_element += '<param name="FlashVars" value="id='+ this.object_id +'"/>';
            movie_element += '<param name="allowScriptAccess" value="always"/>';
            movie_element += '<embed src="'+this.swf_location+'" FlashVars="id='+ this.object_id +'"';
            movie_element += ' allowScriptAccess="always" quality="high" bgcolor="#ffffff" width="0" height="0"';
            movie_element += ' name="' + this.object_id + '" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
            movie_element += '</object>';

            var element = document.createElement("div");
            element.id = "__sound_flash__";
            element.innerHTML = movie_element;
            document.body.appendChild(element);
        },
        __thisMovie: function(movieName) {
            if (navigator.appName.indexOf("Microsoft") != -1) {
                return window[movieName];
            }
            else {
                return document[movieName];
            }
        },
        __call: function () {
            var functionname = arguments[0];
            var object_id = arguments[1];
            var justArgs = new Array();
            if (arguments.length > 1)   {
               for (var i = 2; i < arguments.length; i++ ) {
                 justArgs.push(arguments[i]);
               }
            }
            return this.__thisMovie(object_id).proxyMethods(functionname, justArgs);
        },
        loadSound: function(url, streaming) {
            return this.__call('loadSound',this.object_id, url, streaming);
        },
        start: function() {
            return this.__call('start', this.object_id);
        },
        stop: function() {
            return this.__call('stop', this.object_id);
        },
        getId3: function() {
            return this.__call('id3', this.object_id);
        },
        getPan: function() {
            return this.__call('getPan', this.object_id);
        },
        getTransform: function() {
            return this.__call('getTransform', this.object_id);
        },
        getVolume: function(){
            return this.__call('getVolume', this.object_id);
        },
        setPan: function(value){
            return this.__call('setPan', this.object_id, value);
        },
        setTransform: function(transformObject){
            return this.__call('setTransform', this.object_id, transformObject);
        },
        setVolume: function(value){
            return this.__call('setVolume', this.object_id, value);
        },
        getDuration: function(){
            return this.__call('getDuration', this.object_id);
        },
        setDuration: function(value){
            return this.__call('setDuration', this.object_id, value);
        },
        getPosition: function(){
            return this.__call('getPosition', this.object_id);
        },
        setPosition: function(value){
            return this.__call('setPosition', this.object_id, value);
        },
        getBytesLoaded: function(){
            return this.__call('getBytesLoaded', this.object_id);
        },
        getBytesTotal: function(){
            return this.__call('getBytesTotal', this.object_id);
        },
        onLoad: function(success){
//            this.trace('Sound:onLoad('+success+') event triggered');
        }
    };
})();