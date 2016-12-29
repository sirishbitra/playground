"use strict";function fixWrapperHeight(){var headerH=62,navigationH=$("#navigation").height(),contentH=$(".content").height();contentH<navigationH&&$("#wrapper").css("min-height",navigationH+"px"),contentH<navigationH&&navigationH<$(window).height()&&$("#wrapper").css("min-height",$(window).height()-headerH+"px"),contentH>navigationH&&contentH<$(window).height()&&$("#wrapper").css("min-height",$(window).height()-headerH+"px")}function setBodySmall(){$(this).width()<769?$("body").addClass("page-small"):($("body").removeClass("page-small"),$("body").removeClass("show-sidebar"))}function configState($stateProvider,$urlRouterProvider,$compileProvider,$urlMatcherFactoryProvider,$httpProvider){$urlMatcherFactoryProvider.strictMode(!1),$httpProvider.defaults.xsrfCookieName="csrftoken",$httpProvider.defaults.xsrfHeaderName="X-CSRFToken",$httpProvider.defaults.withCredentials=!0,$httpProvider.useApplyAsync(!0),$compileProvider.debugInfoEnabled(!0),$urlRouterProvider.otherwise("/index"),$stateProvider.state("bitraz",{abstract:!0,template:'<div ui-view="header" class="header-container"></div><div ui-view="body"></div>',controller:"AppController"}).state("bitraz.main",{abstract:!0,sticky:!0,deepStateRedirect:!0,views:{"header@bitraz":{templateUrl:"views/analytics/header.html",controller:"HeaderController"}}}).state("bitraz.main.index",{url:"/index",data:{pageTitle:"Home",activeMenu:"home"},views:{"body@bitraz":{templateUrl:"views/analytics/index.html",controller:"HomeController"}}}).state("bitraz.main.analytics",{url:"/analytics",data:{pageTitle:"Analytics",activeMenu:"analytics"},views:{"body@bitraz":{templateUrl:"views/analytics/analytics.html",controller:"AnalyticsController"}}}).state("bitraz.main.campaigns",{url:"/campaigns",data:{pageTitle:"Campaigns",activeMenu:"campaigns"},views:{"body@bitraz":{templateUrl:"views/analytics/campaigns.html",controller:"CampaignsController"}}}).state("bitraz.main.users",{url:"/users",data:{pageTitle:"Users",activeMenu:"users"},views:{"body@bitraz":{templateUrl:"views/analytics/users.html",controller:"UsersController"}}}).state("bitraz.main.archieves",{url:"/archieves",data:{pageTitle:"Archieves",activeMenu:"archieves"},views:{"body@bitraz":{templateUrl:"views/analytics/archieves.html",controller:"ArchievesController"}}}).state("bitraz.main.settings",{url:"/settings",data:{pageTitle:"Settings",activeMenu:"settings"},views:{"body@bitraz":{templateUrl:"views/analytics/settings.html",controller:"SettingsController"}}})}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="biTRAZ | trace your link";toState.data&&toState.data.pageTitle&&(title="biTRAZ | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){element.metisMenu();var menuElement=$('#side-menu a:not([href$="\\#"])');menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("show-sidebar")})}}}function minimalizaMenu($rootScope){return{restrict:"EA",template:'<div class="header-link hide-menu" ng-click="minimalize()"><i class="fa fa-bars"></i></div>',controller:function($scope,$element){$scope.minimalize=function(){$(window).width()<769?$("body").toggleClass("show-sidebar"):$("body").toggleClass("hide-sidebar")}}}}function sparkline(){return{restrict:"A",scope:{sparkData:"=",sparkOptions:"="},link:function(scope,element,attrs){scope.$watch(scope.sparkData,function(){render()}),scope.$watch(scope.sparkOptions,function(){render()});var render=function(){$(element).sparkline(scope.sparkData,scope.sparkOptions)}}}}function icheck($timeout){return{restrict:"A",require:"ngModel",link:function($scope,element,$attrs,ngModel){return $timeout(function(){var value;return value=$attrs.value,$scope.$watch($attrs.ngModel,function(newValue){$(element).iCheck("update")}),$(element).iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green"}).on("ifChanged",function(event){if("checkbox"===$(element).attr("type")&&$attrs.ngModel&&$scope.$apply(function(){return ngModel.$setViewValue(event.target.checked)}),"radio"===$(element).attr("type")&&$attrs.ngModel)return $scope.$apply(function(){return ngModel.$setViewValue(value)})})})}}}function panelTools($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/panel_tools.html",controller:function($scope,$element){$scope.showhide=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first"),body=hpanel.find("div.panel-body"),footer=hpanel.find("div.panel-footer");body.slideToggle(300),footer.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),hpanel.toggleClass("").toggleClass("panel-collapse"),$timeout(function(){hpanel.resize(),hpanel.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var hpanel=$element.closest("div.hpanel");hpanel.remove()}}}}function panelToolsFullscreen($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/panel_tools_fullscreen.html",controller:function($scope,$element){$scope.showhide=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first"),body=hpanel.find("div.panel-body"),footer=hpanel.find("div.panel-footer");body.slideToggle(300),footer.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),hpanel.toggleClass("").toggleClass("panel-collapse"),$timeout(function(){hpanel.resize(),hpanel.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var hpanel=$element.closest("div.hpanel");hpanel.remove()},$scope.fullscreen=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first");$("body").toggleClass("fullscreen-panel-mode"),icon.toggleClass("fa-expand").toggleClass("fa-compress"),hpanel.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}function smallHeader(){return{restrict:"A",scope:!0,controller:function($scope,$element){$scope.small=function(){var icon=$element.find("i:first"),breadcrumb=$element.find("#hbreadcrumb");$element.toggleClass("small-header"),breadcrumb.toggleClass("m-t-lg"),icon.toggleClass("fa-arrow-up").toggleClass("fa-arrow-down")}}}}function animatePanel($timeout,$state){return{restrict:"A",link:function(scope,element,attrs){var startAnimation=0,delay=.06,start=Math.abs(delay)+startAnimation;$state.current.name;attrs.effect||(attrs.effect="zoomIn"),delay=attrs.delay?attrs.delay/10:.06,attrs.child?attrs.child="."+attrs.child:attrs.child=".row > div";var panel=element.find(attrs.child);panel.addClass("opacity-0");panel.length*delay*1e3+700;$timeout(function(){panel=element.find(attrs.child),panel.addClass("stagger").addClass("animated-panel").addClass(attrs.effect);var panelsCount=panel.length+10,animateTime=panelsCount*delay*1e4/10;panel.each(function(i,elm){start+=delay;var rounded=Math.round(10*start)/10;$(elm).css("animation-delay",rounded+"s"),$(elm).removeClass("opacity-0")}),$timeout(function(){$(".stagger").css("animation",""),$(".stagger").removeClass(attrs.effect).removeClass("animated-panel").removeClass("stagger")},animateTime)})}}}function landingScrollspy(){return{restrict:"A",link:function(scope,element,attrs){element.scrollspy({target:".navbar-fixed-top",offset:80})}}}function pwCheck(){return{require:"ngModel",link:function(scope,elem,attrs,ctrl){var firstPassword="#"+attrs.pwCheck;elem.add(firstPassword).on("keyup",function(){scope.$apply(function(){var v=elem.val()===$(firstPassword).val();ctrl.$setValidity("pwmatch",v)})})}}}function AppController($http,$scope){}function HeaderController($rootScope,$scope,$state){console.log("HeaderController",$state),$scope.active=$state.current.data.activeMenu,$rootScope.$on("$stateChangeStart",function(event,toState,toStateParams,fromState,fromStateParams){$scope.active=toState.data.activeMenu})}function HomeController($http,$scope){}function AnalyticsController($http,$scope){}function CampaignsController($http,$scope){}function ArchievesController($http,$scope){}function SettingsController($http,$scope){}function UsersController($http,$scope){}function appCtrl($http,$scope){console.log($scope,$http)}$(document).ready(function(){setTimeout(function(){fixWrapperHeight()},10),setBodySmall()}),$(window).bind("load",function(){$(".splash").css("display","none")}),$(window).bind("resize click",function(){fixWrapperHeight(),setBodySmall(),setTimeout(function(){fixWrapperHeight()},10)}),function(){angular.module("bitraz",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngSanitize","ngTouch","ui.bootstrap","ui.grid","ui.bootstrap.modal","ui.bootstrap.tpls"]).constant("appConfig",{apiEndPoint:"http://192.168.1.66:3301"}).config(["$qProvider",function($qProvider){$qProvider.errorOnUnhandledRejections(!1)}])}(),angular.module("bitraz").config(configState).run(function($rootScope,$state){$rootScope.$state=$state}),angular.module("bitraz").directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("minimalizaMenu",minimalizaMenu).directive("sparkline",sparkline).directive("icheck",icheck).directive("panelTools",panelTools).directive("panelToolsFullscreen",panelToolsFullscreen).directive("smallHeader",smallHeader).directive("animatePanel",animatePanel).directive("landingScrollspy",landingScrollspy).directive("pwCheck",pwCheck),angular.module("bitraz").controller("appCtrl",appCtrl).controller("AppController",AppController).controller("HeaderController",HeaderController).controller("HomeController",HomeController).controller("AnalyticsController",AnalyticsController).controller("CampaignsController",CampaignsController).controller("UsersController",UsersController).controller("ArchievesController",ArchievesController).controller("SettingsController",SettingsController),angular.module("bitraz").component("analyticsLayout",{templateUrl:"scripts/directives/common/analytics/layout/analytics_layout.html",bindings:{campaignId:"<"},controller:function($scope,$rootScope,$modal,$timeout){console.log("analytics layout")}});