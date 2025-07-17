import {test} from '../test-options'
import {expect} from '@playwright/test'
import { DataFaker } from '../generator-helper/dataFaker'
import { readFileSync,writeFileSync } from 'fs';

const autchFile ='.auth/user.json'
test('Login user',{tag: '@userblock'}, async ({formLogin,page})=>{
    
    const data = JSON.parse(readFileSync('test-data.json', 'utf-8'))
    await formLogin.userLoginandClickButton(data)
    await formLogin.page.context().storageState({path:autchFile})

    const context = await page.context().cookies()
    const cookies = context.find(c => c.name === 'next-auth.session-token')?.value
    writeFileSync('cookie-data.json', JSON.stringify({ cookies }))

    await expect(formLogin.page).toHaveURL('http://localhost:3000/dashboard') 

})

test('Login failed user',{tag: '@validate'}, async ({formLogin})=>{
    
    const registerData = DataFaker.generateRegisterData()
    await formLogin.userLoginandClickButton(registerData)

    expect(await formLogin.validateErrorMessage('Invalid email or password.'))

})