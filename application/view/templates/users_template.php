<!-- Start of users_template -->
<?php
if(isset($user_links)) {
?>
<table align='center' style='color:white;'><tr>
	<?php
    foreach($user_links as $key => $value) {
		if ($key % 4 == 0 && $key != 0) {
			echo "</tr><tr>";
		}
		if ($value['small_path'] != null) { ?>
			<td width='200' height='200' align='center' >
                <span link='<?php echo $link , $value['user_id'];?>' class='crease_button' controller="CreasetophLink">
                    <?php echo $value['username'];?>
                </span><br />
                <img style="margin-top: 5px"controller="CreasetophLink" link='<?php echo $link , $value['user_id'];?>'title='<?php echo $value['tag'];?>' src='<?php echo $value['small_path'];?>'/>
            </td>
         <?php

        }
		else {
        ?>
			<td width='200' height='200' align='center'><a href='<?php echo $link , $value['user_id'];?>' class='link'><?php echo $value['username'];?><br /></a></td>
		<?php
        }
	}
    ?>
</tr></table>
<?php
}else {
Util::echoArgs($user_info);

}
?>
<!-- End of users_template -->