<!-- Start of thread_template -->
<div class="forum_main_container">
    <div class="forum_nav">
        <?php echo $forum_nav; ?>
    </div>
    <?php foreach($posts as $key => $post) { ?>
    <div class="forum_container table">
        <div class="table_row table_row_head">
            <div class="table_cell post_head">
                <div class="post_head_user">By <?php echo $post['username'];?></div>
                <div class="post_head_post_num">#<?php echo $key + 1;?></div>
            </div>
        </div>       
        <div class="table_row table_row_body">
            <div class="table_cell post_content_container">
                <div class="post_image">
                    <img src="<?php echo $post['small_path'];?>"/>
                </div>
                <div class="post_content"><?php echo Util::toHTML($post['content']);?></div>
                <div class="post_sig"><?php echo Util::toHTML($post['signature']);?></div>
            </div>
        </div>
    </div>
    <?php } echo $pagination;?>
</div>
<!-- End of thread_template -->