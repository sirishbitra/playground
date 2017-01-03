"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function fixWrapperHeight(){var headerH=62,navigationH=$("#navigation").height(),contentH=$(".content").height();contentH<navigationH&&$("#wrapper").css("min-height",navigationH+"px"),contentH<navigationH&&navigationH<$(window).height()&&$("#wrapper").css("min-height",$(window).height()-headerH+"px"),contentH>navigationH&&contentH<$(window).height()&&$("#wrapper").css("min-height",$(window).height()-headerH+"px")}function setBodySmall(){$(this).width()<769?$("body").addClass("page-small"):($("body").removeClass("page-small"),$("body").removeClass("show-sidebar"))}function configState($stateProvider,$urlRouterProvider,$compileProvider,$urlMatcherFactoryProvider,$httpProvider){$urlMatcherFactoryProvider.strictMode(!1),$httpProvider.defaults.xsrfCookieName="csrftoken",$httpProvider.defaults.xsrfHeaderName="X-CSRFToken",$httpProvider.defaults.withCredentials=!0,$httpProvider.useApplyAsync(!0),$compileProvider.debugInfoEnabled(!0),$urlRouterProvider.otherwise("/index"),$stateProvider.state("bitraz",{abstract:!0,template:'<div ui-view="header" class="header-container"></div><div ui-view="body"></div>',controller:"AppController"}).state("bitraz.main",{abstract:!0,sticky:!0,deepStateRedirect:!0,views:{"header@bitraz":{templateUrl:"views/index/index_header.html",controller:"HeaderController"}}}).state("bitraz.main.index",{url:"/index",data:{pageTitle:"Home",specialClass:"landing-page",activeMenu:"home"},views:{"body@bitraz":{templateUrl:"views/index/index.html",controller:"HomeController"}}}).state("bitraz.main.features",{url:"/features",data:{pageTitle:"Features",specialClass:"landing-page",activeMenu:"features"},views:{"body@bitraz":{templateUrl:"views/index/features.html",controller:"FeatureController"}}}).state("bitraz.main.clients",{url:"/clients",data:{pageTitle:"Clients",specialClass:"landing-page",activeMenu:"clients"},views:{"body@bitraz":{templateUrl:"views/index/clients.html",controller:"ClientController"}}}).state("bitraz.main.contact",{url:"/contact",data:{pageTitle:"Contact",specialClass:"landing-page",activeMenu:"contact"},views:{"body@bitraz":{templateUrl:"views/index/contact.html",controller:"ContactController"}}}).state("bitraz.main.login",{url:"/login",data:{pageTitle:"Login",specialClass:"landing-page",activeMenu:"login"},views:{"body@bitraz":{templateUrl:"views/index/login.html",controller:"LoginController"}}}).state("bitraz.main.analytics",{url:"/analytics?rid",data:{pageTitle:"Analytics",specialClass:"landing-page",activeMenu:"analytics"},views:{"body@bitraz":{templateUrl:"views/index/analytics.html",controller:"AnalyticsController"}}})}function AppController($http,$scope){}function ClientController($http,$scope){}function ContactController($http,$scope){}function LoginController($http,$scope){}function HeaderController($rootScope,$scope,$state,AuthService,appConfig){console.log("HeaderController",$state,appConfig,AuthService),$scope.active=$state.current.data.activeMenu,$rootScope.$on("$stateChangeStart",function(event,toState,toStateParams,fromState,fromStateParams){$scope.active=toState.data.activeMenu})}function FeatureController($http,$scope){}function HomeController($http,$scope){}function appCtrl($http,$scope){console.log($scope,$http)}function AnalyticsController($http,$scope,RidService,$state,$timeout){$scope.rid={},$scope.isLoaded=!1,$scope.init=function(){$scope.rid.id=$state.params.rid||null,$scope.hasAuthentication=!1,$scope.isAuthorized=!1,$scope.rid.id?$scope.validateRid():$scope.isLoaded=!0},$scope.validateRid=function(){var model=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:$scope.rid.id};$scope.error="",!$scope.isAuthorized&&$scope.hasAuthentication&&model.password?RidService.validate(model).$promise.then(function(resp){$scope.isLoaded=!0,$scope.isAuthorized=!!resp.success,$scope.isAuthorized||($scope.error="Invalid Authorization")},function(err){$scope.isLoaded=!0,$scope.error="Something is Wrong!",console.log("failed to validate reference id.")}):$scope.isAuthorized?$scope.isLoaded=!0:RidService.getInfo({id:model.id}).$promise.then(function(resp){$state.go(".",{rid:model.id}),$scope.isLoaded=!0,$scope.hasAuthentication=!!resp.has_authentication,$scope.isAuthorized=!!resp.is_authorized},function(err){$scope.isLoaded=!0,console.log("failed to get reference id info"),$scope.error="Something is Wrong!"})},$scope.init()}function pageTitle($rootScope,$timeout){return{link:function(scope,element){var listener=function(event,toState,toParams,fromState,fromParams){var title="biTRAZ | trace your link";toState.data&&toState.data.pageTitle&&(title="biTRAZ | "+toState.data.pageTitle),$timeout(function(){element.text(title)})};$rootScope.$on("$stateChangeStart",listener)}}}function sideNavigation($timeout){return{restrict:"A",link:function(scope,element){element.metisMenu();var menuElement=$('#side-menu a:not([href$="\\#"])');menuElement.click(function(){$(window).width()<769&&$("body").toggleClass("show-sidebar")})}}}function minimalizaMenu($rootScope){return{restrict:"EA",template:'<div class="header-link hide-menu" ng-click="minimalize()"><i class="fa fa-bars"></i></div>',controller:function($scope,$element){$scope.minimalize=function(){$(window).width()<769?$("body").toggleClass("show-sidebar"):$("body").toggleClass("hide-sidebar")}}}}function sparkline(){return{restrict:"A",scope:{sparkData:"=",sparkOptions:"="},link:function(scope,element,attrs){scope.$watch(scope.sparkData,function(){render()}),scope.$watch(scope.sparkOptions,function(){render()});var render=function(){$(element).sparkline(scope.sparkData,scope.sparkOptions)}}}}function icheck($timeout){return{restrict:"A",require:"ngModel",link:function($scope,element,$attrs,ngModel){return $timeout(function(){var value;return value=$attrs.value,$scope.$watch($attrs.ngModel,function(newValue){$(element).iCheck("update")}),$(element).iCheck({checkboxClass:"icheckbox_square-green",radioClass:"iradio_square-green"}).on("ifChanged",function(event){if("checkbox"===$(element).attr("type")&&$attrs.ngModel&&$scope.$apply(function(){return ngModel.$setViewValue(event.target.checked)}),"radio"===$(element).attr("type")&&$attrs.ngModel)return $scope.$apply(function(){return ngModel.$setViewValue(value)})})})}}}function panelTools($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/panel_tools.html",controller:function($scope,$element){$scope.showhide=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first"),body=hpanel.find("div.panel-body"),footer=hpanel.find("div.panel-footer");body.slideToggle(300),footer.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),hpanel.toggleClass("").toggleClass("panel-collapse"),$timeout(function(){hpanel.resize(),hpanel.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var hpanel=$element.closest("div.hpanel");hpanel.remove()}}}}function panelToolsFullscreen($timeout){return{restrict:"A",scope:!0,templateUrl:"views/common/panel_tools_fullscreen.html",controller:function($scope,$element){$scope.showhide=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first"),body=hpanel.find("div.panel-body"),footer=hpanel.find("div.panel-footer");body.slideToggle(300),footer.slideToggle(200),icon.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),hpanel.toggleClass("").toggleClass("panel-collapse"),$timeout(function(){hpanel.resize(),hpanel.find("[id^=map-]").resize()},50)},$scope.closebox=function(){var hpanel=$element.closest("div.hpanel");hpanel.remove()},$scope.fullscreen=function(){var hpanel=$element.closest("div.hpanel"),icon=$element.find("i:first");$("body").toggleClass("fullscreen-panel-mode"),icon.toggleClass("fa-expand").toggleClass("fa-compress"),hpanel.toggleClass("fullscreen"),setTimeout(function(){$(window).trigger("resize")},100)}}}}function smallHeader(){return{restrict:"A",scope:!0,controller:function($scope,$element){$scope.small=function(){var icon=$element.find("i:first"),breadcrumb=$element.find("#hbreadcrumb");$element.toggleClass("small-header"),breadcrumb.toggleClass("m-t-lg"),icon.toggleClass("fa-arrow-up").toggleClass("fa-arrow-down")}}}}function animatePanel($timeout,$state){return{restrict:"A",link:function(scope,element,attrs){var startAnimation=0,delay=.06,start=Math.abs(delay)+startAnimation;$state.current.name;attrs.effect||(attrs.effect="zoomIn"),delay=attrs.delay?attrs.delay/10:.06,attrs.child?attrs.child="."+attrs.child:attrs.child=".row > div";var panel=element.find(attrs.child);panel.addClass("opacity-0");panel.length*delay*1e3+700;$timeout(function(){panel=element.find(attrs.child),panel.addClass("stagger").addClass("animated-panel").addClass(attrs.effect);var panelsCount=panel.length+10,animateTime=panelsCount*delay*1e4/10;panel.each(function(i,elm){start+=delay;var rounded=Math.round(10*start)/10;$(elm).css("animation-delay",rounded+"s"),$(elm).removeClass("opacity-0")}),$timeout(function(){$(".stagger").css("animation",""),$(".stagger").removeClass(attrs.effect).removeClass("animated-panel").removeClass("stagger")},animateTime)})}}}function landingScrollspy(){return{restrict:"A",link:function(scope,element,attrs){element.scrollspy({target:".navbar-fixed-top",offset:80})}}}function pwCheck(){return{require:"ngModel",link:function(scope,elem,attrs,ctrl){var firstPassword="#"+attrs.pwCheck;elem.add(firstPassword).on("keyup",function(){scope.$apply(function(){var v=elem.val()===$(firstPassword).val();ctrl.$setValidity("pwmatch",v)})})}}}var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();$(document).ready(function(){setTimeout(function(){fixWrapperHeight()},10),setBodySmall()}),$(window).bind("load",function(){$(".splash").css("display","none")}),$(window).bind("resize click",function(){fixWrapperHeight(),setBodySmall(),setTimeout(function(){fixWrapperHeight()},10)}),function(){console.log(window.appConfig.apiUrl),angular.module("bitraz",["routes","bitraz.controllers","bitraz.services","bitraz.directives","bitraz.models"]).constant("appConfig",{apiEndPoint:"local"==window.appConfig.env?"http://192.168.1.66:3301":window.appConfig.apiUrl||"http://192.168.1.66:3301",userInfo:window.appConfig.userInfo||{}}).config(["$qProvider",function($qProvider){$qProvider.errorOnUnhandledRejections(!1)}])}(),angular.module("routes",["ui.router","ngAnimate","ngAria","ngCookies","ngMessages","ngSanitize","ngTouch","ui.bootstrap","ui.grid","ui.bootstrap.modal","ui.bootstrap.tpls","daterangepicker","highcharts-ng","bitraz.rid","bitraz.template"]).config(configState).run(function($rootScope,$state,appConfig){$rootScope.$state=$state,$rootScope.userInfo=appConfig.userInfo}),angular.module("bitraz.controllers",[]).controller("appCtrl",appCtrl).controller("AppController",AppController).controller("HeaderController",HeaderController).controller("HomeController",HomeController).controller("ClientController",ClientController).controller("ContactController",ContactController).controller("FeatureController",FeatureController).controller("LoginController",LoginController).controller("AnalyticsController",AnalyticsController),angular.module("bitraz.models",["bitraz.models.common"]).factory("UsersCollectionModel",["$http","$q","appConfig","UserModel",function($http,$q,appConfig,UserModel){var Users=function(){function Users(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,Users),this.collection=[],this.lastFetchedOn=null}return _createClass(Users,[{key:"getAll",value:function(){var _this=this,getAllDefer=$q.defer();return $http({method:"GET",url:appConfig.apiEndPoint+"/api/Customer"}).then(function(response){var users=[];angular.forEach(response.data,function(user){users.push(new UserModel(user))}),_this.collection=users,getAllDefer.resolve(users)},function(err){getAllDefer.reject(err)}),getAllDefer.promise}}]),Users}();return new Users}]).factory("UserModel",["$http","$q","appConfig",function($http,$q,appConfig){var User=function(){function User(data){_classCallCheck(this,User),this.id=data.id||null,this.UserName=data.UserName,this.Email=data.Email,this.IsActive=data.IsActive||!1}return _createClass(User,[{key:"save",value:function(){var refDefer=$q.defer();return this.id?$http({method:"PUT",url:appConfig.apiEndPoint+"/api/Customer/"+this.id,data:{id:this.id,UserName:this.UserName,Email:this.Email,IsActive:this.IsActive}}).then(function(userObj){console.log("user update",userObj),refDefer.resolve(new UserModel(userObj.data))},function(err){console.log("user update failed",err),refDefer.reject(err)}):$http({method:"POST",url:appConfig.apiEndPoint+"/api/Customer",data:{UserName:this.UserName,Email:this.Email,Password:this.Password,IsActive:this.IsActive}}).then(function(userObj){console.log("user save",userObj),refDefer.resolve(new UserModel(userObj.data))},function(err){console.log("user save failed",err),refDefer.reject(err)}),refDefer.promise}},{key:"resetPassword",value:function(){var refDefer=$q.defer();return $http({method:"PUT",url:appConfig.apiEndPoint+"/api/Users/"+this.id,data:{id:this.id,Password:this.Password}}).then(function(userObj){console.log("user update",userObj),refDefer.resolve(new UserModel(userObj.data))},function(err){console.log("user update failed",err),refDefer.reject(err)}),refDefer.promise}}]),User}();return User}]),angular.module("bitraz.models.common",[]),angular.module("bitraz.services",["bitraz.auth"]),angular.module("bitraz.auth",["ngResource"]).service("AuthService",["$resource","appConfig",function($resource,appConfig){return $resource(appConfig.apiEndPoint+"/rest-auth/login/",{},{login:{method:"post",stripTrailingSlashes:!1,data:{username:"@username",password:"@password"}},details:{method:"get",url:appConfig.apiEndPoint+"/auth/user/details"},updateDetails:{method:"PUT",url:appConfig.apiEndPoint+"/auth/user/update/:id",params:{id:"@id"}},logout:{method:"post",url:appConfig.apiEndPoint+"/rest-auth/logout/"}},{stripTrailingSlashes:!1})}]),angular.module("bitraz.rid",["ngResource"]).service("RidService",["$resource","appConfig",function($resource,appConfig){return $resource(appConfig.apiEndPoint+"/api/rid/",{},{getInfo:{method:"GET",url:appConfig.apiEndPoint+"/api/rid/info/:id"},validate:{method:"POST",url:appConfig.apiEndPoint+"/api/rid/validate/:id"},getSummary:{method:"GET",url:appConfig.apiEndPoint+"/api/Analytics/GETSUMMARY"},getCounts:{method:"GET",url:appConfig.apiEndPoint+"/api/Analytics/GETALLCOUNTS"}},{stripTrailingSlashes:!1})}]),angular.module("bitraz.directives",["bitraz.directives.common"]),angular.module("bitraz.directives.common",[]).directive("pageTitle",pageTitle).directive("sideNavigation",sideNavigation).directive("minimalizaMenu",minimalizaMenu).directive("sparkline",sparkline).directive("icheck",icheck).directive("panelTools",panelTools).directive("panelToolsFullscreen",panelToolsFullscreen).directive("smallHeader",smallHeader).directive("animatePanel",animatePanel).directive("landingScrollspy",landingScrollspy).directive("pwCheck",pwCheck),angular.module("bitraz").component("analyticsLayout",{templateUrl:"views/common/directives/analytics_layout.html",bindings:{campaignId:"<"},controller:["$scope","$rootScope","$uibModal","$timeout","highchartsNG","RidService",function($scope,$rootScope,$uibModal,$timeout,highchartsNG,RidService){var $ctrl=this;console.log("analytics layout",$uibModal),$scope.data={activity:[],locations:[],devices:[],platforms:[]},$scope.date={startDate:moment(),endDate:moment()},$scope.opts={showDropdowns:!0,ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 Days":[moment().subtract(6,"days"),moment()],"Last 30 Days":[moment().subtract(29,"days"),moment()],"This Month":[moment().startOf("month"),moment().endOf("month")],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]},opens:"left",buttonClasses:["btn btn-default"],applyClass:"btn-small btn-primary",cancelClass:"btn-small",format:"MM/DD/YYYY",separator:" to ",locale:{format:"MM/DD/YYYY",separator:" to ",applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",customRangeLabel:"Custom",weekLabel:"W",daysOfWeek:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],firstDay:1},startDate:moment().format("MM/DD/YYYY"),endDate:moment().format("MM/DD/YYYY"),minDate:moment("01/01/2016").format("MM/DD/YYYY"),maxDate:moment().format("MM/DD/YYYY")},$scope.chartConfig={options:{chart:{zoomType:"x"},title:{text:"user activities over time"},subtitle:{text:void 0===document.ontouchstart?"Click and drag in the plot area to zoom in":"Pinch the chart to zoom in"},xAxis:{type:"datetime"},yAxis:{title:{text:"Counts"}},legend:{enabled:!1},plotOptions:{area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,Highcharts.getOptions().colors[0]],[1,Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]]},marker:{radius:2},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null}}},series:[{type:"area",name:"Count",data:$scope.data.activity}]},$scope.deviceConfig={options:{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{size:"75%",allowPointSelect:!0,cursor:"pointer",dataLabels:{crop:!0,enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %",style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"}},showInLegend:!1}}},series:[{name:"Platforms",colorByPoint:!0,data:$scope.data.platforms}]},$scope.platformConfig={options:{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:""},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{size:"75%",allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,format:"<b>{point.name}</b>: {point.percentage:.1f} %",style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"}},showInLegend:!1}}},series:[{name:"Brands",colorByPoint:!0,data:$scope.data.platforms}]},$scope.locationConfig={options:{colors:["rgba(19,64,117,0.05)","rgba(19,64,117,0.2)","rgba(19,64,117,0.4)","rgba(19,64,117,0.5)","rgba(19,64,117,0.6)","rgba(19,64,117,0.8)","rgba(19,64,117,1)"],title:{text:""},mapNavigation:{enabled:!1},legend:{title:{text:"Visitors",style:{color:Highcharts.theme&&Highcharts.theme.textColor||"black"}},align:"left",verticalAlign:"bottom",floating:!0,layout:"vertical",valueDecimals:0,backgroundColor:Highcharts.theme&&Highcharts.theme.legendBackgroundColor||"rgba(255, 255, 255, 0.85)",symbolRadius:0,symbolHeight:14},colorAxis:{dataClasses:[{from:0,to:3},{from:3,to:10},{from:10,to:30},{from:30,to:100},{from:100,to:300},{from:300,to:1e3},{from:1e3}]}},chartType:"map",series:[{allAreas:!0,data:$scope.data.locations,mapData:Highcharts.maps["custom/world"],joinBy:["iso-a2","code"],animation:!0,name:"Visitors",states:{hover:{color:"#a4edba"}},tooltip:{valueSuffix:""}}]},$ctrl.$onInit=function(){$ctrl.params={Uniqueid:$ctrl.campaignId,DateFrom:$scope.date.startDate.format("YYYY-MM-DD"),DateTo:$scope.date.endDate.format("YYYY-MM-DD")},$ctrl.loadData($ctrl.params)},$ctrl.refreshCharts=function(){$scope.locationConfig.series[0].data=$scope.data.locations,$scope.platformConfig.series[0].data=$scope.data.platforms,$scope.deviceConfig.series[0].data=$scope.data.platforms,$scope.chartConfig.series[0].data=$scope.data.activity},$ctrl.loadData=function(params){RidService.getSummary({Uniqueid:params.campaignId}).$promise.then(function(resp){$ctrl.summary=resp,$ctrl.reflow()},function(err){console.log("failed to load summary",err)}),RidService.getCounts(params).$promise.then(function(resp){$scope.data=resp,$ctrl.refreshCharts(),$ctrl.reflow()},function(err){console.log("failed to load summary",err)}),$timeout($ctrl.tick,tickInterval)},$ctrl.reflow=function(){_.forEach(Highcharts.charts,function(chart){chart&&chart.reflow()})};var tickInterval=1e3,timeLimit=10;$ctrl.tick=function(){$ctrl.timeLeft--,0==$ctrl.timeLeft?$ctrl.resetTime():$timeout($ctrl.tick,tickInterval)},$ctrl.timeLeft=timeLimit,$ctrl.resetTime=function(){$ctrl.timeLeft=timeLimit,$ctrl.$onInit()}}]});