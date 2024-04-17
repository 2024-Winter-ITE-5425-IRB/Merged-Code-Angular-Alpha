import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IFaq {
  question:string;
  answer: string;
  
}

@Injectable({
  providedIn: 'root'
})

export class FaqService {

  private url: string = 'http://localhost:8080/faqs';

  constructor(private http: HttpClient) { }

  getFaqs(): Observable<IFaq[]> {
    return this.http.get<IFaq[]>(this.url);
  }
}
