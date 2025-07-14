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
    await page.goto('http://localhost:3000/')  
    await page.locator('a:nth-child(2) > button').click()
    
    await use(signUp)
},

formLogin: async({page}, use)=>{
    
    const login = new Login(page)
    await page.goto('http://localhost:3000/')
    await page.locator('a:nth-child(1) > button').click()  
    await use(login)
},

newTaskForm: async({page, formLogin}, use)=>{
    
    //navigate and sign up user
    const data = JSON.parse(readFileSync('test-data.json', 'utf-8'));  
    formLogin.userLoginandClickButton(data)
    const dashboard = new Daschboard(page)    

  // Получаем cookies после успешного логина
  const cookies = (await page.context().cookies()); 
  console.log("Cookies:", cookies); // Печатаем все cookies для отладки

  // Ищем нужный cookie, в котором хранится токен (например, 'next-auth.session-token')   
   process.env['ACCESS_TOKEN'] = cookies[0]?.value
   
    await use(dashboard)
}
})

