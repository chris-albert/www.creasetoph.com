<html>
<head>
    <title>Test</title>
<style type="text/css">
#flash_obj {
    border: 1px solid black;
}
</style>
<script type='text/javascript'>
function load_js() {
    var obj = document.getElementById('flash_obj');
    window.creasetoph = {
        listeners: {
            on_open: function() {
                console.log('on_open');
            },
            on_complete: function() {
                console.log('on_complete'); 
            },
            on_end: function() {
                console.log('on_end');
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
            }
        }
    };
    //debugger;

    window.play_music = function() {
        obj.play();
    };
    window.load_music = function() {
        obj.load("http://home.creasetoph.com/music/stream/Grizzly%20Bear/Veckatimest/01%20Southern%20Point.mp3");
    };
    window.stop_music = function() {
        obj.stop();
    };
    window.pause_music = function() {
        obj.pause();
    }
};
document.addEventListener("DOMContentLoaded",load_js,false);
</script>
</head>
<body>
    <object type="application/x-shockwave-flash" data="/flash/index/audio.swf" width="500" height="500" id="flash_obj">
        <param name="movie" value="/flash/index/audio.swf" />
        <param name="FlashVars" value="js_namespace=window.creasetoph.listeners" />
    </object>
    <input type="button" onclick="load_music()" value="load"/>
    <input type="button" onclick="play_music()" value="play"/>
    <input type="button" onclick="pause_music()" value="pause"/>
    <input type="button" onclick="stop_music()" value="stop"/>
</body>
</html>
