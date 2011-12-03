<?php

class TestingController extends BaseController{

    private $UsersModel = null;

    public function __construct(&$registry) {
        parent::__construct($registry);
        $this->UsersModel = new UsersModel($registry);
    }

    public function view() {
        $this->index();
    }

    public function index() {
        //Site wide source, this is loaded on every page
        $this->loadSRC($this->_registry->request, array(
            'js/sizzle.js',
            'js/creasetoph_env.js',
			'js/creasetoph_base.js',
            'js/creasetoph_main.js'
		),'js');
        $this->Template->render('home','Testing','../application/view/templates/testing_template.php');
    }

    public function testAjax() {
        echo 'successfull ajax request';
    }

    public function testNav() {
        $file_name = '../application/view/templates/main_template.php';
        include($file_name);
    }

    public function test() {

    }

    public function test2() {
        $this->loadSRC($this->_registry->request, array(
            'js/sizzle.js',
            'js/creasetoph_env.js',
			'js/creasetoph_base.js',
            'js/creasetoph_main.js'
		),'js');
        $this->Template->render(array(
            'user_content' => 'user',
            'blog_content' => 'blog'
        ),'stuff');
    }

}