import { test, expect, request } from '@playwright/test'
import { RegisterData } from '../models/registerData'
import { DataFaker } from '../generator-helper/dataFaker'
import { readFileSync } from 'fs'

const API_URL = 'http://localhost:3000/api/auth/'
let requestBody: RegisterData
let registerData = DataFaker.generateRegisterData()    
let email = registerData.email
let password = registerData.password

test.beforeAll('GenerateData for all test', ()=>{
 
    requestBody = {
      email: email,
      password: password,
      confirmPassword: password,
    }
})
// register new user
test.describe('User Authentication API', () => {
  
  test('should register a new user successfully', {tag: '@api'}, async ({request}) => {    

    // Send Post for register end point
    const response = await request.post(`${API_URL}/register`, {
      data: requestBody,
    })

    const responseBody = await response.json()
    expect(response.status()).toBe(201)

    // Validate body json
    
    expect(responseBody.message).toBe('User registered successfully')
  })

  test('should return 400 for invalid data during registration',{tag: '@api'},  async ({request}) => {
    // incorect data with mismatch password
     const requestBodyWithWrong = {
      email: 'user@example.com',
      password: 'password123',
      confirmPassword: 'wrongPassword123',
    };

    // send request for register
    const response = await request.post(`${API_URL}/register`, {
      data: requestBodyWithWrong,
    });

    // validate status 400
    expect(response.status()).toBe(400)

    // validate body error
    const responseBody = await response.json()
    
    expect(responseBody.errors.confirmPassword).toContain("Passwords don't match");
  })
 
  // Test for login
  test('should authenticate a user and start a session',{tag: '@api'}, async ({request}) => {
    const data = JSON.parse(readFileSync('test-data.json', 'utf-8'));    
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    // Send POST-to login
     // Send POST-to login this have a bug insight url missed api
    const response = await request.post(`http://localhost:3000/auth/login`, {    
      data: requestBody,
    })
   console.log(response)
    // validate response status - 200 (OK)
    expect(response.status()).toBe(200)    
  })

  test('should return 400 if authentication fails',{tag: '@api'}, async ({request}) => {
    const requestBody = {
      email: 'user@example.com',
      password: 'wrongPassword123',
    }
    
    const response = await request.post(`${API_URL}/login`, {
      data: requestBody,
    })

    console.log(response)
    expect(response.status()).toBe(400)
    
  })
})