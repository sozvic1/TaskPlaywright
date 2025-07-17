import { defineConfig, devices } from '@playwright/test'
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: true,
  timeout: 80000,
  globalTimeout: 90000,
  retries:1,
  reporter: 'html',
 
  use: {      
    globalsURL: 'http://localhost:3000/',
    trace: 'on-first-retry',
    actionTimeout: 40000,
    navigationTimeout: 55000,
    extraHTTPHeaders:{
    'Authorization': `token= ${process.env.ACCESS_TOKEN}`
    },
    video:{
      mode:'off'
    }  
  },
  
  projects: [
    
    {name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      storageState: '.auth/user.json',
      globalsURL: 'http://localhost:3000/'
      },
                
      workers: 1      
      
    },
    { name: 'setup', testMatch:'login.setup.ts'},
    {name: 'apiAuthSetUp',
      testMatch:"authApi.spec.ts",
      use: {
      storageState: '.auth/user.json',
      globalsURL: 'http://localhost:3000/'
      },
      dependencies:['setup'],      
      workers: 1      
      
    },

  //   {
  //     name: 'firefox',
  //     use: {
  //        browserName: 'firefox',
  //        video: {
  //         mode: 'off',
  //         size: {width: 1920, height: 1080}
  //       }
  //   }
  // },  
 
  ],
 
});
