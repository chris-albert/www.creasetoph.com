<?php 

class IndexController extends BaseController{

    private $UsersModel = null;
	public function __construct(&$registry) {
		parent::__construct($registry);
        $this->UsersModel = new UsersModel($registry);
	}
	
	public function view() {
		$this->index();
	}

    public function site() {
        //Site wide source, this is loaded on every page
        $this->loadSRC($this->_registry->request, array(
            'js/sizzle.js',
            'js/creasetoph_env.js',
            'js/creasetoph_base.js',
            'js/creasetoph_dialog.js',
            'js/creasetoph_main.js',
            'js/chords.js',
            'js/music.js',
            'js/music_new.js',
	    'js/video.js'
        ),'js',true,true);
    }
	
    public function index() {
        if($this->User->isValid) {
            $this->loadSRC($this->_registry->request, array(
                '../www/css/users.css',
                '../www/css/blog.css'
            ),'css');
            $this->Template->displayEdits = true;
            $this->Template->user_info = $this->UsersModel->getUserInfo($this->User->getId());
            $bounds = $this->Pagination->getPageBounds();
            $ret = $this->UsersModel->getAllBlogs($bounds['first'],$bounds['elements']);
            $this->Template->pagination = $this->Pagination->getPageLinks($ret[1][0]['count']);
            $this->Template->blogs = $ret[0];
            $this->Template->render('home_user','home');
        }
        $this->Template->render('home');
        
	}

    public function testAjax() {
        echo 'successfull ajax request';
    }

    public function phpinfo() {
	echo phpinfo();
    }
    
}
