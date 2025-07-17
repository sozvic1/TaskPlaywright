import {test as base } from '@playwright/test'
import { SignUp } from './page-objects/signUp'
import { Login } from './page-objects/login'
import { Daschboard } from './page-objects/dashBoard'
import { readFileSync } from 'fs';


export type TestOptions = {
    globalsURL:string
    formRegisterPage:SignUp
    formLogin:Login
    newTaskForm: Daschboard 
}

export const test = base.extend<TestOptions>({
globalsURL: ['', {option:true}],
formRegisterPage: async({page},use)=>{
    const signUp = new SignUp(page)
    await page.goto('/')  
    await page.locator('a:nth-child(2) > button').click()
    
    await use(signUp)
},

formLogin: async({page}, use)=>{
    
    const login = new Login(page)
    await page.goto('/')
    await page.locator('a:nth-child(1) > button').click()  
    await use(login)
},

newTaskForm: async({page, formLogin}, use)=>{
    
    //navigate and sign up user
    const data = JSON.parse(readFileSync('test-data.json', 'utf-8'));  
    formLogin.userLoginandClickButton(data)
    const dashboard = new Daschboard(page)  
   
    await use(dashboard)
}
})

