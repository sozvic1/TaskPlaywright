import {Page,Locator,expect} from '@playwright/test'
import { HelperBase } from './helperBase';
import {RegisterData} from '../models/registerData'

export class Login extends HelperBase {
    
    readonly email:Locator
    readonly password:Locator    
    readonly buttonLogin:Locator

    constructor(page:Page) {   
    super(page)
    this.email = page.getByRole('textbox', { name: 'Email' })
    this.password = page.getByRole('textbox', { name: 'Password' })  
    this.buttonLogin = page.getByRole('button', { name: 'Login' })   
}

async fillUserLogin(data:RegisterData){
    await this.page.waitForLoadState()
    await this.email.fill(data.email)
    await this.password.fill(data.password)    
}

async userLoginandClickButton(data:RegisterData){
    
    await this.fillUserLogin(data)
    await this.buttonLogin.click()
    await this.page.waitForTimeout(2)
}

async validateErrorMessage(message:string){
          
    const errorMessage = await this.page.locator("//p[@class='text-red-500 text-sm']")
       
    await expect(errorMessage).toHaveText(message)    
}

async validateEmailError(){
    await this.page.locator('div:nth-child(1) > p').textContent() 
}
}