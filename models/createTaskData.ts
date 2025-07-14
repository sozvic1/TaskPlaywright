
export class TaskData{   
  
    constructor(public title: string, public description: string, public priority: 'High' | 'Medium' | 'Low', 
        public status:'Backlog' | 'Todo' | 'In Progress' | 'Done' ) {}
       
    }
