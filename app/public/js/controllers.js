angular.module('BikeshareControllers', [])
	.controller('IndexCtrl', ['$scope',
		function($scope) {
			$scope.pageView = 'transactions';
			$scope.switchView = function(view) {
				$scope.pageView = view;
			}
		}
	])

	.controller('TransactionCtrl', ['$scope', 'api',
		function($scope, api) {
			$scope.failureText = '';
			$scope.transactions = [];
			$scope.searchText = '';
			$scope.filteredResults = [];

			$scope.getTransactions = function() {
				api.Transactions.query(
					$scope.transactionSuccessHandler,
					$scope.transactionErrorHandler);
			};

			$scope.transactionSuccessHandler = function(response) {
				$scope.failureText = '';
				$scope.transactions = response;
			};

			$scope.transactionErrorHandler = function(response) {
				$scope.failureText = 'There was an error in fetching transactions. Please try again.';
			};

			$scope.getTransactions();
		}
	])

	.controller('BikeCtrl', ['$scope', 'api',
		function($scope, api) {
			$scope.failureText = '';
			$scope.successText = '';
			$scope.bikes = [];
			$scope.searchText = '';
			$scope.filteredResults = [];
			$scope.bikePageView =

			$scope.getBikes = function() {
				api.Bikes.query(
					$scope.bikeSuccessHandler,
					$scope.bikeErrorHandler
				)
			};

			$scope.bikeSuccessHandler = function(response) {
				$scope.failureText = '';
				$scope.bikes = response;
			};

			$scope.bikeErrorHandler = function(response) {
				$scope.failureText = 'There was an error in fetching bikes. Please try again.';
			};

			$scope.addBike = function() {
				api.AddBikes.save(
					$scope.addBikeSuccessHandler,
					$scope.addBikeErrorHandler
				)
			};

			$scope.addBikeSuccessHandler = function(response) {
				$scope.getBikes();
				$scope.successText = 'Bike successfully added';
			};

			$scope.addBikeErrorHandler = function(response) {
				$scope.failureText = 'There was an error in adding bike. Please try again.';
			};

			$scope.setDamage = function(bikeID, isDamaged) {
				if(isDamaged && confirm('Lock bike ' + bikeID + '?')){
					api.BikeDamage.save({bikeID: bikeID, isDamaged: isDamaged},
										function(response) {
											$scope.getBikes();
										},
										function(response) {
											$scope.getBikes();
										}
					)
				}
				else if(!isDamaged && confirm('Unlock bike ' + bikeID + '?')){
					api.BikeDamage.save({bikeID: bikeID, isDamaged: isDamaged},
										function(response) {
											$scope.getBikes();
										},
										function(response) {
											$scope.getBikes();
										}
					)
				}
			};

			$scope.getBikes();
		}])

	.controller('DockCtrl', ['$scope', 'api',
		function($scope, api) {
			$scope.failureText = '';
			$scope.successText = '';
			$scope.docks = [];
			$scope.searchText = '';
			$scope.filteredResults = [];

			$scope.getDocks = function() {
                api.Docks.query(
                    $scope.getDocksSuccessHandler,
                    $scope.getDocksFailureHandler
                )
			};

            $scope.getDocksSuccessHandler = function(response) {
                $scope.docks = response;
            };

            $scope.getDocksFailureHandler = function(response) {
                $scope.failureText = 'There was an error in fetching docks. Please try again.'
            };

            $scope.getDocks();
		}
	])

	.controller('DamagedBikeCtrl',  ['$scope', 'api',
		function($scope, api) {

		}]);