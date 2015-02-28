angular.module('BikeshareDirectives', []).
	directive('manageTransactions', function() {
		return {
			controller: 'TransactionCtrl',
			restrict: 'E',
			replace: true,
			templateUrl: '/transaction.html'
		}
	}).
	directive('manageBikes', function() {
		return {
			controller: 'BikeCtrl',
			restrict: 'E',
			replace: true,
			templateUrl: '/bike.html'
		}
	}).
	directive('manageDocks', function() {
		return {
			controller: 'DockCtrl',
			restrict: 'E',
			replace: true,
			templateUrl: '/dock.html'
		}
	}).
	directive('damagedBikes', function() {
		return {
			controller: 'DamagedBikeCtrl',
			restrict: 'E',
			replace: true,
			templateUrl: '/damagedbike.html'
		}
	});
