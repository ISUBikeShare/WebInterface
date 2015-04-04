angular.module('BikeshareServices', ['ngResource'])
    .factory('api', ['$resource',
        function($resource) {
            return {
                BikeDamage: $resource('/api/bike/:bikeID', {}, {update: {method: 'PUT', params: {bikeID: '@bikeID'}}}),
                Bikes: $resource('/api/bike'),
                Docks: $resource('/api/dock'),
                ErrorReport: $resource('/api/errorreport'),
                Transactions: $resource('/api/transaction')
            }
        }
    ]);
