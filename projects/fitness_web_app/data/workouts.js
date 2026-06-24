const workouts = [];
const id = workouts.length;

// Function to save a task 
function saveWorkout(username, type, duration, calories){
    workouts.push({
        id: id +1,
        userName: username,
        type: type,
        duration: duration,
        calories: calories,
        date: new Date().getTime().toString()
    });

    console.log(workouts);
}

// Function to filter the workout by the username
function fetchWorkoutLog(username){
    return workouts.filter(el => el.userName === username); // return
}

module.exports = fetchWorkoutLog;
module.exports = saveWorkout; // Export and make it visible to other js files