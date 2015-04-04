angular.module('BikeshareServices', ['ngResource'])
    .factory('api', ['$resource',
        function($resource) {
            return {
                Bike: $resource('/api/bike/:bikeID', {}, {update: {method: 'PUT', params: {bikeID: '@bikeID'}}}),
                Bikes: $resource('/api/bike'),
                Docks: $resource('/api/dock/:dockID', {}, {update: {method: 'PUT', params: {dockID: '@dockID'}}}),
                ErrorReport: $resource('/api/errorreport'),
                Transactions: $resource('/api/transaction')
            }
        }
    ]);
