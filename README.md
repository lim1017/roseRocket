This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deployed at
https://tomlimroserocket.netlify.app/


## To start App for the first time

In the project directory, you can run:
npm install (once only)
npm start

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### To run Tests
npx cypress open
or
yarn run cypress open



### Notes:
- I believe I have fullfilled all the requirements 

- I have implemented Redux, to share some data between pages.  Although I recoginze this is not necessary, I recently took a React/Redux course and figured this would be a good opportuinty to practice. 

### Part A
- There are three (3) drivers, and scheduler will only display the tasks of the active driver.

- There are three (3) types of tasks to choose from when creating a an task: Pickup/Dropoff/Other

- There are three (3) views the dispatcher may create tasks from: daily/weekly/monthly.  
The component I used as my skeleton had months/years built already.

- A task cannot extend across mutiple days: It will automatically keep the day/month/year of the start/end date insync

- If a new or edited task conflicts with an existing task, user will recieve a prompt asking if they wish to overwrite.

- Dispatcher may delete tasks

### Part B

- dispatcher can select a "Time Interval" and download a csv which will organize the drivers tasks similar to the example provided.
I did make a couple small change, 

1) In the example a 2 day interval is selected, and the following is shown.  
Time-Frame:  (2 day interval)
Day 1-3
Day 3-6

Where should a task schduled on Day 3 go?  Instead choose breakdown the days as follows:
Time-Frame:  (2 day interval)
Day 1-2
Day 3-4

2) Because my scheduler component does tracks days/month/years, and it starts from the current date.

The csv will start from the first appointment on the drivers schedule, rather then the first day of the year.  It makes no sense if a task was added on July 30th 2020, and the first 90 lines of the csv were 
Jan 1-2: 0/0/0
Jan 3-4: 0/0/0
...
July 29-30: 1/0/0

### Additional Feature

- I have deployed the app at : https://tomlimroserocket.netlify.app/

- I have created a driver profile, which will display The drivers breakdown of their tasks
The back button will however reset the the data, because there is no data presistance. 

- Used cypress to write Integration tests for testing basic functions.

