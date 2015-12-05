var app = angular.module('app', []);
app.controller('homepageController', function($scope) {
	this.tabNames = ['home', 'rules', 'cuttle', 'about'];
	this.tabIndex = 0; 
	this.rulesIndex = 0;
	this.signUpEmail;
	this.signUpPass;
	this.loginEmail;
	this.loginPass;

	this.signUp = function() {
		console.log("Inside app.js signUp");
		io.socket.get('/signUp', {
			email: $scope.homepage.signUpEmail,
			pass: $scope.homepage.signUpPass
		}, function(res) {
			console.log(res);
			$scope.homepage.signUpEmail = '';
			$scope.homepage.signUpPass = '';
			//May need $scope.$apply();
		});
	};

	this.login = function() {
		console.log("Inside app.js login");
		console.log($scope.homepage.loginEmail);
		console.log($scope.homepage.loginPass);
		io.socket.get('/login', {
			email: $scope.homepage.loginEmail,
			pass: $scope.homepage.loginPass
		}, function(res) {
			console.log(res);
			$scope.homepage.loginEmail = '';
			$scope.homepage.loginPass = '';
			//May need $scope.$apply();
		});
	};

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