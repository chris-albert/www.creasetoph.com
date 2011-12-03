<!-- Start of forum_template -->
<div class="forum_main_container">
    <div class="forum_nav">
        <?php echo $forum_nav; ?>
    </div>
    <div class="forum_container table">
        <div class="table_row table_row_head">
            <div class="table_cell thread_name">Threads</div>
            <div class="table_cell thread_last_post">Last Post</div>
            <div class="table_cell thread_replies">Replies</div>
            <div class="table_cell thread_author">Author</div>
        </div>
        <?php foreach($threads as $thread) { ?>
        <div class="table_row table_row_body">
            <div class="table_cell thread_name" controller="CreasetophLink" link="<?php echo $thread_link . $thread['parent_post_id'];?>"><?php echo $thread['thread_title'];?></div>
            <div class="table_cell thread_last_post"><span  controller="CreasetophLink" link="<?php echo $user_link . $thread['thread_creator'];?>"><?php echo $thread['username']; ?></span> <?php echo Util::getTimeDifferenceFormat($thread['date']);?></div>
            <div class="table_cell thread_replies"><?php echo $thread['replies'];?></div>
            <div class="table_cell thread_author" controller="CreasetophLink" link="<?php echo $user_link . $thread['thread_creator'];?>"><?php echo $thread['thread_username'];?></div>
        </div>
        <?php } ?>
    </div>
</div>
<!-- End of forum_template -->