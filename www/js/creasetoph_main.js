/**
 * This is where the sitewide js will be
 * @autor creasetoph
 */
(function(){

    C$.inherit('CreasetophBody','CreasetophController').prototype = {
        cursor : false,
        Events : {},
        onClick: null
    };

    C$.inherit('NavSlide',['Animation','CreasetophLink']).prototype = {
        properties: {top: -40},
        time      : 1000,
        Events: {
            'click'     : 'onClick',
            'mouseover' : 'onMouseOver',
            'mouseout'  : 'onMouseOut'
        },
        onMouseOver: function(e) {
            if(!this.is_current(e.target_element)) {
                this.forward(e.target_element);
            }
        },
        onMouseOut: function(e) {
            if(!this.is_current(e.target_element)) {
                this.backward(e.target_element);
            }
        },
        is_current: function(el) {
            if($(el).get_attribute('current') === 'true') {
                return true;
            }
            return false;
        },
        set_current: function(name) {
            if(this.current) {
               this.backward($('[current=true]').set_attribute('current',''));
            }
            if($('[link=' + name + ']')) {
                this.forward($('[link=' + name + ']').set_attribute('current','true'));
                this.current = name;
            }
        }
    };

    C$.inherit('SignInDialog','CreasetophDialogCustom').prototype = {
        dynamic_events              : true,
        dialog_height               : 80,
        dialog_width                : '',
        dialog_min_height           : 0,
	dialog_min_width	    : 100,
        dialog_custom_base_class    : '',
        dialog_center               : false,
        dialog_resizeable           : false,
        dialog_show_header          : true,
        dialog_minimizable          : true,
        dialog_minimized            : true,
        dialog_no_overflow          : true,
        dialog_fixed                : true,
        dialog_moveable             : false,
        dialog_closeable            : false,
	dialog_top		    : 194,
        dialog_header_text          : function() {
             var header = $('[cache=sign_in] > *').get_attribute('class').split('_');
             return header[0].charAt(0).toUpperCase() + header[0].slice(1) +' ' + header[1].charAt(0).toUpperCase() + header[1].slice(1);
        },
        dialog_left: function() {
            var nav = $('.nav_container');
            return  nav.offsetLeft + nav.offsetWidth ;
        },
        dialog_content: function() {
            return $('[cache=sign_in]').innerHTML;
        }
    };
    
    C$.inherit('SignInUsername', 'CreasetophTextBase').prototype = {
        validate_me  : true,//not used yet
        validate_form: true,//not used yet
        validate: function() {
            if(this.element.value.length === 0 || this.element.value === this.default_value) {
                return 'Enter a username';
            }else {
                return true;
            }
        }
    };

    C$.inherit('SignInPassword', 'CreasetophTextBase').prototype = {
        type    : 'password',
        validate: function() {
            if(this.element.value.length === 0 || this.element.value === this.default_value) {
                return 'Enter a password';
            }else {
                return true;
            }
        }
    };

    C$.inherit('SignOutController','CreasetophJsonLink').prototype = {
        onReturn: function(json) {
            var sign_in_dialog = C$.find_object('SignInDialog').prototype;
            $(sign_in_dialog.dialog.header.header_text).set('Sign In');
            sign_in_dialog.dialog.body.set_content(json.insert_ui.signin);
            sign_in_dialog.dialog.minimize();
            this.Model.insert_ui('.main_container',json.insert_ui.content);
            document.title = json.title;
        }
    };

    C$.inherit('SignInForm','CreasetophForm').prototype = {
        onSubmitReturn: function(json) {
            if(json.login === 'success') {
                var sign_in_dialog = C$.find_object('SignInDialog').prototype;
                $(sign_in_dialog.dialog.header.header_text).set('Sign Out');
                sign_in_dialog.dialog.body.set_content(json.insert_ui.signout);
                sign_in_dialog.dialog.minimize();
                this.Model.insert_ui('.main_container_canvas',json.insert_ui.content);
                document.title = json.title;
            }else if(json.login === 'failure') {
                
            }
        }
    };

    C$.inherit('SignUpForm','CreasetophForm');

    C$.inherit('SignUpController','CreasetophController');

    C$.inherit('CreasetophBlogLink','CreasetophLink');

    C$.inherit('LightBoxController', 'CreasetophDialogMoveable').prototype = {
        dialog_center: true,
        dialog_height: '',
        dialog_width: '',
        dialog_header_text: 'Loading...',
        dialog_resizeable : false,
        dialog_content: '<img class="lightbox_main_img" src="../images/loading15.gif" />',
        images: [],
        current_image: 0,
        screen_padding: 100,
        image_el: null,
        dialog_mask  : true,
        dialog_zindex: 51,
        on_build: function() {
            var path = '/pictures/getUserImage/h/' + (this.dialog.view.y - this.screen_padding) + '/w/' + (this.dialog.view.x - this.screen_padding) + $(this.target_element).get_attribute('link') +'_';
            this.image_el =  $('.lightbox_main_img');
            this.current_image = this.images.push(new Image()) - 1;
            this.images[this.current_image].src = path;
            this.images[this.current_image].onload = this.on_image_load;
        },
        on_image_load: function() {
            var self = creasetoph.LightBoxController.prototype,
                img = self.images[self.current_image];
            self.dialog.width = img.width;
            self.dialog.height = img.height;
            self.dialog.header.set_text('');
            self.dialog.center_dialog();
            self.image_el.src = img.src;
            self.add_nav_buttons();
        },
        add_nav_buttons: function() {
            var dialog = this.dialog.container;
            debugger;
        }
    };
})();
