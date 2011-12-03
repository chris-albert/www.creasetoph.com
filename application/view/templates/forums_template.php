<!-- Start of forums_template -->
<div class="forum_main_container">
    <div class="forum_nav">
        <?php echo $forum_nav; ?>
    </div>
    <div class="forum_container table">
        <div class="table_row table_row_head">
            <div class="table_cell forum_name">Forum</div>
            <div class="table_cell forum_last_post">Last Post</div>
            <div class="table_cell forum_threads">Threads</div>
            <div class="table_cell forum_posts">Posts</div>
        </div>
        <?php foreach($forums as $forum) {?>
        <div class="table_row table_row_body">
            <div class="table_cell forum_name" link="<?php echo $forum_link . $forum['forum_id'];?>" controller="CreasetophLink"><?php echo $forum['forum'];?></div>
            <div class="table_cell forum_last_post">
                <div class="forum_last_post_title" link="<?php echo $thread_link . $forum['id'];?>" controller="CreasetophLink">
                    <?php echo $forum['title'];?>
                </div>
                <div class="forum_last_post_user">
                    By <?php echo $forum['username'] , ' ' , Util::getTimeDifferenceFormat($forum['date']);?>
                </div>
            </div>
            <div class="table_cell forum_threads"><?php echo $forum['threads'];?></div>
            <div class="table_cell forum_posts"><?php echo $forum['posts'];?></div>
        </div>
        <?php } ?>
    </div>
</div>

<!-- End of forums_template -->