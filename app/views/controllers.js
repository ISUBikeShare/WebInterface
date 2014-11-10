var app = angular.module('BikeshareApp', []);

angular.module('BikeshareApp').controller('IndexCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.text = 'abc';
    }
]);