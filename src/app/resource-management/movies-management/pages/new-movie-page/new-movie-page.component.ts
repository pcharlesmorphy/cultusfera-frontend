import { Language } from './../../../books-management/interfaces/Book.interface';
import { MovieGenre, Movie, Director, Actor } from './../../interfaces/Movie.interface';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MessageService } from 'primeng/api';

import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';


@Component({
  selector: 'app-new-movie-page',
  templateUrl: './new-movie-page.component.html',
  styleUrls: ['./new-movie-page.component.css']
})
export class NewMoviePageComponent implements OnInit, DoCheck{
  public movie!: Movie;
  public genres!: MovieGenre[];
  public languages!:Language[];
  public directors!:Director[];
  public actors!:Actor[];
  public newMovieForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idMovie:number=0;
  public isVisibleDirectorModal:boolean=false;
  public isVisibleActorModal:boolean=false;
  public hasErrors!:boolean;

  constructor (
    private fb:FormBuilder,
    private movieService:MovieService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {}


  ngOnInit(): void {

    this.hasErrors=false;
    this.route.queryParams.subscribe (params => {
      this.idMovie = params['id'];
      if (this.idMovie !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();
    this.genres = this.movieService.getGenres;

    this.languages = this.movieService.getLanguages;
    console.log("Antes de actores y directores?");
    this.getDirectors();

    this.getActors();

    this.newMovieForm = this.fb.group ({
      title:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      director:['',[Validators.required]],
      genre:['',[Validators.required]],
      actors:['',[Validators.required]],
      duration:[null,[Validators.required,Validators.min(1)]],
      language:['',[Validators.required]],
      pubYear:[null,[Validators.required]],
      synopsis:['']
    });
    console.log("Antes del modo edición");

    if (this.isEdit){
        this.editMovie(this.idMovie);
    }
  }

  ngDoCheck(): void {
    if (!this.newMovieForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveMovie(){
      this.checkFormMessage();
      if (!this.hasErrors){
          this.formToMovie();
          this.movieService.addMovie(this.movie).subscribe ({
            error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
            complete: () => {
              this.messageService.add({severity:'success',summary:'Success',detail:'Pelicula añadida con éxito'});
              this.newMovieForm.reset();
            }
          });
      }
  }

  editMovie(id:number){
      console.log("Ya entramos en metodo editMovie");
      this.movieService.getMovieById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Pelicula cargada con éxito'})
    })
  }

  updateMovie(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToMovie();
      this.movieService.updateMovie(this.movie).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Pelicula actualizada con éxito'});
            this.newMovieForm.reset();
        }
      });
   }
  }

  getDirectors(){

    this.movieService.getDirectors().subscribe ( (directors) => {
      this.directors = directors;
      this.directors = this.directors.map((directors:Director) => {
        return{
          ...directors,
          nameSelect: directors.surnames + ' , ' + directors.name
        };
      });
      if (this.isEdit) this.newMovieForm.setValue({director:this.directors})
    });

  }

  getActors(){

    this.movieService.getActors().subscribe ( (actors) => {
      this.actors = actors;

      this.actors = this.actors.map((actors:Actor) => {
        return{
          ...actors,
          nameSelect: actors.surnames + ' , ' + actors.name
        };
      });

    });

  }

  formToMovie ():void{

    const movieFormValues = this.newMovieForm.value;
    let publishedYear = new Date(movieFormValues.pubYear);

     this.movie = {
      id: this.idMovie,
      title: movieFormValues.title,
      director:movieFormValues.director,
      actors:movieFormValues.actors,
      genre:movieFormValues.genre,
      duration:movieFormValues.duration,
      language:movieFormValues.language,
      publishedYear:publishedYear.getFullYear(),
      synopsis:movieFormValues.synopsis
    }

  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Pelicula';
    else this.title='Nueva Pelicula'
  }


  showDirectorModal(){
    this.isVisibleDirectorModal=true;
  }

  showActorModal() {
    this.isVisibleActorModal=true;
  }


  onCreateDirectorHandler(director:Director){

      this.getDirectors();
      this.isVisibleDirectorModal=false;
  }

  onCreateActorHandler(actor:Actor){

      this.getActors();
      this.isVisibleActorModal=false;
  }

      resetForm ():void {
        this.newMovieForm.reset();
      }


    editMode(movie:Movie):void {
      console.log ("Modo edición");
      const director= {
        ...movie.director,
        nameSelect: movie.director.surnames + ' , ' + movie.director.name
      }

      let actors:Actor[] = movie.actors;
      actors = actors.map((actors:Actor) => {
        return{
          ...actors,
          nameSelect: actors.surnames + ' , ' + actors.name
        };
      });
      let yearDatePicker:Date = new Date(movie.publishedYear,0,1);
      this.newMovieForm.setValue({
      title:movie.title,
      director:director,
      genre:movie.genre,
      duration:movie.duration,
      actors:actors,
      language:movie.language,
      pubYear:yearDatePicker,
      synopsis:movie.synopsis
    });

  }


  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newMovieForm);
  }

  isValidField (field:string):boolean | null {
    return this.newMovieForm.controls[field].errors && this.newMovieForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newMovieForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newMovieForm.markAllAsTouched();

    }
}



}

