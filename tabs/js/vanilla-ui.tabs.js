'use strict';

(function(){

    /**
    * wshVanillaTabs Module
    */

    var wshVanillaTabs = function(){

        var self = this,
                settings = {
                    activeTab : null,
                };

        var domElements = {
            tabNav          : document.querySelectorAll('[ui-tab-nav]'),
            tab             : document.querySelectorAll('[ui-tab]')
        };

        this.init = function(){
            this.bindEvents();
        };

        this.bindEvents = function() {
            document.body.onmouseup = function (event) {
                var target = event.target || event.toElement;
                if (target.hasAttribute('ui-tab-nav')){ self.showTab(); }
            };
        };

        this.showTab = function() {

             var targetTabId = event.target.attributes['ui-tab-nav'].value;
             var targetTabNav = document.querySelectorAll('[ui-tab-nav="' + targetTabId + '"]')[0];
             var targetTab = document.querySelectorAll('[ui-tab="' + targetTabId + '"]')[0];

             this.hideTabs();

             settings.activeTab = targetTab;

             targetTabNav.className += ' tab-nav__item--current';
             targetTab.className += ' tab--current';

        };

        this.hideTabs = function(){

            for (var i = 0, max = domElements.tab.length; i < max; i++) {
                domElements.tab[i].className = domElements.tab[i].className.replace( /(?:^|\s)tab--current(?!\S)/g , '' );

                domElements.tabNav[i].className = domElements.tabNav[i].className.replace( /(?:^|\s)tab-nav__item--current(?!\S)/g , '' );
            }
        };
    };

    var tabs = new wshVanillaTabs();
    tabs.init();

})();