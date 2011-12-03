
<div class="video_main_container">
    <div class="video_container" controller="VideoController">
  </div>
</div>
<script type="text/javascript"  language="JavaScript">
    //creasetoph.VideoController.prototype.library = <?php echo $video_json;?>;
    creasetoph.VideoController.prototype.load_library(<?php echo $video_json;?>);
</script>

