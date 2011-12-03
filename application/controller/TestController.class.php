<?php 

class TestController extends BaseController{
	
	public function __construct(&$registry) {
		parent::__construct($registry);
	}
	
	public function view() {
		$this->index();
	}
	
	public function index() {
		echo "Testing Framework:...<br />";


		
	}
	
	public function echoArgs($args) {
		echo 'Args: <pre>';
		print_r($args);
		echo '</pre>';
	}
	
}



