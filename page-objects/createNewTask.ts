import {Page,Locator} from '@playwright/test'
import { HelperBase } from './helperBase'
import { TaskData } from '../models/createTaskData'

export class CreateNewTask extends HelperBase {
    
    readonly header:Locator
    readonly title:Locator    
    readonly description:Locator
    readonly comboBoxButton:Locator
    readonly comboBoxValue:Locator
    readonly buttonSubmit:Locator    

    constructor(page:Page) {   
    super(page)
    this.header = this.page.getByRole('heading', { name: 'Create New Task' })
    this.title =  this.page.locator('input[name="title"]')
    this.description = this.page.getByPlaceholder('Add more details about the task...')
    this.comboBoxButton = this.page.locator('button[role="combobox"]')
    this.buttonSubmit = this.page.locator('button[type="submit"]')  
    
    //page.getByRole('combobox')
    //page.getByRole('option', { name: 'High' }).click(); 
}

async fillFormcreateTask(dataCreateTask: TaskData ){
    
    await this.title.fill(dataCreateTask.title)
    await this.description.fill(dataCreateTask.description)
    
    // select comboBox
    await this.comboBoxButton.first().click()
    await this.page.getByRole('option', { name: `${dataCreateTask.priority }`}).click()      

}

async fillFormForEditTask(dataCreateTask: TaskData){
    await this.fillFormcreateTask(dataCreateTask)
    // select status

    await this.comboBoxButton.last().click()
    await this.page.getByRole('option', { name: `${dataCreateTask.status }`}).click()
    await this.clickButtonCreateTask()

}

async selectPriority(priority: 'Low' | 'Medium' | 'High') {
  await this.page.getByRole('combobox').click();
  await this.page.getByRole('option', { name: priority }).click();
}

async fillFormCreateTaskAndClickButton(dataCreateTask: TaskData ){
    
   await this.fillFormcreateTask(dataCreateTask)
   await this.clickButtonCreateTask()

}

async clickButtonCreateTask(){

    await this.buttonSubmit.click()  
}
}