import {
  Component,
  OnInit,
  Pipe,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { MyapiService } from './myapi.service';
import { MyapiService } from '../../../myapi.service';
import { Subscription, Subject, switchMap, debounceTime, pipe } from 'rxjs';

export interface ItemModel {
  ItemID: number;
  ItemName: string;
  Description: string;
  SellPrice: number;
  NumOrder: number;
  ThisMoney: number;
}

@Component({
  selector: 'app-txtsearch',
  templateUrl: './txtsearch.component.html',
  styleUrls: ['./txtsearch.component.css'],
})
export class TxtsearchComponent implements OnInit {
  @Output() myListChange: EventEmitter<string> = new EventEmitter();

  showListText: boolean = true;
  showListText2: boolean = false;
  txtSearch: string = '';
  pokemons: any[] = [];
  title = 'switchmap_pokemon';
  subscription?: Subscription;

  ItemDatas: ItemModel[] = [];
  heroesB: any[] = [];

  constructor(private http: HttpClient, private myapi: MyapiService) {
    this.onSearchPokemons
      .pipe(
        debounceTime(200),
        switchMap((searchText) => {
          return this.myapi.getPokemonByName(searchText);
          console.log('aaa' + searchText);
        })
      )
      .subscribe((value) => {
        console.log('Value :: ', value);
        this.pokemons = value;
      });
  }

  ngOnInit() {}

  onSearchPokemons = new Subject<string>();

  searchPokemons(searchText: string) {
    //  วิธีที่ 1
    // if (this.subscription) {
    //   console.log('UnSubscribe');
    //   this.subscription.unsubscribe();
    // }
    // this.subscription = this.myapi
    //   .getPokemonByName(searchText)
    //   .subscribe((response) => (this.pokemons = response));
    // //alert(searchText);
    // วิธีที่ 2  switchMap
    this.onSearchPokemons.next(searchText);
    this.showListText2 = true;
  }

  AddItem(i: number) {
    //alert(i);
    console.log(this.pokemons[i]);
    this.txtSearch = '';
    this.ItemDatas.push(this.pokemons[i]);
    this.myListChange.emit(this.pokemons[i]);
    this.showListText2 = false;
  }

  CalMoney(i: number) {
    let NumOrder = this.ItemDatas[i].NumOrder;
    let SellPrice = this.ItemDatas[i].SellPrice;

    this.ItemDatas[i].ThisMoney = NumOrder * SellPrice;

    //alert(this.ItemDatas[i].NumOrder);
  }
}
