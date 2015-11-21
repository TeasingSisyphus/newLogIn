var app = angular.module('app', []);
app.controller('homepageController', function($scope) {
	this.tabNames = ['home', 'rules', 'cuttle', 'about'];
	this.tabIndex = 0; 
	this.rulesIndex = 0;

	this.goToTab = function(index){
		console.log("going to tab: " + $scope.homepage.tabNames[index]);
		$scope.homepage.tabIndex = index;
	};

	this.goToRules = function(index) {
		console.log(index);
		$scope.homepage.tabIndex = 1;
		$scope.homepage.rulesIndex = index;
	};
});