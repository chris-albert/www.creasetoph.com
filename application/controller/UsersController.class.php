<?php 
require_once('../application/objects/User.class.php');
require_once('../application/model/UsersModel.class.php');
class UsersController extends BaseController{

    public function __construct(&$registry) {
        parent::__construct($registry);
        $this->Model = new UsersModel($registry);
    }
	
    public function view() {
        $this->index();
    }
	
    public function index() {
        $this->loadSRC($this->_registry->request,array(
            'css/users.css'
        ),'css');
        $this->Template->user_links = $this->user_link = $this->Model->getAllUsers();
        $this->Template->link = '/users/user/id/';
        $this->Template->render('users');
    }

    public function login() {
        $user = $this->Model->checkUserLogin($_POST['username'],$_POST['password']);
        if(is_array($user)) {
            $this->User->loginUser($user[0]);
            $this->_registry->json = array('login' => 'success');
            $this->_registry->template = array('signout' => 'signout');
        }else {
            $this->_registry->json = array('login' => 'failure');
        }
        $this->redirect($_POST['referer']);
    }

    public function logout() {
        $this->User->logoutUser();
        $this->_registry->template = array('signin' => 'signin');
        $this->redirect($_POST['referer']);
    }

    public function user() {
        $this->loadSRC($this->_registry->request,array(
            'css/users.css'
        ),'css');
        $this->Template->user_info = $this->Model->getUserInfo($this->request['id']);
        $this->Template->render('user','users');
    }

    public function blog() {
        $this->loadSRC($this->_registry->request, array(
            '../www/css/blog.css'
        ),'css');
        $bounds = $this->Pagination->getPageBounds();
        $ret = $this->Model->getBlogs($this->request['user'],$bounds['first'],$bounds['elements']);
        $this->Template->pagination = $this->Pagination->getPageLinks($ret[1][0]['count']);
        $this->Template->blogs = $ret[0];
        $this->Template->render('blog','users');
    }

    public function signup() {
        $this->loadSRC($this->_registry->request,array(
            'css/users.css'
        ),'css');
        $this->Template->render('signup');
    }

    public function do_signup() {
        print_r($this->_registry->post);
    }
}
