angular.module('BikeshareControllers', ['ui.router'])
    .controller('TransactionCtrl', ['$scope', 'api',
        function($scope, api) {
            $scope.failureText = '';
            $scope.transactions = [];
            $scope.searchText = '';
            $scope.filteredResults = [];

            $scope.getTransactions = function() {
                $scope.loadingTransactions = true;
                api.Transactions.query(
                    $scope.transactionSuccessHandler,
                    $scope.transactionErrorHandler);
            };

            $scope.transactionSuccessHandler = function(response) {
                $scope.loadingTransactions = false;
                $scope.failureText = '';
                $scope.transactions = response;
            };

            $scope.transactionErrorHandler = function(response) {
                $scope.loadingTransactions = false;
                $scope.failureText = 'There was an error while fetching transactions. For more details, view the error report.';
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
            $scope.newBikeId = '';

            $scope.getBikes = function() {
                $scope.loadingBikes = true;
                api.Bike.query(
                    $scope.bikeSuccessHandler,
                    $scope.bikeErrorHandler
                )
            };

            $scope.bikeSuccessHandler = function(response) {
                $scope.loadingBikes = false;
                $scope.failureText = '';
                $scope.bikes = response;
            };

            $scope.bikeErrorHandler = function(response) {
                $scope.loadingBikes = false;
                $scope.failureText = 'There was an error while fetching bikes. For more details, view the error report.';
            };

            $scope.addBike = function() {
                if($scope.newBikeId != ''){
                    api.Bike.save({bikeID: $scope.newBikeId},
                        $scope.addBikeSuccessHandler,
                        $scope.addBikeErrorHandler
                    )
                } else {
                    $scope.addBikeErrorText = 'Please provide Bike ID.';
                }
            };

            $scope.addBikeSuccessHandler = function(response) {
                $scope.getBikes();
                $scope.failureText = '';
                $scope.successText = 'Bike successfully added';
                $scope.newBikeId = '';
                $('#addBikeModal').modal('hide');
            };

            $scope.addBikeErrorHandler = function(response) {
                $scope.newBikeId = '';
                $scope.successText = '';
                $scope.failureText = 'There was an error while adding a new bike. For more details, view the error report.';
                $('#addBikeModal').modal('hide');
            };

            $scope.openLockModal = function(bike) {
                $scope.bikeToLock = bike;
            };

            $scope.setDamage = function() {
                var payload = {
                    bikeID: $scope.bikeToLock.bikeID,
                    isDamaged: !$scope.bikeToLock.isDamaged,
                    state: $scope.bikeToLock.state,
                    dockID: $scope.bikeToLock.dockID};

                api.Bike.update(payload,
                    function(response) {
                        $scope.successText = 'Successfully updated bike.';
                        $scope.failureText = '';
                        $scope.getBikes();
                        $('#lockBikeModal').modal('hide');
                    },
                    function(response) {
                        $scope.successText = '';
                        $scope.failureText = 'There was an error while updating the bike. For more details, view the error report.';
                        $('#lockBikeModal').modal('hide');
                    }
                );
            };

            $scope.setBikeToEdit = function(bike) {
                $scope.bikeToEdit = angular.copy(bike);
            };

            $scope.editBike = function() {
                api.Bike.update(
                    $scope.bikeToEdit,
                    function(resp) {
                        $scope.getBikes();
                        $scope.failureText = '';
                        $scope.successText = 'Bike successfully updated.';
                        $('#editBikeModal').modal('hide');
                    },
                    function(resp) {
                        $scope.failureText = 'There was an error while updating the bike. For more details, view the error report.';
                        $scope.successText = '';
                        $('#editBikeModal').modal('hide');
                    }
                );
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
                $scope.loadingDocks = true;
                api.Dock.query(
                    $scope.getDocksSuccessHandler,
                    $scope.getDocksFailureHandler
                )
            };

            $scope.getDocksSuccessHandler = function(response) {
                $scope.loadingDocks = false;
                $scope.docks = response;
            };

            $scope.getDocksFailureHandler = function(response) {
                $scope.loadingDocks = false;
                $scope.successText = '';
                $scope.failureText = 'There was an error while fetching docks. For more details, view the error report.'
            };

            $scope.getDocks();

            $scope.addDock = function() {
                if($scope.newDock.id != '' && $scope.newDock.location != ''){
                    api.Dock.save({
                            dockID: $scope.newDock.id,
                            location: $scope.newDock.location},
                        $scope.addDockSuccessHandler,
                        $scope.addDockErrorHandler
                    )
                } else {
                    $scope.addDockErrorText = 'Please provide both a dock ID and a location.';
                }
            };

            $scope.addDockSuccessHandler = function(response) {
                $scope.getDocks();
                $scope.newDock = {};
                $scope.successText = 'Dock successfully added.';
                $scope.failureText = '';
                $scope.newBikeId = '';
                $('#addDockModal').modal('hide');
            };

            $scope.addDockErrorHandler = function(response) {
                $scope.newDockId = '';
                $scope.successText = '';
                $scope.failureText = 'There was an error while adding a new dock. For more details, view the error report.';
                $('#addDockModal').modal('hide');
            };

            $scope.editDock = function() {
                api.Dock.update(
                    $scope.dockToEdit,
                    function(resp) {
                        $scope.failureText = '';
                        $scope.successText = 'Dock successfully updated.';
                        $scope.getDocks();
                        $scope.dockToEdit = {};
                        $('#editDockModal').modal('hide');
                    },
                    function(resp) {
                        $scope.successText = '';
                        $scope.failureText = 'There was an error while updating the dock. For more details, view the error report.';
                        $('#editDockModal').modal('hide');
                    }
                );
            };

            $scope.setDockToEdit = function(dock) {
                $scope.dockToEdit = angular.copy(dock);
            };
        }
    ])

    .controller('ErrorReportCtrl', ['$scope', 'api',
        function($scope, api) {
            $scope.errorTypeFilter = '';

            $scope.getErrors = function() {
                $scope.loadingErrors = true;
                api.ErrorReport.query(
                    $scope.getErrorsSuccessHandler,
                    $scope.getErrorsFailureHandler
                )
            };

            $scope.getErrorsSuccessHandler = function(response) {
                $scope.loadingErrors = false;
                $scope.errors = response.reverse();
            };

            $scope.getErrorsFailureHandler = function(response) {
                $scope.loadingErrors = false;
                $scope.failureText = 'There was an error while fetching error reports. Please try again.'
            };

            $scope.getErrors();
        }
    ])

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/transaction');

        $stateProvider
            .state('transaction', {
                url: '/transaction',
                templateUrl: '/transaction.html',
                controller: 'TransactionCtrl'
            })

            .state('bike', {
                url: '/bike',
                templateUrl: '/bike.html',
                controller: 'BikeCtrl'
            })

            .state('dock', {
                url: '/dock',
                templateUrl: '/dock.html',
                controller: 'DockCtrl'
            })

            .state('errorReport', {
                url: '/errorreport',
                templateUrl: '/errorReport.html',
                controller: 'ErrorReportCtrl'
            })
    });
