import { Component, DoCheck, OnInit } from '@angular/core';
import { Album,MusicGenre, RecordCompany, Musician } from '../../interfaces/Album.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from '../../services/album.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from '../../../../shared/services/validation.service';

@Component({
  selector: 'app-new-album-page',
  templateUrl: './new-album-page.component.html',
  styleUrls: ['./new-album-page.component.css']
})

export class NewAlbumPageComponent implements OnInit,DoCheck{
  public album!: Album;
  public genres!: MusicGenre[];
  public recordCompanies!: RecordCompany[];
  public musicians!:Musician[];
  public newAlbumForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idAlbum:number=0;
  public isVisibleMusicianModal!:boolean;
  public isVisibleRecordCompanyModal!:boolean;
  public hasErrors!:boolean;

  constructor (
    private fb:FormBuilder,
    private albumService:AlbumService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {}


  ngOnInit(): void {

    this.hasErrors=false;

    this.route.queryParams.subscribe (params => {
      this.idAlbum = params['id'];
      if (this.idAlbum !== undefined){
        this.isEdit = true;
      }
    })

    this.setTitle();
    this.genres = this.albumService.getGenres;
    this.getRecordCompanies();
    this.getMusicians();


    this.newAlbumForm = this.fb.group ({
      title:['',[Validators.required,Validators.minLength(5),Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      musician:['',[Validators.required]],
      genre:['',[Validators.required]],
      recordCompany:['',[Validators.required]],
      duration:[null,[Validators.required,Validators.min(1)]],
      pubYear:[null,[Validators.required]],
    });

    if (this.isEdit){
      //Modo editar Libro existente
       this.editAlbum(this.idAlbum);
    }
  }

  ngDoCheck(): void {
    if (!this.newAlbumForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveAlbum(){
      this.checkFormMessage();
      if (!this.hasErrors){
        this.formToAlbum();
        this.albumService.addAlbum(this.album).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Album añadido con éxito'});
            this.newAlbumForm.reset();
          }
        });
      }
  }

  editAlbum(id:number){
      this.albumService.getAlbumById(id).subscribe ({
      next: (value) =>{
        this.editMode(value);
      },
      error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
      complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Album cargado con éxito'})
    })
  }

  updateAlbum(){
    this.checkFormMessage();
    if (!this.hasErrors){
      this.formToAlbum();
      this.albumService.updateAlbum(this.album).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Album actualizado con éxito'});
            this.newAlbumForm.reset();
        }
      });
    }
  }

  getMusicians(){
    this.albumService.getMusicians().subscribe ( (musicians) => {      this.musicians = musicians;

      let nameSelect:string = '';
      this.musicians = this.musicians.map((musicians:Musician) => {
        if (musicians.surnames.length === 0){
          nameSelect= musicians.name;
        } else{
          nameSelect = musicians.surnames + ' , ' + musicians.name;
          console.log('Musico con apellidos: ', nameSelect);
        }
        return{
          ...musicians,
          nameSelect: nameSelect
        };
      });
    });
  }

  getRecordCompanies(){
    this.albumService.getRecordCompanies().subscribe ( (recordCompanies) => {
      this.recordCompanies = recordCompanies;
    });
  }

  formToAlbum ():void{

    const albumFormValues = this.newAlbumForm.value;
    let publishedYear = new Date(albumFormValues.pubYear);

    this.album = {
      id:this.idAlbum,
      title:albumFormValues.title,
      musician:albumFormValues.musician,
      genre:albumFormValues.genre,
      recordCompany:albumFormValues.recordCompany,
      duration:albumFormValues.duration,
      publishedYear:publishedYear.getFullYear(),
    }
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Album';
    else this.title='Nuevo Album'
  }

    onCreateMusicianHandler(musician:Musician){
      this.getMusicians();
      this.isVisibleMusicianModal=false;
    }

    onCreateRecordCompanyHandler(recordCompany:RecordCompany){

      this.getRecordCompanies();
      this.isVisibleRecordCompanyModal=false;
    }


    showMusicianModal(){
      this.isVisibleMusicianModal=true;
    }

    showRecordCompanyModal() {
      this.isVisibleRecordCompanyModal=true;
    }

    resetForm ():void {
      this.newAlbumForm.reset();
    }

    editMode(album:Album):void {
      let nameSelect:string = '';
      if (album.musician.surnames.length < 1) nameSelect = album.musician.name;
      else nameSelect = album.musician.surnames + ' , ' + album.musician.name;

      const musician = {
        ...album.musician,
          nameSelect: nameSelect
      }

      let yearDatePicker:Date = new Date(album.publishedYear,0,1);

      this.newAlbumForm.setValue({
      title:album.title,
      musician:musician,
      genre:album.genre,
      duration:album.duration,
      recordCompany:album.recordCompany,
      pubYear:yearDatePicker,
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newAlbumForm);
  }

  isValidField (field:string):boolean | null {
    return this.newAlbumForm.controls[field].errors && this.newAlbumForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newAlbumForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newAlbumForm.markAllAsTouched();
    }
  }

}

