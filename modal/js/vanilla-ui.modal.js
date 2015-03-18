(function(){

    /**
    * wshVanillaModal Module
    */

    var wshVanillaModal = function(){

        var self = this,
                settings = {
                    activeModal : null,
                };

        var domElements = {
            modal               : document.querySelectorAll('[ui-modal]'),
            modalBg             : document.querySelectorAll('[ui-modal-bg]')[0],
            modalBtn            : document.querySelectorAll('[ui-modal-btn]'),
            modalClose          : document.querySelectorAll('[ui-modal-close]')
        };

        this.init = function(){
            // Other logic here
            this.bindEvents();
        };

        this.bindEvents = function() {
            document.body.onmouseup = function (event) {
                var target = event.target || event.toElement;
                if (target.hasAttribute("ui-modal-btn")){ self.launchModal() };
                if (target.hasAttribute("ui-modal-close")) { self.closeModal() };
            };
        };

        this.launchModal = function() {
            var targetModalId = event.target.attributes['ui-modal-btn'].value;
            var targetModal = document.querySelectorAll('[ui-modal="' + targetModalId + '"]')[0];
            settings.activeModal = targetModal;

            targetModal.style.display = 'block';
            domElements.modalBg.style.display = 'block';
        };

        this.closeModal = function(){
            settings.activeModal.style.display = 'none';
            domElements.modalBg.style.display = 'none';
        };
    };

    var modal = new wshVanillaModal();
    modal.init();

})();