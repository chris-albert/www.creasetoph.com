<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN'
   'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
<head>
    <meta http-equiv='content-type' content='text/html; charset=utf-8' />
    <title><?php echo $title;?></title>
    <link rel='SHORTCUT ICON' href='images/icon.ico' />

    <!-- Site wide js and css -->
    <script type="text/javascript" src="<?php echo 'http://' . $_SERVER['SERVER_NAME'] . '/index/site/content/js'; ?>"></script>
    <link rel="stylesheet" type="text/css" href="<?php echo 'http://' . $_SERVER['SERVER_NAME'] . '/content/css/main.css'; ?>" />
    <!-- Page specific js and css -->
    <?php
    if(!empty($css)) {
        foreach($css as $value) {
    ?>
            <link rel="stylesheet" type="text/css" href="<?php echo $value; ?>" />
    <?php }
    }?>
</head>
<body class="creasetoph_content" controller="CreasetophBody">
	<div class='title'>
		<img src='http://<?php echo $_SERVER['SERVER_NAME'];?>/images/Creasetoph.comLogo3.png' alt='Title'/>
	</div>
	<!--Sign In -->
    <div controller="SignInDialog"></div>
    <!--Nav-->
	<div class='nav_wrapper'>
        <div class='nav_container'>
            <div class="nav_main_container" controller="NavSlide">
                <div class="nav_link_container">
                    <div class="nav_slide" link="home">
                        <div class="nav_text">Home</div>
                        <div class="nav_link">Home</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="users">
                        <div class="nav_text">Users</div>
                        <div class="nav_link">Users</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="forum">
                        <div class="nav_text">Forum</div>
                        <div class="nav_link">Forum</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="music">
                        <div class="nav_text">Music</div>
                        <div class="nav_link">Music</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="pictures">
                        <div class="nav_text">Pictures</div>
                        <div class="nav_link">Pictures</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="email">
                        <div class="nav_text">E-mail</div>
                        <div class="nav_link">E-mail</div>
                    </div>
                </div>
                <div class="nav_link_container">
                    <div class="nav_slide" link="about">
                        <div class="nav_text">About</div>
                        <div class="nav_link">About</div>
                    </div>
                </div>
            </div>
        </div>
	</div>
    <!-- Page Content-->
	<div class='main_container'>
        <div class="main_container_canvas">
            <?php
            if($this->debug) {
                Util::echoArgs($this->printArgs());
            }
            ?>
            <?php
            if(file_exists($content)) {
                include($content);
            }else {
                echo "Error: Could not find " . $name . " template.";
            }
            ?>
        </div>
    </div>
    <div class="hidden_cache_container">
        <?php
        if($User['isValid']) {
            include 'signout_template.php';
        } else {
            include 'signin_template.php';
        }
        include 'player_template.php';
        include 'json_error_template.php';
        include 'lightbox_template.php';
        ?>

    </div>
     <?php if(!empty($javascript)) {
            foreach($javascript as $value) {
        ?>`
        <script type="text/javascript" src="<?php echo $value; ?>" ></script>
    <?php }}?>
    <script language="javascript">
        C$.when_DOM_ready(C$.init);
    </script>
</body>
</html>
