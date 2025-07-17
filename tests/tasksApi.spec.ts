import {test} from '../test-options'
import {expect} from '@playwright/test'
import { readFileSync } from 'fs'

const API_URL = 'http://localhost:3000/api/tasks'; 
let AUTH_TOKEN = process.env.ACCESS_TOKEN; 
let idTask;
let cookieData =  JSON.parse(readFileSync('cookie-data.json', 'utf-8'));  
test.describe('Task Management API', () => {
  
test('should create a new task',{tag: '@userblock'}, async ({request}) => {
    const requestBody = {
      title: 'New Task Title',
      description: 'Optional details',
      priority: 'High',
    };     
        
    const response = await request.post(API_URL, {
      data: requestBody,
      headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`                 
      }
    })

    expect(response.status()).toBe(201);
  
    const responseBody = await response.json();
    expect(responseBody.title).toBe('New Task Title');
    expect(responseBody.description).toBe('Optional details');
    expect(responseBody.priority).toBe('High');
  })
 
  // Get all task
  test('should retrieve all tasks for the authenticated user',{tag: '@userblock'}, async ({request}) => {
    const response = await request.get(API_URL, {
       headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`
      }
    })    
   
    expect(response.status()).toBe(200)    
    const responseBody = await response.json()
    idTask = responseBody[0].id
     
    expect(Array.isArray(responseBody)).toBe(true)
  });

  // Test new task  
  test('should retrieve a task by its ID',{tag: '@userblock'}, async ({request}) => {
  console.log(`Url with id is  ${API_URL}/${idTask}`)
    const response = await request.get(`${API_URL}/${idTask}`, {
      headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`
      }
    });
   
    expect(response.status()).toBe(200);
   
    const responseBody = await response.json();
    expect(responseBody.id).toBe(idTask);
    expect(responseBody.title).toBeTruthy();
  });


  test('should update an existing task',{tag: '@userblock'}, async ({request}) => {
    
    const requestBody = {
      title: 'Updated Tas1k Title',
      description: 'Update1d description',
      priority: 'Medium',
    };

    const response = await request.put(`${API_URL}/${idTask}`, {
      data: requestBody,
    headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`,
      },
    })
    
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.title).toBe('Updated Tas1k Title');
    expect(responseBody.description).toBe('Update1d description');
    expect(responseBody.priority).toBe('Medium');
  });

  // Delete
  test('should delete a task by its ID',{tag: '@userblock'}, async ({request}) => {    

    const response = await request.delete(`${API_URL}/${idTask}`, {
      headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`,
      },
    });
   
    expect(response.status()).toBe(204)
    
    const getResponse = await request.get(`${API_URL}/${idTask}`, {
      headers: {
        cookie: `next-auth.session-token=${cookieData.cookies}`,
      },
    })

    expect(getResponse.status()).toBe(404);
  })
})