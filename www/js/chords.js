(function() {
    C$.inherit('chords','').prototype = {
        notes: {
            0:  ['b+','c' ],
            1:  ['c+','d-'],
            2:  ['d'],
            3:  ['d+','e-'],
            4:  ['e' ,'f-'],
            5:  ['e+','f' ],
            6:  ['f+','g-'],
            7:  ['g'],
            8:  ['g+','a-'],
            9:  ['a'],
            10: ['a+','b-'],
            11: ['b' ,'c-']
        },
        chromatic: ['c','d','e','f','g','a','b'],
        scales : {
            major:      [0,2,4,5,7,9,11],
            minor:      [0,2,3,5,7,8,10],
            ionian:     [0,2,4,5,7,9,11], //same as major
            aeolian:    [0,2,3,5,7,8,10], //same as minor
            dorian:     [0,2,3,5,7,9,10],
            phrygian:   [0,1,3,5,7,8,10],
            lydian:     [0,2,4,6,7,9,11],
            mixolydian: [0,2,4,5,7,9,10],
            locrian:    [0,1,3,5,6,8,10],
            h_minor:    [0,2,3,5,7,8,11]
        },
        chords: {
            major:    [0,4,7],
            minor:    [0,3,7],
            dim:      [0,3,6],
            dom7:     [0,4,7,10],
            dim7:     [0,3,6,9],
            min7:     [0,3,7,10],
            aug5:     [0,4,8],
            maj7:     [0,4,7,11],
            maj6:     [0,4,7,9],
            dom9:     [0,2,4,7,10], //2 is the 9
            min6:     [0,3,7,9],
            sus2:     [0,2,7],
            sus4:     [0,5,7],
            sus7:     [0,5,7,10],
            dom7aug5: [0,4,8,10],
            dom7dim5: [0,4,6,10],
            min7dim5: [0,3,6,10],
            maj9:     [0,2,4,7,11]  //2 is the 9
        },
        init: function() {
//            var scale = this.get_scale('e','h_minor');
//            var scale_clean = this.clean_scale(scale);
//            var chords = this.get_chords(scale);
//            debugger;
        },
        get_all: function(key,scale) {
            var chords = {};
            chords.scale = this.get_scale(key,scale);
            chords.scale_clean = this.clean_scale(chords.scale);
            chords.chords = this.get_chords(chords.scale);
            return chords;
        },
        get_chords: function(scale) {
            var clean = this.clean_scale(scale),
                chords = {};
            for(var i in clean) {
               chords[clean[i]] = this.check_chords(scale, this.get_chord_map(clean[i]));
            }
            return chords;
        },
        check_chords: function(scale,chords) {
            var flat_scale = this.flatten_scale(scale),good_chords = {},good = true;
            for(var i in chords) {
                good = true;
                for(var c in chords[i]) {
                    if(typeof flat_scale[chords[i][c][0]] === 'undefined') {
                        good = false;
                        break;
                    }
                }
                if(good) {
                    good_chords[i] = this.clean_chord(chords[i],scale);
                }
            }
            return good_chords;
        },
        clean_chord: function(chord,scale) {
            var clean = this.clean_scale(scale),
                flat_scale = this.flatten_clean_scale(clean),
                cleaned_chord = [];
            for(var i in chord) {
                if(typeof flat_scale[chord[i][0]] !== 'undefined') {
                    cleaned_chord[i] = chord[i][0];
                }else {
                    cleaned_chord[i] = chord[i][1];
                }
            }
            return cleaned_chord;
        },
        flatten_scale: function(scale) {
            var flat = {};
            for(var i in scale) {
                flat[scale[i][0]] = '';
                if(scale[i][1] !== undefined) {
                    flat[scale[i][1]] = '';
                }
            }
            return flat;
        },
        flatten_clean_scale: function(scale) {
            var flat = {};
            for(var i in scale) {
                flat[scale[i]] = i;
            }
            return flat;
        },
        get_chord_map: function(note) {
            var chord_map = [];
            for(var i in this.chords) {
                chord_map[i] = this.get_chord(note,this.chords[i]);
            }
            return chord_map;
        },
        get_chord: function(note,map) {
            var chord = [],
                offset = this.get_start(note);
            for(var i in map) {
                chord.push(this.notes[this.get_index(map[i],offset)]);
            }
            return chord;
        },
        clean_scale: function(scale) {
            var reg_ex = /\-|\+/;
            var clean = [];
            for(var i in scale) {
                if(scale[i][0].search(reg_ex) === -1) {
                    clean.push(scale[i][0]);
                }else if(scale[i][1] && scale[i][1].search(reg_ex) === -1) {
                    clean.push(scale[i][1]);
                }else {
                    if(scale[i][0][0] === clean[clean.length - 1][0]) {
                        clean.push(scale[i][1]);
                    }else {
                        clean.push(scale[i][0]);
                    }
                }
            }
            return clean;
        },
        get_start: function(start) {
            for(var i in this.notes) {
                if(this.notes[i][0] === start || this.notes[i][1] === start) {
                    return i;
                }
            }
        },
        get_index: function(index,offset) {
            if((parseInt(index) + parseInt(offset)) < 12) {
                return parseInt(index) + parseInt(offset);
            }else {
                return index - (12 - offset);
            }
        },
        get_scale: function(key,mode) {
            var scale = [], test = [],
                offset = this.get_start(key);
            for(var i in this.scales[mode]) {
                scale.push(this.notes[this.get_index(this.scales[mode][i],offset)]);
            }
            return scale;
        }
    };

    C$.inherit('ProcessScaleController','CreasetophController').prototype = {
        type: 'numbers',
        current_chords: {},
        Events: {
            'click': 'onClick'
        },
        onClick: function(e) {
            this.current_chords = this.get_chords();
            this.create_chart(this.current_chords);
            this.set_keyboard(this.current_chords.scale_clean);
            this.set_fretboard(this.current_chords.scale_clean);
        },
        get_chords: function() {
             var key = $('.key_select').get(),
                 scale = $('.scale_select').get(),
                 type = $('.type_select').get(),
                 chords = C$.find_object('chords').prototype.get_all(key,scale);
             this.type = type;
             return chords;
        },
        set_keyboard: function(scale) {
            C$.find_object('KeyboardController').prototype.clear_keys();
            C$.find_object('KeyboardController').prototype.set_keys(scale);
        },
        set_fretboard: function(scale) {
            C$.find_object('FretboardController').prototype.clear_frets();
            C$.find_object('FretboardController').prototype.set_frets(scale);
        },
        create_chart: function(chords) {
            var child = $('.chord_chart_container > div');
            if(child !== undefined) {
                $('.chord_chart_container').removeChild(child);
            }
            var container = document.createElement('div');
            var create_chords = function(note) {
                var chord_container = document.createElement('span');
                for(var i in chords.chords[note]) {
                    var chord = document.createElement('div'),
                        notes = document.createElement('div');
                    notes.innerHTML = chords.chords[note][i].join(',');
                    notes.style.marginLeft = '30px';
                    notes.style.fontSize = '0.8em';
                    chord.innerHTML = i;
                    chord.style.marginLeft = '20px';
                    chord.style.fontSize = '.8em';
                    $(chord).set_attribute('controller','ChordController').bind_controller();
                    chord_container.appendChild(chord);
                    chord_container.appendChild(notes);
                }
                return chord_container;
            },div,note;
            var title = document.createElement('div');
            var notes = document.createElement('div');
            var chord_title = document.createElement('div');
            title.innerHTML = 'Notes';
            $(title).set_attribute('controller','NotesController').bind_controller();
            
            chord_title.innerHTML = 'Chords';
            notes.innerHTML = chords.scale_clean.join(',');
            notes.style.fontSize = '.8em';
            notes.style.marginLeft = '20px';
            container.appendChild(title);
            container.appendChild(notes);
            container.appendChild(chord_title);
            for(var i in chords.chords) {
                div = document.createElement('div');
                note = document.createElement('span');
                note.innerHTML = i;
                div.appendChild(note);
                div.appendChild(create_chords(i));
                div.style.width = '140px';
                div.style.cssFloat = 'left';
                container.appendChild(div);
            }
            $(container).add_class('clearfix');
            $('.chord_chart_container').appendChild(container);
        }
    };

    C$.inherit('KeyboardController','CreasetophController').prototype = {
        Events: {
            click: 'onClick'
        },
        onClick: function(e) {
        },
        clear_keys: function() {
            var notes = $('.keyboard div span');
            for(var i in notes) {
                notes[i].innerHTML = '';
            }
        },
        set_keys: function(notes) {
            var tmp,note;
            for(var i in notes) {
                note = notes[i].replace('+','s');
                note = note.replace('-','l');
                tmp = $('.keyboard .' + note + ' span');
                tmp[0].innerHTML = this.print_key(i,note);
                tmp[1].innerHTML = this.print_key(i,note);
            }
        },
        print_key: function(num,let) {
            if(C$.find_object('ProcessScaleController').prototype.type === 'letters') {
                let = let.replace('s','+');
                let = let.replace('l','-');
                return let;
            }else {
                return (num === '0') ? 'R' : (parseInt(num) + 1);
            }
        }
        
    };

    C$.inherit('NotesController', 'CreasetophController').prototype = {
        Events: {
            click: 'onClick'
        },
        onClick: function(e) {
            var chords = C$.find_object('ProcessScaleController').prototype.get_chords();
            C$.find_object('ProcessScaleController').prototype.type = $('.type_select').get();
            C$.find_object('KeyboardController').prototype.clear_keys();
            C$.find_object('KeyboardController').prototype.set_keys(chords.scale_clean);
        }
    };

    C$.inherit('ChordController', 'CreasetophController').prototype = {
        Events: {
            click: 'onClick'
        },
        onClick: function(e) {
            var chord = $(e.controlled_by_element).get(),
                root = $($(e.controlled_by_element).parentNode.parentNode.firstChild).get(),
                this_chord = this.process_chord(C$.find_object('ProcessScaleController').prototype.current_chords.chords[root][chord]);
            C$.find_object('ProcessScaleController').prototype.type = $('.type_select').get();
            C$.find_object('KeyboardController').prototype.clear_keys();
            C$.find_object('KeyboardController').prototype.set_keys(this_chord);
            C$.find_object('FretboardController').prototype.clear_frets();
            C$.find_object('FretboardController').prototype.set_frets(this_chord)
        },
        process_chord: function(chords) {
            var scale = C$.find_object('ProcessScaleController').prototype.current_chords,
                chords_obj = C$.find_object('chords').prototype,
                flat_scale = chords_obj.flatten_clean_scale(scale.scale_clean),
                offset = flat_scale[chords[0]],
                map = [],i;
            for(i in chords) {
                map[this.get_index(flat_scale[chords[i]],offset)] = chords[i];
            }
            return map;
        },
        get_index: function(index,offset) {
            if((parseInt(index) - parseInt(offset)) >= 0) {
                return parseInt(index) - parseInt(offset);
            }else {
                return (parseInt(index) - parseInt(offset)) + 7;
            }
        }
    };

    C$.inherit('FretboardController','CreasetophController').prototype = {
        tuning: ['e','b','g','d','a','e'],
        frets: 20,
        note_width: 14,
        onBind: function() {
            this.set_grid();
        },
        onClick: function(e) {

        },
        set_grid: function() {
            var neck = {},l,i,c,note_width;
            neck.element = $(this.element).get_child('.neck');
            neck.strings = {};
            neck.strings.elements = $(this.element).get_child('.string');
            neck.frets = {};
            neck.frets.elements = $(this.element).get_child('.fret');
            neck.strings.position = {
                top: []
            };
            neck.frets.position = {
                left: [0]
            };
            for(i in neck.strings.elements) {
                neck.strings.position.top.push($(neck.strings.elements[i]).offsetTop);
            }
            for(i in neck.frets.elements) {
                neck.frets.position.left.push($(neck.frets.elements[i]).offsetLeft);
            }
            neck.grid = [];
            note_width = this.note_width / 2;
            for(i in neck.strings.position.top) {
                neck.grid[i] = [];
                l = neck.frets.position.left.length;
                for(c = 1;c < l;c++) {
                    neck.grid[i][c] = [
                        neck.strings.position.top[i] - note_width,
                        ((neck.frets.position.left[c] - neck.frets.position.left[c - 1]) / 2) + neck.frets.position.left[c - 1] - note_width
                    ];
                }
            }
            //add element for open string
            for(i in neck.grid) {
                neck.grid[i][0] = [neck.grid[i][1][0],-17];
            }
            this.neck = neck;
        },
        add_note: function(pos,content) {
            var el = document.createElement('div');
            $(el).add_class('note').css({
                'width' : this.note_width + 'px',
                'height': this.note_width + 'px',
                'top'   : pos[0] + 'px',
                'left'  : pos[1] + 'px'
            }).innerHTML = this.print_fret(content);
            $('.neck').appendChild(el);
        },
        add_to_fretboard: function(map) {
            var i;
            for(i in map) {
                this.add_note(this.neck.grid[map[i][0]][map[i][1]],map[i][2]);
            }
        },
        foo: function() {
            this.add_to_fretboard([
                [0,0,'A'],
                [4,6,'D']
            ]);
        },
        clear_frets: function() {
            var notes = $('.neck').get_child('.note'),i;
            for(i in notes) {
                $('.neck').removeChild(notes[i]);
            }
        },
        set_frets: function(notes) {
            this.notes = notes;
            var i,c,map = [],offset,f,note,
                chords = C$.find_object('chords').prototype;
            this.scale = chords.flatten_clean_scale(notes);
                
            for(c in this.tuning) {
                offset = chords.get_start(this.tuning[c]);
                for(f = 0;f < this.frets;f++) {
                    note = chords.notes[this.get_index(f,offset)];
                    if(this.scale[note[0]] !== undefined) {
                        map.push([parseInt(c),f,note[0]]);
                    }else if(this.scale[note[1]] !== undefined) {
                        map.push([parseInt(c),f,note[1]]);
                    }
                }
            }
            this.add_to_fretboard(map);
        },
        get_index: function(index,offset) {
            var chords = C$.find_object('chords').prototype
            if(index < 12) {
                return chords.get_index(index,offset);
            }else {
                return chords.get_index(index - 12,offset);
            }
        },
        print_fret: function(note) {
            if(C$.find_object('ProcessScaleController').prototype.type === 'letters') {
                return note;
            }else {
                return (this.scale[note] == 0) ? 'R': parseInt(this.scale[note]) + 1;
            }
        }
    };
})();