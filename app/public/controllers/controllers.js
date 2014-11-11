var app = angular.module('BikeshareApp', []);

angular.module('BikeshareApp').controller('IndexCtrl', ['$scope', '$http',
	function($scope, $http) {
		$scope.failureText = '';
		$scope.pageView = 'manage';

		$scope.findAll = function() {
			$http.get('/api/findall').
				success($scope.findAllSuccessHandler).
				error($scope.findAllErrorHandler);
		};

		$scope.findAllSuccessHandler = function(response) {
			$scope.failureText = '';
			//use response to display data
		};

		$scope.findAllErrorHandler = function(response) {
			$scope.failureText = 'bad stuff happened...';
		};

		$scope.switchView = function(view) {
			$scope.pageView = view;
		}
	}
]);