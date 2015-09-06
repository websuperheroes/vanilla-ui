'use strict';

(function(){

    /**
    * wshVanillaDropdowns Module
    */

    var WshVanillaDropdown = function(pTriggerHook, pDropdownHook, pActiveTriggerClassName, pActiveDropdownClassName){

        var self = this;
        var settings = {
            activeDropdown : null,
            activeDropdownTrigger: null,
            triggerHook: pTriggerHook   || 'js-dropdown-trigger',
            dropdownHook: pDropdownHook || 'js-dropdown', 
            activeTriggerClassName: pActiveTriggerClassName || 'dropdown-trigger--current',
            activeDropdownClassName: pActiveDropdownClassName || 'dropdown--is-open',
        };
        var ESCAPE_KEY		= 27;
        var ENTER_KEY       = 13;
        var SPACEBAR_KEY    = 32;
        var UP_ARROW_KEY    = 38;
        var DOWN_ARROW_KEY  = 40;

        var links = [];
        var linkIndex = 0;

        this.init = function(){
            this.bindEvents();
        };

        this.bindEvents = function() {
            
            document.body.onmouseup = function (event) {
                
                var target = event.target || event.toElement;
                
                if (target.classList.contains(settings.triggerHook) && target.className.indexOf('--current') === -1 ) {
                    self.showDropdown(target);
                } else if (target.classList.contains(settings.dropdownHook) || target.parentNode.classList.contains(settings.dropdownHook)){
                    return;
                } else {
                    self.hideDropdowns();
                }

            };
            document.body.onkeydown = function(event){
            	
            	var target = event.target || event.toElement;

            	if((event.keyCode === ESCAPE_KEY || event.which === ESCAPE_KEY) && settings.activeDropdown){
            		self.hideDropdowns();
            	}
                
	            if (target.classList.contains(settings.triggerHook)){ 
	            	
	            	if(event.keyCode === ENTER_KEY || event.which === ENTER_KEY || event.keyCode === SPACEBAR_KEY || event.which === SPACEBAR_KEY) {
	            		
	            		if(target.classList.contains(settings.activeTriggerClassName)) {

                    		self.hideDropdowns();
	                	
	                	} else {
	                	
	                		self.showDropdown(target);
	                	}

	            	} else if(event.keyCode === DOWN_ARROW_KEY || event.which === DOWN_ARROW_KEY) {

	            		if(target.classList.contains(settings.activeTriggerClassName)) {

                    		links[0].focus();
	                	
	                	} else {
	                	
	                		self.showDropdown(target);
	                		links[0].focus();
	                		
	                	}
	            		
	            	} else {
	            		return;
	            	}
	            } // end if

	            else if(event.keyCode === DOWN_ARROW_KEY || event.which === DOWN_ARROW_KEY) {
	            	
	            	if(linkIndex >= links.length - 1) {
	            		
	            		linkIndex = 0;
	            	
	            	} else {
	            	
	            		linkIndex++;
	            	}
	            	
	            	links[linkIndex].focus();
	            }
	            else if(event.keyCode === UP_ARROW_KEY || event.which === UP_ARROW_KEY) {
	            	
	            	if(linkIndex === 0) {
	            		
	            		linkIndex = links.length - 1;
	            	
	            	} else {
	            	
	            		linkIndex--;
	            	}
	            	
	            	links[linkIndex].focus();
	            }
            };
        };

        this.showDropdown = function(pTarget) {

            var targetDropdownTrigger = pTarget;
            var targetDropdown = pTarget.nextElementSibling;

            self.hideDropdowns();

            settings.activeDropdown 	   = targetDropdown;
            settings.activeDropdownTrigger = targetDropdownTrigger;

            targetDropdownTrigger.className += (' ' + settings.activeTriggerClassName);
            targetDropdown.className += (' ' + settings.activeDropdownClassName);

            links = settings.activeDropdown.getElementsByTagName('a');

        };

        this.hideDropdowns = function(){

            if(settings.activeDropdown) {
            	settings.activeDropdown.classList.remove(settings.activeDropdownClassName);
            	settings.activeDropdownTrigger.classList.remove(settings.activeTriggerClassName);
            }
            links = [];

        };
    };

    var dropdown = new WshVanillaDropdown();
        dropdown.init();

})();