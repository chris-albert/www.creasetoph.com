<?php 
require_once('../application/model/ForumModel.class.php');
class ForumController extends BaseController{
	
	public function __construct(&$registry) {
		parent::__construct($registry);
        $this->Model = new ForumModel($registry);
        $this->loadSRC(
            $this->_registry->request,
            array(
                'css/forum.css'
            ),
            'css'
        );
	}
	
	public function view() {
		$this->index();
	}
	
	public function index() {
        $this->Template->forums = $this->Model->getForums();
        $this->Template->forum_link = '/forum/forum/id/';
        $this->Template->thread_link = '/forum/thread/id/';
        $this->Template->user_link = '/users/user/id/';
        $this->Template->forum_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>->Forum';
		$this->Template->render('forums', 'forum');

	}

    public function forum() {
        $data = $this->Model->getThreads($this->request['id']);
        $forum_name = $data[0][0]['title'];
        $this->Template->threads = $data[1];
        $this->Template->thread_link = '/forum/thread/id/';
        $this->Template->user_link = '/users/user/id/';
        $this->Template->forum_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>-><span class="crease_button" controller="CreasetophLink" link="/forum">Forum</span>->' . $forum_name;
        $this->Template->render('forum');
    }

    public function thread() {
        $bounds = $this->Pagination->getPageBounds();
        $data = $this->Model->getPosts($this->request['id'],$bounds['first'],$bounds['elements']);
        $links = $data[0][0];
        $this->Template->posts = $data[1];
        $this->Template->pagination = $this->Pagination->getPageLinks($data[2][0]['count']);
        $this->Template->forum_nav = '<span class="crease_button" controller="CreasetophLink" link="/">Creasetoph.com</span>-><span class="crease_button" controller="CreasetophLink" link="/forum">Forum</span>-><span class="crease_button" controller="CreasetophLink" link="/forum/forum/id/'.$links['forum_id'].'" >'.$links['forum_name'].'</span>->' . $links['thread_name'];
        $this->Template->post_link = '/forum/post/id/';
        $this->Template->user_link = '/users/user/id/';
        $this->Template->render('thread','forum');
    }

    public function post() {
        $data = $this->Model->getPost($this->request['id']);
        $links = $data[0][0];
        $this->Template->post =$data[1][0];
        $this->Template->user_link = '/users/user/id/';
        $this->Template->forum_nav = '<a href=\'http://'.$_SERVER['SERVER_NAME'].'\'>Creasetoph.com</a>->
                <a href=\'http://'.$_SERVER['SERVER_NAME'].'/forum\'>Forum</a>->
                <a href=\'http://'.$_SERVER['SERVER_NAME'].'/forum/forum/id/'.$links['forum_id'].'\'>'.$links['forum_name'].'</a>->
                <a href=\'http://'.$_SERVER['SERVER_NAME'].'/forum/thread/id/'.$links['thread_id'].'\'>'.$links['thread_name'].'</a>-> View Post';
        $this->Template->render('post','forum');
    }
}