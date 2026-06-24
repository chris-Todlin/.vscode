/* This is the sub router of the app */
const express = require("express");
const task = require("../middleware/handler-task");

// create the router 
const router = express.Router();

// now the path to ass the task 
router.route("/")
      .get(task.taskRender)
      .post(task.addTask) // function to add a task
      .put(task.updateAllTask)/* function to update completed all task */
      .delete(task.removeAllTask); // function to delete tasks

// render all the tasks
router.get("/tasks", task.allTask); // all the tasks
router.get("/completed-tasks", task.allCompletedTask); // all the tasks

router.route("/todo/:todo_id") // paramter todo_id
      .put(task.updateTask)/* function to update completed of one task */
      .delete(task.removeTask); // function to delete one task

// path to fully delete since the delte of the first pahse on set the deleted true
router.delete("/delete/:todo_id", task.deleteTask); // to trully deleting the task 
router.route("/delete") // to trully deleting tasks 
       .get(task.allDeletedTask)
       .delete(task.deleteAllTask);

// export the router 
module.exports.router = router;