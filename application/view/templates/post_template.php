<!-- Start of post_template -->
<div class="forum_nav">
        <?php echo $forum_nav; ?>
    </div>
<div id=''>
    <table id='forumPosts'>
        <tr>
            <td class='head' colspan='2'>
                <span class='who'>By <a href='<?php echo $user_link . $post['user_id'];?>'><?php echo $post['username'];?></a>
                    <?php echo ' (' . $post['rank'] . ') ' . Util::getTimeDifferenceFormat($post['date']);?>
                </span>
                <span class='alert'>
                    <span class='mod'><img class='modImg' src='images/mod.gif' />
                    <ul>
                        <li><a href=''>Edit</a></li>
                        <li><a href=''>Delete</a></li>
                    </ul></span>
                    #
                </span>
            </td>
        </tr>
        <tr>
            <td class='avatar'>
                <img src='<?php echo $post['small_path'];?>' />
            </td>
            <td class='post'>
                <?php echo $post['content'];?>
                <hr />
                <div class='signature'>
                    <?php echo $post['signature'];?>
                </div>
            </td>
        </tr>
    </table>
</div>
<!-- End of post_template -->