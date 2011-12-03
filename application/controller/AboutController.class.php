<?php 

class AboutController extends BaseController{
	
	public function __construct(&$registry) {
		parent::__construct($registry);
	}
	
	public function view() {
		$this->index();
	}
	
	public function index() {
		$this->Template->render('about');
	}

    public function chords() {
        $this->loadSRC($this->_registry->request, array(
            '../www/js/chords.js'
        ),'js');
        
        $this->Template->render('chords');
    }
	
}