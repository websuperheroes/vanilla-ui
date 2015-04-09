(function(){

    /**
    * wshGrowArea Module
    */

    var wshGrowArea = function(){

                var self        = this;
                var domElements = {
                                    textareas: document.querySelectorAll('[ui-growarea]')
                                   };

                this.init = function(){
                    this.bindEvents();
                };

                this.bindEvents = function() {
                    document.body.onkeyup = function (event) {
                        var target = event.target || event.toElement;
                        if (target.hasAttribute("ui-growarea")){

                            self.grow( target );

                        } else {
                            return;
                        };
                    };
                };

                this.grow = function( target ) {

                     target.style.height = (target.scrollHeight)+"px";

                };
            };

            var grower = new wshGrowArea();
            grower.init();

        })();