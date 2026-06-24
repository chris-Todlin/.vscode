const jobs = [];

// function to add jobs 
function addJob(username, title, description){
    jobs.push({
        username: username,
        title: title,
        description: description
    });
}

// function to return the jobs based on the username
function fetchJobs(username){
    const jobUser = jobs.filter(el => el.username === username);

    if(jobUser.length) {
        return jobUser;
    } else {
        return "No jobs";
    }
}

module.exports = {jobs, addJob, fetchJobs};