import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Stock } from '../models/fin-data/stock';
import { StockData } from '../models/fin-data/stock-data';
import { ErrorHandlerService } from './error-handler.service';

const API_ENDPOINT = 'https://fintechcloud.azurewebsites.net';

@Injectable({
  providedIn: 'root'
})
export class FinDataService {
  constructor(
    private http: HttpClient
  ) { }

  public getStockList(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${API_ENDPOINT}/stocks`)
      .pipe(catchError(ErrorHandlerService.handleError<Stock[]>('getStockList', [])));
  }

  public getStockDataList(symbol: string): Observable<StockData[]> {
    if (!symbol) {
      return of([]);
    }
    return this.http.get<StockData[]>(`${API_ENDPOINT}/stockprices/${symbol}`)
      .pipe(catchError(ErrorHandlerService.handleError<StockData[]>('getStockDataList', [])));
  }
}
