(function(){

    /**
    * wshTextChanger Module
    */

    var wshTextChanger = function(){

         var self = this,
                        settings = {
                            activeText : null,
                            activeInput: null
                        };

                var domElements = {
                    htmlText      : document.querySelectorAll('[ui-changeable-text]'),
                    textInputs    : document.querySelectorAll('[ui-text-changer-input]')
                };

                this.init = function(){
                    // Other logic here
                    this.bindEvents();
                };

                this.bindEvents = function() {
                    document.body.onmouseup = function (event) {
                        var target = event.target || event.toElement;
                        if (target.hasAttribute("ui-changeable-text")){
                            self.changeText();
                        } else if(target == settings.activeInput){
                            console.log('hello!');
                            return;
                        } else {
                            self.commitText();
                        };
                    };
                };

                this.changeText = function() {

                     if(this.targetText) {
                       self.commitText();
                    }

                     this.targetInputId = event.target.attributes['ui-changeable-text'].value;
                     this.targetText = document.querySelectorAll('[ui-changeable-text="' + this.targetInputId + '"]')[0]
                     this.targetInput = document.querySelectorAll('[ui-text-changer-input="' + this.targetInputId + '"]')[0];

                     settings.activeText = this.targetText;
                     settings.activeInput = this.targetInput;

                     this.targetInput.style.display = "block";
                     this.targetInput.focus();
                     this.targetInput.select();
                     this.targetText.style.display = "none";

                };

                this.commitText = function(){

                    var value = this.targetInput.value;

                    this.targetText.innerHTML = value;

                    this.targetInput.style.display = "none";
                     this.targetText.style.display = "block";

                };
            };

            var changer = new wshTextChanger();
            changer.init();

        })();