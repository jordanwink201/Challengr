/*

challenges.js
Challenges in newsfeed view

*/

angular.module('App.challengeView', [])

.controller('challengeViewCtrl', ['challengeFactory', '$stateParams', '$state', 'challengeService', 'alertService', '$rootScope', '$timeout', function (challengeFactory, $stateParams, $state, challengeService, alertService, $rootScope, $timeout) {

  var self = this;
  self.challenge = null;
  self.remaining = null;
  self.isCurrentUserChallenge = false;
  var currentUserEmail = localStorage.getItem('com.challengr.email');

  self.configureDirective = function () {
    self.readChallenge();
    createCountdown();
  };

  // Read the challenge id from the service object to retreive the correct challenge by it's ID
  self.readChallenge = function () {
    for (var i = 0; i < challengeService.challenges.length; i++) {
      if (challengeService.challenges[i].id == $stateParams.id) {
        self.challenge = challengeService.challenges[i];
        if (currentUserEmail === self.challenge.Challenged.email && !self.challenge.notCompleted && !self.challenge.completed) {
          self.isCurrentUserChallenge = true;
        }
        return;
      }
    }
  };

  // Set Globals back to true
  self.homeSetDetail = function () {
    $rootScope.globalLeftDetailView = true;
    $rootScope.globalRightDetailView = true;
    $rootScope.leftDetailViewRoute = false;
    $state.transitionTo('home');
  };

  self.increaseLike = function () {
    var updateObj = {
      id: self.challenge.id,
      likes: ++self.challenge.likes
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

  self.completed = function () {
    self.challenge.completed = true;
    alertService.addAlert('success', 'Successfuly marked challenge completed', 'icon-checkbox');
    var updateObj = {
      id: self.challenge.id,
      completed: true
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error updating completion status');
      });
  };

  function checkCompletedStatus() {
    var issue = moment(self.challenge.issuedDate);
    var now = moment();
    var difference = now.diff(issue, 'hours');

    if (difference >= 24) {
      if (self.challenge.notCompleted === false && self.challenge.completed === false) {
        // set the challenge to be completed
        self.challenge.notCompleted = true;

        var updateObj = {
          id: self.challenge.id,
          notCompleted: true
        };
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .catch(function (err) {
            console.log('error changing status to completed : ', err);
          });
      }
    }
  }

  function createCountdown() {
    console.log('challenge : ', self.challenge);
    var expire = moment(self.challenge.expiresDate);
    var now = moment();
    var interval = -1;
    var counter = moment.duration(expire.diff(now), 'ms');

    (function tick() {
      counter = moment.duration(counter.asMinutes() + interval, 'minutes');
      if (Math.floor(counter.minutes()) === 0) {
        checkCompletedStatus();
      } else {
        var minutes = counter.minutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        self.remaining = counter.hours() + 'h ' + minutes + ' m';
        countdownTimeout = $timeout(tick, 60000);
      }
    })();
  }

}]);
