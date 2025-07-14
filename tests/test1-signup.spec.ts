import {test} from '../test-options'
import {expect} from '@playwright/test'
import { DataFaker } from '../generator-helper/dataFaker'
import { writeFileSync } from 'fs'


  test('Register with correct data',{tag: '@userblock'}, async ({ formRegisterPage }) => {
    
    const registerData = DataFaker.generateRegisterData()    
    const email = registerData.email
    const password = registerData.password
    
    //save credentials
    writeFileSync('test-data.json', JSON.stringify({ email, password }));
    await formRegisterPage.register(registerData)   

    await expect(formRegisterPage.page).toHaveURL('http://localhost:3000/dashboard')
    
  })

   test('Validate error when Password must be at least 8 characters long',{tag: '@validate'}, async ({ formRegisterPage }) => {
    
    const registerData = DataFaker.generateRegisterDataWithMismatchedPasswords()    
    registerData.password ='1'
    registerData.confirmPassword ='1'
    await formRegisterPage.register(registerData)
    
    await formRegisterPage.validateMessage("Password must be at least 8 characters long")
  
})

  test('Validate error when mismatched passwords',{tag: '@validate'}, async ({ formRegisterPage }) => {
    
    const registerData = DataFaker.generateRegisterDataWithMismatchedPasswords()    
   
    await formRegisterPage.register(registerData)
    
    await formRegisterPage.validateMessage("Passwords don't match")
  
})
