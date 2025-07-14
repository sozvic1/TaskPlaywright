import {Page,Locator,expect} from '@playwright/test'
import { HelperBase } from './helperBase';
import {RegisterData} from '../models/registerData'
import { time } from 'console';

export class SignUp extends HelperBase {
    
    readonly email:Locator
    readonly password:Locator
    readonly confirmPassword:Locator
    readonly buttonCreate:Locator

    constructor(page:Page) {
   
    super(page)
    this.email = page.getByPlaceholder('m@example.com')
    this.password = page.locator('[name="password"]')
    this.confirmPassword = page.locator('[name="confirmPassword"]')
    this.buttonCreate = page.getByRole('button', { name: 'Create an account' })   
}

async registrationUser(dataUser:RegisterData){
        
    await this.email.fill(dataUser.email)
    await this.password.fill(dataUser.password)
    await this.confirmPassword.fill(dataUser.confirmPassword)
}

async clickCreateAccount(){
    
    await this.page.getByRole('button', { name: 'Create an account' }).click()
    await this.page.waitForLoadState('networkidle')
}

 async register(data: RegisterData) {
    await this.registrationUser(data)
    await this.clickCreateAccount()

  }

async validateMessage(message:string){    
 
  const errorMessage = await this.page.locator('p.text-red-500.text-sm')
   
  await expect(errorMessage).toHaveText(message)
}

async validateInvalidEmail(){
    await this.page.locator('div:nth-child(1) > p').textContent()
}

}