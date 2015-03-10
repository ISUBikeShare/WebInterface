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
            $scope.bikePageView =

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
                    api.BikeDamage.save(
                        {bikeID: bikeID, isDamaged: isDamaged},
                        function(response) {
                            $scope.getBikes();
                        },
                        function(response) {
                            //this is the error handler.
                            //it will need to do something different eventually
                            $scope.getBikes();
                        }
                    )
                }
                else if(!isDamaged && confirm('Unlock bike ' + bikeID + '?')){
                    api.BikeDamage.save(
                        {bikeID: bikeID, isDamaged: isDamaged},
                        function(response) {
                            $scope.getBikes();
                        },
                        function(response) {
                            //this is the error handler.
                            //it will need to do something different eventually
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