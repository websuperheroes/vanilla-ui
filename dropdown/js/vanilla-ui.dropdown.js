(function(){

    /**
    * wshVanillaDropdowns Module
    */

    var wshVanillaDropdown = function(pTriggerHook, pDropdownHook, pActiveTriggerClassName, pActiveDropdownClassName){

        var self = this;
        var settings = {
            activeDropdown : null,
            activeDropdownTrigger: null,
            triggerHook: pTriggerHook   || 'js-dropdown-trigger',
            dropdownHook: pDropdownHook || 'js-dropdown', 
            activeTriggerClassName: pActiveTriggerClassName || 'dropdown-trigger--current',
            activeDropdownClassName: pActiveDropdownClassName || 'dropdown--is-open',
        };

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
        };

        this.showDropdown = function(pTarget) {

            var targetDropdownTrigger = pTarget;
            var targetDropdown = pTarget.nextElementSibling;

            self.hideDropdowns();

            settings.activeDropdown 	   = targetDropdown;
            settings.activeDropdownTrigger = targetDropdownTrigger;

            targetDropdownTrigger.className += (' ' + settings.activeTriggerClassName);
            targetDropdown.className += (' ' + settings.activeDropdownClassName);

        };

        this.hideDropdowns = function(){

            if(settings.activeDropdown) {
            	settings.activeDropdown.classList.remove(settings.activeDropdownClassName);
            	settings.activeDropdownTrigger.classList.remove(settings.activeTriggerClassName);
            }

        };
    };

    var dropdown = new wshVanillaDropdown();
        dropdown.init();

})();