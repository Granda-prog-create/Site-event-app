import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public evento: any = [];
  public eventoFiltrados: any = [];
  widthImg: number = 50;
  marginImg: number = 2;
  mostrarImagem: boolean = true;
  private _filtroLista: string = '';
  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventoFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista): this.evento;

  }
  filtrarEvento(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.evento.filter(
      (      evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }




  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEvento();

  }

  changeImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEvento(): void {

    this.http.get('https://localhost:5001/api/eventos').subscribe(
      Response =>

      this.evento = Response,

      error => console.log(error),

    );
    this.evento = [
    {
      Tema: 'Angular 11',
      Local: 'São Paulo'

    },
    {
      Tema: '.NET 5',
      Local: 'Rio de Janeiro'

    },
    {
      Tema: 'Angular e suas novidades',
      Local: 'Belo Horizonte'

    }
  ];


  }

}
