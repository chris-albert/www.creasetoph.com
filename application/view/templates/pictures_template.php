<!-- Start of pictures_template-->
<div class='myLightBox'></div>
<div class='image_nav center'><?php echo @$image_nav;?></div>
<?php if(isset($image_links)) { ?>
    <table align='center' style='color:white;'>
        <tr>
            <td colspan='4' align='center' style='color:white;'><h3><?php echo @$image_category ?><hr /></h3></td>
        </tr>
        <tr>
        <?php
        foreach($image_links as $key => $value) {
            if ($key % 4 == 0 && $key != 0) {
                echo '</tr><tr>';
            }
            ?>
             <td width='200' height='200' align='center' >
                 <span controller="CreasetophLink" link='<?php echo $link . $value['id'];?>' class='crease_button'>
                    <?echo $value['link_name'];?>
                 </span><br />
                 <img controller="CreasetophLink"link='<?php echo $link . $value['id'];?>' style='margin-top:5px;' title='<?php echo $value['tag'];?>' src='<?php echo $value['small_path'];?>' alt='' />
             </td>
             <?php
        }
        ?>
        </tr>
    </table>
<?php } ?>

<?php
if(isset($images)) {
?>
<table align='center' style='color:white;'>
    <tr>
        <td colspan='4' align='center' style='color:white;'><h3>Images<hr /></h3></td>
    </tr>
    <tr>
    <?php
        foreach($images as $key => $value) {
            if ($key % 4 == 0 && $key != 0) {
                echo '</tr><tr>';
            }
            ?>
            <td width='200' height='200' align='center' >
                <img controller="LightBoxController" link='<?php echo $value['large_path'];?>' style='margin-top:5px;' title='<?php echo $value['tag'];?>' src='<?php echo $value['small_path'];?>' alt='' />
            </td>
             <?php
        }
    }
    ?>
    <tr>
</table>
<!-- End of pictures_template-->

