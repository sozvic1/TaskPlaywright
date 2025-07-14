import {test as setup} from'@playwright/test'
import { test, expect, request } from '@playwright/test'
import { RegisterData } from '../models/registerData'
import * as user from '../.auth/user.json'
import { readFileSync } from 'fs'

const API_URL = 'http://localhost:3000/api/auth/'
let data = JSON.parse(readFileSync('test-data.json', 'utf-8'));
let requestBody: RegisterData    

setup('Authentification',async ({request})=>{

    requestBody = {
      email: data.email,
      password: data.password
      
    }

    // Send Post for register end point
    const response = await request.post(`${API_URL}/login`, {
      data: requestBody
    }) 
    
    //const responseBody = await response.json()    
    //  const accessToken = responseBody.token
    //  process.env['ACCESS_TOKEN'] = accessToken

    // Validate status code - 201 (Created)
    expect(response.status()).toBe(200)

  })

