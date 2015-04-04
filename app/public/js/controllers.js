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
            $scope.bikeToEdit = {};
            $scope.newBikeId = '';
            $scope.bikeToLock = {};

            $scope.getBikes = function() {
                $scope.loadingBikes = true;
                api.Bikes.query(
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
                $scope.failureText = 'There was an error in fetching bikes. Please try again.';
            };

            $scope.addBike = function() {
                if($scope.newBikeId != ''){
                    api.Bikes.save({bikeID: $scope.newBikeId},
                        $scope.addBikeSuccessHandler,
                        $scope.addBikeErrorHandler
                    )
                } else {
                    $scope.addBikeErrorText = 'Please provide Bike ID.';
                }
            };

            $scope.addBikeSuccessHandler = function(response) {
                $scope.getBikes();
                $scope.successText = 'Bike successfully added';
                $scope.newBikeId = '';
                $('#addBikeModal').modal('hide');
            };

            $scope.addBikeErrorHandler = function(response) {
                $scope.newBikeId = '';
                $scope.failureText = 'There was an error in adding a new bike. Please try again.';
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

                api.BikeDamage.update(payload,
                    function(response) {
                        $scope.successText = 'Successfully updated bike.';
                        $scope.failureText = '';
                        $scope.getBikes();
                        $('#lockBikeModal').modal('hide');
                    },
                    function(response) {
                        $scope.successText = '';
                        $scope.lockBikeErrorText = 'There was an error in updating the bike. Please try again.';
                        $('#lockBikeModal').modal('hide');
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
            $scope.newDock = {
                id: '',
                location: ''
            };

            $scope.getDocks = function() {
                $scope.loadingDocks = true;
                api.Docks.query(
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
                $scope.failureText = 'There was an error in fetching docks. Please try again.'
            };

            $scope.getDocks();

            $scope.addDock = function() {
                if($scope.newDock.id != '' && $scope.newDock.location != ''){
                    api.Docks.save({
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
                $scope.successText = 'Dock successfully added';
                $scope.newBikeId = '';
                $('#addDockModal').modal('hide');
            };

            $scope.addDockErrorHandler = function(response) {
                $scope.newDockId = '';
                $scope.failureText = 'There was an error in adding a new dock. Please try again.';
                $('#addDockModal').modal('hide');
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
                $scope.errors = response;
            };

            $scope.getErrorsFailureHandler = function(response) {
                $scope.loadingErrors = false
                $scope.failureText = 'There was an error in fetching error reports. Please try again.'
            };

            $scope.getErrors();
        }
    ]);