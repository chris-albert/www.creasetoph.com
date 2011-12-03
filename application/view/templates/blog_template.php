<!-- Start blog_template -->
<div class="blog_main_container">
    <div class='blog_container'>
        <?php
        foreach($blogs as $blog) {
        ?>
        <div class='blog'>
            <div class='blog_head'>
                <div class='blog_subject'><?php echo $blog['subject'];?></div>
                <div class='blog_info'>Posted by <?php echo $blog['username'];?> on <?php echo $blog['post_date'];?>
                    <?php if($blog['user_id'] == $User['user_id']) {?>
                        <a href=''>[Edit]</a>
                    <?php }?>
                </div>
            </div>
            <div class='blog_content'>
                <div class='blog_text'><?php echo $blog['text'];?></div>
            </div>
        </div>
        <?php }
        echo $this->pagination;
        ?>
    </div>
</div>
<!-- End blog_template -->