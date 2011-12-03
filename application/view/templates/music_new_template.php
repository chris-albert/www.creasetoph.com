<div id="creasetoph_music_container">
    <div id="player_container">
        <div id="player_left_container">
            <div id="player_play_button"></div>
        </div>
        <div id="player_center_container" controller="MusicPlayerViewController">
            <div id="player_progress_container">
                <div id="player_progress_bar"></div>
            </div>
            <div id="player_artist_album"><span>Frank Zappa - Apostrope(')</span></div>
            <div id="player_track"><span>Don't Eat the Yellow Snow</span></div>
        </div>
        <div class='clearfix'></div>
    </div>
    <div id="content_container">
        <div id="library_container" controller="MusicLibraryViewController"></div>
        <div id="playlist_container" controller="MusicPlaylistViewController"></div>
    </div>
    <script type="text/javascript"  language="JavaScript">
        C$.find_object('MusicLibraryViewController').prototype.load_library(<?php echo $music_json;?>);
    </script>
</div>
