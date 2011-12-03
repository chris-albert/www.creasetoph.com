<?php 

class EmailController extends BaseController{
	
	public function __construct(&$registry) {
		parent::__construct($registry);
	}
	
	public function view() {
		$this->index();
	}
	
	public function index() {
		$this->Template->render('email');
	}
	
}