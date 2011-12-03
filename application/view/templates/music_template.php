<span class='crease_button' controller="OpenPlayerController">Open Player</span>
<span class='crease_button' controller="OpenPlaylistController">Open Playlist</span>

<div class="music_main_container">
    <div class="music_container" controller="MusicController">
<?php   foreach($info as $artist => $albums) {
?>          <div class="music_artist_container" type="artist"  artist="<?php echo $artist;?>">
                <div class="music_artist_name" artist="<?php echo $artist;?>"><?php echo $artist;?></div>
            </div>
<?php   }
?>  </div>
</div>
<script type="text/javascript"  language="JavaScript">
    creasetoph.MusicController.prototype.library = <?php echo $music_json;?>;
</script>

