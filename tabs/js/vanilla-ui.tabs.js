'use strict';

(function(){

    /**
    * wshVanillaTabs Module
    */

    var wshVanillaTabs = function(pActiveTabNav, pActiveTabPane, pTabsHook, pActiveTabNavClassName, pActiveTabPaneClassName){

        var self = this;
        var settings = {
                    activeTabNav  : document.getElementById(pActiveTabNav),
                    activeTabPane : document.getElementById(pActiveTabPane),
                    tabsHook: pTabsHook || 'js-tab-nav', 
                    activeTabNavClassName: pActiveTabNavClassName || 'tab-nav__item--current',
                    activeTabPaneClassName: pActiveTabPaneClassName || 'tab-pane--current',
                };
        var ENTER_KEY 		= 13;
        var LEFT_ARROW_KEY  = 37;
        var RIGHT_ARROW_KEY = 39;
       
        this.init = function(){
            this.bindEvents();
            this.showTab(); 
        };

        this.bindEvents = function() {
            
            document.body.onmouseup = function (event) {
                self.checkTarget(event);
            };

            document.body.onkeydown = function(event){
            	if(event.keyCode == ENTER_KEY || event.which == ENTER_KEY) {
            		self.checkTarget(event);
            	}
            	if(event.keyCode == LEFT_ARROW_KEY || event.which == LEFT_ARROW_KEY) {
            		console.log('lefty!');
            	}
            	if(event.keyCode == RIGHT_ARROW_KEY || event.which == RIGHT_ARROW_KEY) {
            		console.log('righty!');
            	}
            };
        };

        this.checkTarget = function(event) {
        	var target = event.target || event.toElement;
                
            if (target.parentNode.classList.contains(settings.tabsHook)){ 
            	self.prepareTab();
            } else {
            	return;
            }
        };

        this.prepareTab = function() {

             var url   			= event.target.href;
             var targetTabNavId = url.substring(url.indexOf('#') + 1);
             var targetTabPane  = document.getElementById(targetTabNavId);

             this.hideTab();

             settings.activeTabNav  = event.target;
             settings.activeTabPane = targetTabPane;

             this.showTab();       
        };

        this.showTab = function(){
        	settings.activeTabNav.className  += (' ' + settings.activeTabNavClassName);
            settings.activeTabPane.className += (' ' + settings.activeTabPaneClassName);

            settings.activeTabNav.setAttribute('aria-selected', 'true');
			settings.activeTabPane.setAttribute('aria-hidden', 'false');
			settings.activeTabNav.focus();
        };

        this.hideTab = function(){

			settings.activeTabNav.setAttribute('aria-selected', 'false');
			settings.activeTabPane.setAttribute('aria-hidden', 'true');
            
            settings.activeTabNav.classList.remove(settings.activeTabNavClassName);
            settings.activeTabPane.classList.remove(settings.activeTabPaneClassName);

        };
    };

    var tabs = new wshVanillaTabs('tab-nav-1', 'tab-pane-1');
    tabs.init();

})();