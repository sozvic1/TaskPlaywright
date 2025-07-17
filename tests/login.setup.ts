import {test as setup} from'@playwright/test'
import { test, expect, request } from '@playwright/test'
import { RegisterData } from '../models/registerData'
import { DataFaker } from '../generator-helper/dataFaker'

const API_URL = 'http://localhost:3000/api/auth/'
let data = DataFaker.generateRegisterData() 
let requestBody: RegisterData    

setup('Authentification',async ({request})=>{

    requestBody = {
      email: data.email,
      password: data.password,
      confirmPassword: data.password,      
    }

    // Send Post for register end point
    const response = await request.post(`${API_URL}/register`, {
      data: requestBody
    })    
       
    expect(response.status()).toBe(201)

  })

