import { faker } from "@faker-js/faker";
import { RegisterData } from '../models/registerData'
import { TaskData } from "../models/createTaskData";

export class DataFaker{
    static randomPriority: ['High', 'Medium', 'Low'] = ['High', 'Medium', 'Low']
    static randomStatus: ['Backlog', 'Todo', 'In Progress','Done'] = ['Backlog', 'Todo', 'In Progress','Done']

    static generateRandomEmail(domain = 'com') {
       let email = `${faker.person.firstName()}${faker.number.int(1000)}@test.${domain}`.toString()
        return email
    }

    static generateRandomPassword(): string {
    return faker.internet.password();
  }

  static generateInvalidEmail(): string {
    return `invalid-email-${Date.now()}`
  }

    
static generateRandomTitleDescriptionPriorityAndStatus():TaskData {
  
    const title = `Test: ${faker.commerce.productName()}`
    const description = faker.lorem.sentences(3)
    
    const prioritetet = this.randomPriority[Math.floor(Math.random() * this.randomPriority.length)]
    const status = this.randomStatus[Math.floor(Math.random() * this.randomStatus.length)]     
    
    return new TaskData(title, description, prioritetet, status)
  } 

  static generateRegisterData(): RegisterData {
    const password = this.generateRandomPassword()
    return new RegisterData(this.generateRandomEmail(), password, password)
  }

  static generateRegisterDataWithMismatchedPasswords(): RegisterData {
    return new RegisterData(
      this.generateRandomEmail(),
      this.generateRandomPassword(),
      this.generateRandomPassword()
    )
}

static generateRegisterDataWithInvalidEmail() {
    const password = this.generateRandomPassword()
    return {
      email: this.generateInvalidEmail(),
      password,
      confirmPassword: password
    }
  }

}