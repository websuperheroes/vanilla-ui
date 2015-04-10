(function(){

    /**
    * wshVanillaDropdowns Module
    */

    var wshVanillaDropdown = function(){

        var self = this;
        var settings = {
            activeDropdown : null,
        };

        var domElements = {
            dropdownTrigger      : document.querySelectorAll('[ui-dropdown-trigger]'),
            dropdown             : document.querySelectorAll('[ui-dropdown]')
        };

        this.init = function(){
            // Other logic here
            this.bindEvents();
        };

        this.bindEvents = function() {
            document.body.onmouseup = function (event) {
                var target = event.target || event.toElement;
                if (target.hasAttribute("ui-dropdown-trigger") && target.className.indexOf('--current') === -1) {
                    self.showDropdown();
                } else {
                    self.hideDropdowns();
                };
            };
        };

        this.showDropdown = function() {

            var targetDropdownId = event.target.attributes['ui-dropdown-trigger'].value;
            var targetDropdownTrigger = document.querySelectorAll('[ui-dropdown-trigger="' + targetDropdownId + '"]')[0]
            var targetDropdown = document.querySelectorAll('[ui-dropdown="' + targetDropdownId + '"]')[0];

            self.hideDropdowns();

            settings.activeDropdown = targetDropdown;

            targetDropdownTrigger.className += " dropdown-trigger--current";
            targetDropdown.className += " dropdown--is-open";

        };

        this.hideDropdowns = function(){

            for (var i = 0, max = domElements.dropdown.length; i < max; i++) {
                domElements.dropdown[i].className = domElements.dropdown[i].className.replace( /(?:^|\s)dropdown--is-open(?!\S)/g , '' );

                domElements.dropdownTrigger[i].className = domElements.dropdownTrigger[i].className.replace( /(?:^|\s)dropdown-trigger--current(?!\S)/g , '' );
            };
        };
    };

    var dropdown = new wshVanillaDropdown();
        dropdown.init();

})();