/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$state', '$rootScope', '$timeout', 'authFactory', '$anchorScroll', '$location', function (challengeFactory, userFactory, $scope, $state, $rootScope, $timeout, authFactory, $anchorScroll, $location) {

  var self = this;

  self.myChallenges = [];
  self.imposedChallenges = [];
  self.getMyChallengeTimer;
  self.getImposedChallangeTimer;
  var countdownTimeout;

  $scope.$on('$destroy', function (event) {
    $timeout.cancel(countdownTimeout);
  });

  $scope.$on('$destroy',
    function (event) {
      $timeout.cancel(self.getMyChallengeTimer);
      $timeout.cancel(self.getImposedChallangeTimer);
    });

  self.showDetail = function (challenge, event) {
    if (event.toElement.classList[0] !== 'noViewChange') {

      // scroll to top
      $anchorScroll.yOffset = 0
      $location.hash();
      $anchorScroll();

      $rootScope.globalLeftDetailView = false;
      $state.go('home.viewChallengePersonal', {
        id: challenge.id
      });
    }
  };

  self.readMyChallenges = function () {
    if (authFactory.isAuth()) {
      (function tick() {
        challengeFactory.readMyChallenges()
          .then(function (myChallenges) {
            self.myChallenges = myChallenges;
            console.log('get my challenges : ', self.myChallenges);
            self.getMyChallengeTimer = $timeout(tick, 2000);
          })
          .catch(function (err) {
            console.log('error getting myChallenges for current user');
          });
      })();
    }
  };

  self.readImposedChallenges = function () {
    if (authFactory.isAuth()) {
      (function tick() {
        challengeFactory.readImposedChallenges()
          .then(function (imposedChallenges) {
            self.imposedChallenges = imposedChallenges;
            console.log('get imposed challenges : ', self.imposedChallenges);
            self.getImposedChallangeTimer = $timeout(tick, 2000);
          })
          .catch(function (err) {
            console.log('error getting imposedChallenges for current user');
          });
      })();
    }
  };

  self.increaseLike = function (challenge) {
    var updateObj = {
      id: challenge.id,
      likes: ++challenge.likes
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

}]);
