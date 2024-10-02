// Import specific functions from date-fns
const { format, addDays, subDays } = require("date-fns");

// Current date
const now = new Date();
console.log("Today is:", format(now, "yyyy-MM-dd"));

// Adding days to the current date
const nextWeek = addDays(now, 7);
console.log("Next week will be:", format(nextWeek, "yyyy-MM-dd"));

// Subtracting days from the current date
const lastWeek = subDays(now, 7);
console.log("Last week was:", format(lastWeek, "yyyy-MM-dd"));

/*
This script demonstrates basic date manipulations using the date-fns library:
- `format` to format dates in a readable format.
- `addDays` and `subDays` to calculate dates in the future and past.
Run this script in Node.js using `node index.js`.
*/
