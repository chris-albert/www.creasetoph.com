(function() {
	C$.inherit("VideoController","CreasetophController").prototype = {
        Events: {
            click: "onClick"
        },
        indent: 10,
		load_library: function(library) {
			console.log("in video load library");
            if(typeof library !== "undefined") {
                this.createElsFromObj(this.element,library);
            }
		},
        createElsFromObj: function(el,obj,i) {
            i = i || 0;
            C$.foreach(obj,function(k,v) {
                if(typeof v === "object") {
                    var new_el = $().new_el({
                        type: "div",
                        text: k,
                        attributes: {
                            path: k,
                            style: "margin-left: " + (i * this.indent) + "px;"
                        }
                    });
                    el.append(new_el);
                    this.createElsFromObj(new_el,v, i + 1);
                }else {
                    $(el).append($().new_el({
                        type: "div",
                        text: v,
                        attributes: {
                            path: v,
                            style: "margin-left: " + (i * this.indent) + "px;"
                        }
                    }));
                }
            },this);
        },
        onClick: function(e) {
            console.log("on click");
            var path = this.getParentPath(e.target);    
            path.reverse();
            var url = '/video/stream/' + encodeURI(path.join("/"));
            window.open(url,"_blank");
            //console.log(encodeURI(path.join("/")));
        },
        getParentPath: function(el,path) {
            //var path = "";
            path = path || [];
            if(el != this.element) {
                if(el.parentNode) {
                    path.push(el.getAttribute("path"));
                    this.getParentPath(el.parentNode,path);
                }
                return path;
            }
        }
	};
})();
