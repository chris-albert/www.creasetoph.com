<?php 
require_once('../application/model/PicturesModel.class.php');
class PicturesController extends BaseController{
	
    public function __construct(&$registry) {
        parent::__construct($registry);
        $this->Model = new PicturesModel($registry);
    }

    /**
     * Gets all users that have a profile pic
     */
    public function index() {
        $this->Template->link = '/pictures/view/user/';
        $this->Template->image_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>->Pictures';
        $this->Template->image_category = 'Users';
        $this->Template->image_links = $this->Model->getUsersImages();
        $this->Template->render('pictures');
    }

    public function view() {
        if(array_key_exists('sub',$this->request)) {
            $this->subCategory();
        }else if(array_key_exists('category',$this->request)) {
            $this->category();
        }else if(array_key_exists('user',$this->request)) {
            $this->user();
        }else {
            echo 'asdasdasdasd';
        }
    }

    /**
     * Gets users categories and images
     */
    public function user() {
        $this->Template->link = '/pictures/view/user/'.$this->request['user'].'/category/';
        $this->Template->image_category = 'Categories';
        $data = $this->Model->getUserImageCategories($this->request['user']);
        $username = $data[0][0]['username'];
        $this->Template->image_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures">Pictures</span>->' . $username;
        $this->Template->image_links = $data[1];
        $this->Template->images = $data[2];
        $this->Template->render('pictures');
    }

    /**
     * Gets users sub categories and images
     */
     public function category() {
        $this->Template->link = '/pictures/view/user/'.$this->request['user'].'/category/' . $this->request['category'] . '/sub/';
        $this->Template->image_category = 'Categories';
        $data = $this->Model->getUserImageSubCategories($this->request['user'],$this->request['category']);
        $username = $data[0][0]['username'];
        $category_name = $data[0][0]['category_name'];
        $this->Template->image_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures">Pictures</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures/view/user/'.$this->request['user'].'">' . $username . '</span>->'.$category_name;
        $this->Template->image_links = $data[1];
        $this->Template->images = $data[2];
        $this->Template->render('pictures');
     }

     public function subCategory() {
        $data = $this->Model->getUserSubCategoryImages($this->request['user'],$this->request['category'],$this->request['sub']);
        $username = $data[0][0]['username'];
        $category_name = $data[0][0]['category_name'];
        $sub_category_name = $data[0][0]['sub_category_name'];
        $this->Template->image_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures">Pictures</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures/view/user/'.$this->request['user'].'">' . $username . '</span>-><span class="crease_button" controller="CreasetophLink" link="/pictures/view/user/'.$this->request['user'].'/category/'.$this->request['category'].'">'.$category_name.'</span>->'.$sub_category_name;
        $this->Template->images = $data[1];
        $this->Template->render('pictures');
     }

     public function getUserImage() {
         $params = $this->_registry->params;
         array_shift($params);
         $height = array_shift($params);
         array_shift($params);
         $width = array_shift($params);
         $path = substr(implode('/',$params),0,-1);
         if(file_exists($path)) {
            $new_path = $this->resizeImage($path,$height,$width);
            header('Content-type: image/jpeg');
            $img = file_get_contents($new_path);
            echo $img;
            return;
        }
     }

    private function resizeImage($path, $height, $width) {
        require_once('../application/objects/ImageResize.class.php');
        $path_arr = explode('/', $path);
        $tmp = 'tmp_h_' . $height . '_w_' . $width . '_' . array_pop($path_arr);
        $path_arr[] = $tmp;
        $tmp_path = implode('/', $path_arr);
        $image = new ImageResize();
        $image->load($path);
        $image->resizeToHeight($height);
        $image->save($tmp_path);
        return $tmp_path;
    }

    public function dirTest() {
        $path = '/media/data/Music/';
        echo '<pre>';
        print_r($this->getDirStructure($path,'/\.mp3$/'));
        echo '</pre>';
    }
}
