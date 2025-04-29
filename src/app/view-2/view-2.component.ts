import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGX_LIST_DIRECTIVES, IgxIconComponent } from '@infragistics/igniteui-angular';
import { IgxFinancialChartModule } from 'igniteui-angular-charts';
import { Subject, take, takeUntil } from 'rxjs';
import { Stock } from '../models/fin-data/stock';
import { StockData } from '../models/fin-data/stock-data';
import { FinDataService } from '../services/fin-data.service';

import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'transformData',
})
export class TransformDataPipeView2 implements PipeTransform {

  transform(data: any[]): any[] {
    if (!data) {
      return [];
    }

    return (Array.isArray(data[0]) ? data : [data]).map((series: any) => {
      return series.map((item: any) => {
        const dateTimeKey = Object.keys(item).find((key: any) => this.isValidDateISO(item[key]));
        return {
          ...item,
          ...dateTimeKey ? { [dateTimeKey]: this.dateStringToLocalDate(item[dateTimeKey]) } : {},
        }
      });
    });
  }

  private isValidDateISO(value: unknown) {
    return typeof value === 'string' &&  /^\d{4}-\d{2}-\d{2}($|T)/.test(value) && Number.isFinite(Date.parse(value));
  }

  private dateStringToLocalDate(value: string): Date {
    if (value.length === 10 && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      // It's a full-date string (date-only), add time with no timezone to be parsed as local Date
      return new Date(value + 'T00:00');
    }
    // It's likely date-time, use the default parser as is
    return new Date(value);
  }
}
@Component({
  selector: 'app-view-2',
  imports: [IGX_LIST_DIRECTIVES, IgxFinancialChartModule, IgxIconComponent, TransformDataPipeView2],
  templateUrl: './view-2.component.html',
  styleUrls: ['./view-2.component.scss']
})
export class View2Component implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _selectedStock?: Stock;
  public get selectedStock(): Stock | undefined {
    return this._selectedStock;
  }
  public set selectedStock(value: Stock | undefined) {
    this._selectedStock = value;
    this.finDataStockData$.next();
  }
  public finDataStock: Stock[] = [];
  public finDataStockData: StockData[] = [];
  public finDataStockData$: Subject<void> = new Subject<void>();

  constructor(
    private finDataService: FinDataService,
  ) {}


  ngOnInit() {
    this.finDataService.getStockList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.finDataStock = data
    );
    this.finDataService.getStockDataList(this.selectedStock?.stock_symbol as any).pipe(takeUntil(this.destroy$)).subscribe(
      data => this.finDataStockData = data
    );
    this.finDataStockData$.pipe(takeUntil(this.destroy$)).subscribe(
      () => { this.finDataService.getStockDataList(this.selectedStock?.stock_symbol as any).pipe(take(1)).subscribe(
        data => this.finDataStockData = data
    )});
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.finDataStockData$.complete();
  }
}
