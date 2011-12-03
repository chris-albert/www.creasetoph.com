<?php 

class VideoController extends BaseController{

    //this should have a trailing slash
    private $video_root = '/media/data/Videos/';
    private $type_map = array(
        'mov'   => 'video/quicktime',
        'wmv'   => 'x-ms-wmv',
        'mpg'   => 'video/mpeg',
        'avi'   => 'video/x-msvideo',
        'flash' => 'application/x-shockwave-flash'    
    );
    
    public function index() {

       //if($this->User->isValid) {
            
            $this->loadSRC($this->_registry->request, array(
                '../www/css/video.css'
            ),'css');

            $this->Template->info = $this->getDirStructure($this->video_root);
            $this->Template->video_json = json_encode($this->Template->info);

            $this->Template->render('video');
       // }
       // $this->Template->error_msg = "This is the music section of the site, you can come here to stream all of creasetophs music collection.";
        //$this->Template->render('access_denied', 'Access Denied');
    }

    public function stream() {
        $path = urldecode($this->video_root . implode("/",$this->_registry->params));

        //echo $new_path . "<br />";
        //echo "Type: " . $this->getFiletype($new_path) . "<br />";
        //echo "Content-type: " . $this->getContentType($new_path);
        if(file_exists($path)) {
            $content_type = $this->getContentType($path);
	        $video = file_get_contents($path);
	        header('Last-Modified: ');
	        header('ETag: ');
	        header('Accept-Ranges: bytes');
	        header('Content-Length: '.filesize($path));
	        header('Connection: close');
	        header('Content-Type: ' . $content_type);
	        echo $video;
        }else {
            echo "Could not find path: " . $path;
        }
    }

    private function getContentType($path) {
        $type = $this->getFiletype($path);
        if(isset($this->type_map[$type])) {
            return $this->type_map[$type];
        }
        return "flash";
    }

    private function getFiletype($path) {
        $info = pathinfo($path); 
        return $info["extension"];
    }

    private function getDirInfo($path) {
        $info = array();
        if(is_dir($path)) {
            if($dh = opendir($path)) {
                while(($file = readdir($dh)) !== false) {
                    if($file != '.' && $file != '..') {
                        $type = filetype($path.$file);
                        if($type === 'dir') {
                            $info[$file] = $this->getDirInfo($path.$file.'/');
                        }else if(strpos($file,'.mp3')) {
                            $info[] = $file;
                        }
                    }
                }
            }
        }
        if($type === 'dir') {
            ksort($info);
        }else {
            sort($info);
        }
        return $info;
    }
}
