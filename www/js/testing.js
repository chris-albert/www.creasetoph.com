(function() {
     C$.inherit('Person', '').prototype = {
        'name' : 'asd',
        'weight': '',
        'height': '',
        'age': '',
        'init': function(name,weight,height,age) {
            this.name = name;
            this.weight = weight;
            this.height = height;
            this.age = age;
        },
        'say': function() {
            alert(this.name);
        }
    };

    C$.inherit('Student', 'Person').prototype = {
        'grade': '',
        'school': '',
        'init': function(grade, school){
            this.grade = grade;
            this.school = school;
            this.parent.prototype.init.apply(this,['Christoper','111','6-2','23']);
        }
    };

    C$.inherit('Employee', 'Person').prototype = {
        'position': '',
        'salary': '',
        'init': function(position, salary){
            this.position = position;
            this.salary = salary;
        }
    };

     C$.inherit('Boss', 'Employee').prototype = {
        'department': '',
        'init': function(dept) {
            this.department = dept;
        }
    };

    C$.inherit('TestController', '').prototype = {
        'Events': {
            'click': 'onClick',
            'blur' : 'onBlur'
        },
        'onClick' : function() {
            alert("TestController onClick");
            C$.ajax('GET', 'localhost/index/index/testAjax', function(){alert('ajax response');});
        }
    };

    C$.inherit('HomeController', '').prototype = {
        'Events': {
            'click': 'onClick'
        },
        'onClick': function(e) {
            C$.ajax('GET', 'http://localhost/testing/testAjax',
                {
                    'success': function(data) {
                        alert(data);
                    },
                    'failure': function() {
                        alert('ajax failure');
                    }
                }
            );
        }
    };

    C$.do_inheritance('Student');
    C$.do_inheritance('Employee');
    C$.do_inheritance('Boss');
    C$.inherit('test_animation','').prototype = {
        Events: {
            'click' : 'onTween'
        },
        onClick: function(e) {
            var anim = new C$.Animator;
            e.controlled_by_element.style.left = 0;
            var tween = anim.createTween(0,1100);
            var i = 0,
                len = tween.length;
            var animate = function() {
                var step = tween[i];
                e.controlled_by_element.style.left = step;
                i++;
                if(i < len) {
                    setTimeout(animate,80);
                }
            }
            animate();
        },
        click: function(e) {
//            debugger;
            this.frame_rate = 20;
            this.speed = 200;
            this.start = 0;
            this.end = 1000;
            this.diff = this.end - this.start;
            this.total_time = this.diff / (this.speed * .01);
            this.frames = this.total_time / this.frame_rate;
            var step = this.diff / this.frames;
            var finish = this.end;
            var fr = this.frame_rate;
            var i = this.start
            var animate = function() {
                e.controlled_by_element.style.left = i + 'px';
                i += step;
                if(i < finish) {
                    setTimeout(animate,this.fr);
                }
            };
            animate();

        },
        onTween: function(e) {
//            debugger;
            var fps = 16,//frames per seconds
                refresh = 1 / fps,//seconds per frame
                speed = 200,//pixels per second
                start = 1,
                end = 200,
                diff = end - start,
                time = diff / speed,
                frames = fps * time,
                tween = diff / frames
                i = start;
             var tweener = function(index) {
                return index + (tween);
             };
             var animate = function() {
                e.controlled_by_element.style.left = i + 'px';
                i = tweener(i);
                if(i < end) {
                    setTimeout(animate,refresh);
                }
            };
            animate();
        }
    };

})();
