import {test} from '../test-options'
import { DataFaker } from '../generator-helper/dataFaker'
import { CreateNewTask } from '../page-objects/createNewTask'
import { TaskData } from '../models/createTaskData'

let createdTask: TaskData
let editTask: TaskData

 test.beforeAll(async () => {
    
    createdTask = DataFaker.generateRandomTitleDescriptionPriorityAndStatus()
    createdTask.status = "Backlog"
  })

test('Validate user add new task',{tag: '@userblock'}, async ({newTaskForm, page})=>{
        
    await newTaskForm.clickByAddNewTaskButton()

    const createNewTask = new CreateNewTask(page)
    createNewTask.fillFormCreateTaskAndClickButton(createdTask)   

    await newTaskForm.validateMessage("Task created successfully!")
    await newTaskForm.validateTask(createdTask)    

})

test('Validate user edit new task', {tag: '@userblock'}, async ({newTaskForm, page})=>{
    
    editTask = DataFaker.generateRandomTitleDescriptionPriorityAndStatus()

    newTaskForm.editTask(createdTask.title)

    const createNewTask = new CreateNewTask(page)
    createNewTask.fillFormForEditTask(editTask)   

    await newTaskForm.validateMessage("Task updated successfully!")
    await newTaskForm.validateTask(editTask)    

})

test('Validate user delete new task', {tag: '@userblock'}, async ({newTaskForm, page})=>{
     
    newTaskForm.deleteTask(createdTask.title)    

    await newTaskForm.validateMessage("Task deleted successfully!")
    await newTaskForm.validateDeletedTask()    

})