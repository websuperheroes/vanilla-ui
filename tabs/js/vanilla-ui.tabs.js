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
                var target = event.target || event.toElement;
                
	            if (target.parentNode.classList.contains(settings.tabsHook)){ 
	            	self.prepareTab(target);
	            } else {
	            	return;
	            }       
            };

            document.body.onkeydown = function(event){
            	
            	var target = event.target || event.toElement;
                
	            if (target.parentNode.classList.contains(settings.tabsHook)){ 
	            	
	            	if(event.keyCode == ENTER_KEY || event.which == ENTER_KEY) {

	            	}
	            	else if(event.keyCode == LEFT_ARROW_KEY || event.which == LEFT_ARROW_KEY) {

	            		var xTarget = target.previousElementSibling;
	            		
	            		if(!xTarget) {
	            			xTarget = target.parentNode.lastElementChild;
	            		}
	            		target = xTarget;
	            	}
	            	
	            	else if(event.keyCode == RIGHT_ARROW_KEY || event.which == RIGHT_ARROW_KEY) {

	            		var yTarget = target.nextElementSibling;
	            		if(!yTarget) {
	            			yTarget = target.parentNode.firstElementChild;
	            		}
	            		target = yTarget;
	            	}
	            	else {
	            		return;
	            	}
	            	
	            	self.prepareTab(target);
	            } // end if
            };
        };

        this.prepareTab = function(pTarget) {
             var url   			= pTarget.href;
             var targetTabNavId = url.substring(url.indexOf('#') + 1);
             var targetTabPane  = document.getElementById(targetTabNavId);

             this.hideTab();

             settings.activeTabNav  = pTarget;
             settings.activeTabPane = targetTabPane;

             this.showTab();       
        };

        this.showTab = function(){
        	settings.activeTabNav.className  += (' ' + settings.activeTabNavClassName);
            settings.activeTabPane.className += (' ' + settings.activeTabPaneClassName);

            settings.activeTabNav.setAttribute('aria-selected', 'true');
			settings.activeTabPane.setAttribute('aria-hidden', 'false');
			
			// dirty time out, to refactor
			window.setTimeout(function () { 
			    settings.activeTabNav.focus();
			}, 0); 

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