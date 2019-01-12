import { Injectable } from '@angular/core';
import { LoginVM } from './model/LoginVM'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Task } from './model/task';
import { Point } from './model/Point';
import { Sample } from './model/Sample';
import { Params } from '@angular/router';
import { SampleUser } from './model/SampleUser';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  
  private loginUrl = '/api/authenticate';
  private getTaskUrl = '/api/tasks';
  private getPointUrl = '/api/points';
  private getSampleUrl = '/api/samples';
  private getParamsUrl = '/api/params';
  private getSampleUserUrl = '/api/sample-users';

  constructor(private http: HttpClient) {}

  login(loginVM: LoginVM): Observable<any>{
    return this.http.post<any>(this.loginUrl,loginVM,httpOptions);
  }

  getTask():Observable<Task[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Task[]>(this.getTaskUrl,httpOptions);
  }

  getIdTask(id: number):Observable<Task>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Task>(this.getTaskUrl+'/'+id,httpOptions);
  }

  getPoint():Observable<Point[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Point[]>(this.getPointUrl,httpOptions);
  }

  getIdPoint(id: number):Observable<Point>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Point>(this.getPointUrl+'/'+id,httpOptions);
  }

  getSamples():Observable<Sample[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Sample[]>(this.getSampleUrl,httpOptions);
  }

  getIdSamples(id: number):Observable<Sample>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Sample>(this.getSampleUrl+'/'+id,httpOptions);
  }

  getParams():Observable<Params>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<Params>(this.getParamsUrl,httpOptions);
  }

  putParams(params: Params):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.post<any>(this.getParamsUrl,params,httpOptions);
  }

  getSampleUsers():Observable<SampleUser[]>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer  ${localStorage.getItem('jhi-authenticationtoken')}`
      })
    };
    return this.http.get<SampleUser[]>(this.getSampleUserUrl,httpOptions);
  }
}
