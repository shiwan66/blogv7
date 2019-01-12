import { Task } from './Task'
import { User } from './User';
export class Project{
    id: number;
    name: string;
    names: Task[];
    user: User;
    constructor(){}
}