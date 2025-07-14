import {Page,Locator,expect} from '@playwright/test'
import { HelperBase } from './helperBase'
import { TaskData } from '../models/createTaskData'
import { CreateNewTask } from './createNewTask'

export class Daschboard extends HelperBase {
    
    readonly addNewTask:Locator
    readonly logOut:Locator
    readonly contextCard:Locator

    constructor(page:Page) {   
    super(page)
    this.addNewTask =  page.getByRole('button', { name: ' Add New Task' })
    this.logOut = page.getByRole('button', { name: ' Logout' })
    this.contextCard = page.locator('.text-sm text-muted-foreground')   
 
}
async clickByAddNewTaskButton(){
   await this.addNewTask.click()
}

async clickByUserLogOutButton(){
    await this.logOut.click()
}

async validateTask(dataCreateTask: TaskData){

  //validate title  
   const cardTitle = await this.page.locator('[data-slot="card-title"]').first()   
   await expect(cardTitle).toContainText(dataCreateTask.title)

  // validate Priority 
  const priority = await this.page.locator("[data-slot='card-description']").first()
  await expect(priority).toContainText(`Priority: ${dataCreateTask.priority}`)  

  // validate Status  
  const status = await this.page.locator("[data-slot='card-description']")
  await expect(status).toContainText(`Status: ${dataCreateTask.status}`)

  //validate title
  const description = await this.page.locator("[data-slot='card-content']").textContent()
  await expect(description).toContain(dataCreateTask.description)

  //validate data
   const dateElement =  await this.page.locator('p.text-xs.text-muted-foreground')
   const expectedDate = new Date().toLocaleDateString('en-US')
   const dateText = await dateElement.innerText()  
   await expect(dateText).toContain(`Created: ${expectedDate}`)

// or we can rerutn data and check value inside of test
    // return {
    // title: title
    // description
    // priority: priority,
    // }
}

//edit task
async editTask(taskTitle:string){

    await this.page.locator("[data-slot='dropdown-menu-trigger']").last().click();

    await this.page.getByRole('menuitem', { name: 'Edit' }).click()  

    return new CreateNewTask(this.page)    
}
//delete task
async deleteTask(taskTitle:string){
    
    await this.page.locator("[data-slot='dropdown-menu-trigger']").last().click()    
    await this.page.getByRole('menuitem', { name: 'Delete' }).click()    
}

async validateMessage(message:string){

    const popup = await this.page.getByText(message)   
    
    await expect(popup).toBeVisible({ timeout: 5000 })
    await expect(popup).toContainText(message);
}
 // validate deleted task
async validateDeletedTask(){    
  
   await this.page.waitForSelector("[data-slot='card']", { state: 'detached' });
   const form =  await this.page.locator("[data-slot='card']").count()
   
   await expect(form).toEqual(0)
}

}
