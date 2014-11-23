angular.module('BikeshareServices', ['ngResource'])
	.factory('api', ['$resource',
		function($resource) {
			return {
				Transactions: $resource('/api/findalltransactions', {})
			}
		}
	]);