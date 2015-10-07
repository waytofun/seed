'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', ['ui.router'])
	
app.config(['$urlRouterProvider',"$stateProvider", function($urlRouterProvider,$stateProvider){
	$urlRouterProvider.when('/','/home');

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl: 'views/home.html',
			controller: function($scope){
				$scope.test=function(){
					window.alert('clicked');
					$scope.a.hi=!$scope.a.hi;
				}
				$scope.test2=function(){
					window.alert('clicked too');
					
				}
			}
		})
		.state('state1',{
			url:'/state1',
			templateUrl:'views/state1.html',
			controller: function($scope){
				$scope.things=['A','B','C']
			}
		})
		.state('state1.substate1',{
			url:'/substate1',
			templateUrl:'views/state1.substate1.html',
			controller: function($scope){
				$scope.morethings=['D','E','F']
			}
		})
		.state('state2',{
			url:'/state2',
			views:{
				'':{
					templateUrl:'views/state2.html'
				},
				'substate1@state2':{
					templateUrl:'views/state2.substate1.html'
				},
				'substate2@state2':{
					templateUrl:'views/state2.substate2.html'
				}
			},
			resolve:{
				 simpleObj:  function(){
            		return {value: 'simple!'};
         		},
         			hello:function($q,$timeout){
					var deferred = $q.defer();
					$timeout(function() {
						deferred.resolve('Hello!');
						window.alert('3sec')
					}, 3000);
					return deferred.promise;
				}
			},
			controller:function($scope,hello){
				$scope.hi=hello;
				window.alert($scope.hi);
			}
		})

}]);
