angular.module('BikeshareServices', ['ngResource'])
	.factory('api', ['$resource',
		function($resource) {
			return {
				Transactions: $resource('/api/findalltransactions', {}),
				Bikes: $resource('/api/findallbikes', {}),
				AddBikes: $resource('/api/createbike', {}),
				BikeDamage: $resource('/api/setbikedamage', {}),
				Docks: $resource('/api/findalldocks', {})
			}
		}
	]);