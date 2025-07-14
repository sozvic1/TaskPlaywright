import { test, expect, request } from '@playwright/test';

const API_URL = 'http://localhost:3000/api/tasks'; 
const AUTH_TOKEN = process.env.ACCESS_TOKEN; 

// Get all task
test.describe('Task Management API', () => {
  test('should retrieve all tasks for the authenticated user', async ({request}) => {
    const response = await request.get(API_URL, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    })

    
    expect(response.status()).toBe(200)    
    const responseBody = await response.json()
    expect(Array.isArray(responseBody)).toBe(true)
  });

  // Test new task
  test('should create a new task', async ({request}) => {
    const requestBody = {
      title: 'New Task Title',
      description: 'Optional details',
      priority: 'High',
    };

    const response = await request.post(API_URL, {
      data: requestBody,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    expect(response.status()).toBe(201);
  
    const responseBody = await response.json();
    expect(responseBody.title).toBe('New Task Title');
    expect(responseBody.description).toBe('Optional details');
    expect(responseBody.priority).toBe('High');
  });
  
  test('should retrieve a task by its ID', async ({request}) => {
    const taskId = 'existing-task-id'; 

    const response = await request.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

   
    expect(response.status()).toBe(200);
   
    const responseBody = await response.json();
    expect(responseBody.id).toBe(taskId);
    expect(responseBody.title).toBeTruthy();
  });


  test('should update an existing task', async ({request}) => {
    const taskId = 'existing-task-id'; 
    const requestBody = {
      title: 'Updated Task Title',
      description: 'Updated description',
      priority: 'Medium',
    };

    const response = await request.put(`${API_URL}/${taskId}`, {
      data: requestBody,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.title).toBe('Updated Task Title');
    expect(responseBody.description).toBe('Updated description');
    expect(responseBody.priority).toBe('Medium');
  });

  // Delete
  test('should delete a task by its ID', async ({request}) => {
    const taskId = 'existing-task-id'; 

    const response = await request.delete(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });
   
    expect(response.status()).toBe(204)
    
    const getResponse = await request.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    expect(getResponse.status()).toBe(404);
  });
});