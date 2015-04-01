angular.module('BikeshareServices', ['ngResource'])
    .factory('api', ['$resource',
        function($resource) {
            return {
                AddBikes: $resource('/api/createbike'),
                AddDocks: $resource('/api/createdock'),
                BikeDamage: $resource('/api/setbikedamage'),
                Bikes: $resource('/api/findallbikes'),
                Docks: $resource('/api/findalldocks'),
                ErrorReport: $resource('/api/findallerrorreports'),
                Transactions: $resource('/api/findalltransactions')
            }
        }
    ]);