import { Point } from './Point'
import { Project } from './Project';
export class Task{
    areaName: string;
    code: string;
    id: number;
    name: string;
    points: Point[];
    project: Project;
    
    constructor(){}
}