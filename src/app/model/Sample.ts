import { Params } from './Params';
import { Point } from './Point';
import { SampleUser } from './SampleUser';

export class Sample{
    code: string;
    dqy: number;
    fs: number;
    fx: string;
    id: number;
    name: string;
    params: Params[];
    point: Point;
    sampleDate: string;
    status: string;
    type: string;
    user1: SampleUser;
    user2: SampleUser;
    wd: number;
    xdsd: number;
    constructor(){}
}