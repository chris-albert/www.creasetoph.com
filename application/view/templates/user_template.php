<!-- Start of user_template -->
<div class="user_main_container">
    <div class="user_container">
        <div class="username"><?php echo $user_info['username'];?></div>
        <div class="user_info_container">
            <div class="user_image">
                <a href="<?php echo $user_info['large_path'];?>">
                    <img src="<?php echo $user_info['small_path'];?>" alt="" title="" />
                </a>
            </div>
            <div class="user_info">
                <div class="user_headers">
                    <div class="user_header">Rank</div>
                    <div class="user_header">Last Login</div>
                    <div class="user_header">Member Since</div>
                    <div class="user_header">Posts</div>
                    <div class="user_header">E-Mail</div>
                    <div class="user_header">Description</div>
                </div>
                <div class="user_contents">
                    <div class="user_content"><?php echo $user_info['rank'];?></div>
                    <div class="user_content"><?php echo $user_info['last_login'];?></div>
                    <div class="user_content"><?php echo $user_info['start_date'];?></div>
                    <div class="user_content"><?php echo $user_info['posts'];?></div>
                    <div class="user_content"><?php echo $user_info['email'];?></div>
                    <div class="user_content"><?php echo $user_info['description'];?></div>
                </div>
            </div>
            <div class="user_panel">
                <?php if($displayEdits) {?>
                    <div class="user_panel_row crease_button" controller="CreasetophLink" link="<?php echo $user_info['user_id']?>">Create Blog</div>
                    <div class="user_panel_row crease_button" controller="CreasetophLink" link="<?php echo $user_info['user_id']?>">Upload Images</div>
                    <div class="user_panel_row crease_button" controller="CreasetophLink" link="<?php echo $user_info['user_id']?>">Edit Images</div>
                    <div class="user_panel_row crease_button" controller="CreasetophLink" link="<?php echo $user_info['user_id']?>">Edit Profile</div>
                <?php }else {?>
                    <div class="user_panel_row crease_button" controller="CreasetophLink" link="/pictures/view/user/<?php echo $user_info['user_id']?>">View Images</div>
                    <div class="user_panel_row crease_button" controller="CreasetophBlogLink" link="/users/blog/user/<?php echo $user_info['user_id']?>">View Blogs</div>
                <?php }?>
            </div>
        </div>
    </div>
    <div class="user_blogs"></div>
</div>
<!-- End of user_template -->