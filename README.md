#Challengr
  **Challengr** is a social challenging app where you can challenge friends to complete the tasks that are long overdue and help them achieve their goals. 

##Specifics
  The special thing about **Challengr** is the incentive system. Every time you challenge a friend you put a donation (normally a small amount) to a charity that you choose on the line. If the challenged completes the challenge the money goes to the charity. If he does not though the money goes back to the challenger and the charity misses out. The newsfeed puts the completed as well as non completed challenges into the spotlight. Everyone can see that you missed to complete the challenge and that the money did not go to charity. The approach is backed by the famous self-determination theory and makes it much easier for your friends to complete important milestones in their lifes.

##Requirements
  - Node 4.0.x
  - Bower 1.6.x

##Development

###Contributing
  Thank you for taking interest in contributing! In order to contribute please make yourself familiar with our Contribution and Style Guide. Check out our [Style Guide](docs/STYLE-GUIDE.md) and the [Tools](docs/TOOLS.md) we use to adhere to that Style Guide. Also please strictly follow our [Commit Message Guide](docs/COMMIT-MESSAGES.md) and [Workflow](docs/GIT-WORKFLOW.md) otherwise your pull requests will not be accepted.

### Known Issues & Future Optimizations
  When a challenge is active, the countdown timer is not calculated for the user challenges feed.
  Optimized for Chrome v.30+
  -> formate issues on Safari
  -> firefox 'event.toElement' event is undefined, cannot view detail of challenge

### Polling for Challenges
- every 2000 ms
- configured in newsfeed.js & challenge-personal.js

### Disclaimer
- Optimized for Chrome
- All payments are in Sandbox mode, no real transactions will take place. Can you paypal or testing credit card # 4111 1111 1111 1111 exp: anything after 2015 ex: 11/19


###Installing Dependencies
  From the project root directory run
    ```sh
    npm install
    ```
    and
    ```sh
    bower install
    ```

##Team
  - Faisal Al Qasimi
  - Kevin Aujla
  - Robert Velasco
  - Jordan Winkelman
  - Arthur Mathies

