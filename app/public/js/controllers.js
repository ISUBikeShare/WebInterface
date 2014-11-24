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
			$scope.failureText = 'Page needs to be implemented';
		}])


	.controller('DockCtrl', ['$scope', 'api',
		function($scope, api) {
			$scope.failureText = 'Page needs to be implemented';
		}
	]);