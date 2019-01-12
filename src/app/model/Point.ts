import { Sample } from './Sample';
import { Task } from './Task'

export class Point{
    address: string;
    code: string;
    id: number;
    lat: number;
    lng: number;
    name: string;
    samples: Sample[];
    task: Task;
    constructor(){}
}