import {test} from '../test-options'
import {expect} from '@playwright/test'
import { DataFaker } from '../generator-helper/dataFaker'
import { readFileSync } from 'fs';

const autchFile ='.auth/user.json'
test('Login user',{tag: '@userblock'}, async ({formLogin})=>{
    
    const data = JSON.parse(readFileSync('test-data.json', 'utf-8'));    

    await formLogin.userLoginandClickButton(data)

    await formLogin.page.context().storageState({path:autchFile})
    await expect(formLogin.page).toHaveURL('http://localhost:3000/dashboard') 

})

test('Login failed user',{tag: '@validate'}, async ({formLogin})=>{
    
    const registerData = DataFaker.generateRegisterData()

    await formLogin.userLoginandClickButton(registerData)

    expect(await formLogin.validateErrorMessage('Invalid email or password.'))

})