import { Component, DoCheck, OnInit} from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { LiteraryGenre, BookPublisher, Book, Language, Writer } from '../../interfaces/Book.interface';
import { BookService } from '../../services/book.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import * as customPatterns from '../../../../shared/interfaces/ValidatorPatterns';
import { ValidationService } from 'src/app/shared/services/validation.service';


@Component({
  selector: 'app-new-book-page',
  templateUrl: './new-book-page.component.html',
  styleUrls: ['./new-book-page.component.css']
})
export class NewBookPageComponent implements OnInit, DoCheck{

  public book!: Book;
  public genres!: LiteraryGenre[];
  public publishers!: BookPublisher[];
  public languages!:Language[];
  public writers!:Writer[];
  public newBookForm!: FormGroup;
  public title:string = '';
  public isEdit:boolean=false;
  public idBook:number=0;
  public isVisibleWriterModal!:boolean;
  public isVisiblePublisherModal!:boolean;
  public hasErrors!:boolean;

  constructor (
    private fb:FormBuilder,
    private bookService:BookService,
    private messageService:MessageService,
    private route:ActivatedRoute,
    private validationService:ValidationService) {}


  ngOnInit(): void {

    this.route.queryParams.subscribe (params => {
      this.idBook = params['id'];
      if (this.idBook !== undefined){
        this.isEdit = true;
      }
    })

    this.hasErrors=false;
    this.setTitle();
    this.genres = this.bookService.getGenres;
    this.getPublishers();

    this.languages = this.bookService.getLanguages;

    this.getWriters();

    this.newBookForm = this.fb.group ({
      title:['',[Validators.required,Validators.maxLength(45),Validators.pattern(customPatterns.alphaPattern)]],
      writers:['',[Validators.required]],
      genre:['',[Validators.required]],
      isbn:['',[Validators.required,Validators.minLength(13),Validators.maxLength(13),Validators.pattern(customPatterns.numericPattern)]],
      publisher:['',[Validators.required]],
      pages:[null,[Validators.required,Validators.min(1)]],
      language:['',[Validators.required]],
      pubYear:[null,[Validators.required]],
      synopsis:['']
    });

    if (this.isEdit){
      //Modo editar Libro existente
       this.editBook(this.idBook);
    }
  }

  ngDoCheck(): void {
    if (!this.newBookForm.valid) this.hasErrors = true
    else this.hasErrors = false;
  }

  saveBook(){

      this.checkFormMessage();

      if (!this.hasErrors){
        this.formToBook();
        this.bookService.addBook(this.book).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Libro añadido con éxito'});
            this.newBookForm.reset();
          }
        });
      }
  }

  editBook(id:number){

          this.bookService.getBookById(id).subscribe ({
          next: (value) =>{
            this.editMode(value);
          },
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:'El libro no se ha podido cargar. Intente más tarde'}),
          complete: () => this.messageService.add({severity:'success',summary:'Success',detail:'Libro cargado con éxito'})
        })

  }

  updateBook(){
    this.checkFormMessage();
    if (!this.hasErrors){

      this.formToBook();
      console.log("Edición completada");
      this.bookService.updateBook(this.book).subscribe ({
          error: (e) => this.messageService.add({severity:'error',summary:'Error',detail:e.error}),
          complete: () => {
            this.messageService.add({severity:'success',summary:'Success',detail:'Libro actualizado con éxito'});
            this.newBookForm.reset();
        }
      });
    }
  }

  getWriters(){
    this.bookService.getWriters().subscribe ( (writers) => {
      this.writers = writers;
      this.writers = this.writers.map((writers:Writer) => {
        return{
          ...writers,
          nameSelect: writers.surnames + ' , ' + writers.name
        };
      });

    });
  }

  getPublishers(){
    this.bookService.getPublishers().subscribe ( (publishers) => {
      this.publishers = publishers;
    });
  }

  onCreateWriterHandler(writer:Writer){
      this.getWriters();
      this.isVisibleWriterModal=false;
  }

  onCreateBookPublisherHandler(publisher:BookPublisher){

    this.getPublishers();
    this.isVisiblePublisherModal=false;
  }
  formToBook ():void{

    const bookFormValues = this.newBookForm.value;
    let publishedYear = new Date(bookFormValues.pubYear);

    this.book = {
      id:this.idBook,
      title:bookFormValues.title,
      writers:bookFormValues.writers,
      genre:bookFormValues.genre,
      isbn:bookFormValues.isbn,
      publisher:bookFormValues.publisher,
      pages:bookFormValues.pages,
      language:bookFormValues.language,
      publishedYear: publishedYear.getFullYear(),
      synopsis:bookFormValues.synopsis
    }
  }

  setTitle ():void{
    if (this.isEdit) this.title='Modificar Libro';
    else this.title='Nuevo Libro'
  }

  showWriterModal(){
    this.isVisibleWriterModal=true;
  }

  showPublisherModal() {
    this.isVisiblePublisherModal=true;
  }


    resetForm ():void {
      this.newBookForm.reset();
    }

    editMode(book:Book):void {
      console.log(book);
      let writers:Writer[] = book.writers;
      writers = writers.map((writers:Writer) => {
        return{
          ...writers,
          nameSelect: writers.surnames + ' , ' + writers.name
        };
      });
      let yearDatePicker:Date = new Date(book.publishedYear,0,1);

      console.log(writers)
      this.newBookForm.setValue({
      title:book.title,
      writers:writers,
      genre:book.genre,
      isbn:book.isbn,
      publisher:book.publisher,
      pages:book.pages,
      language:book.language,
      pubYear:yearDatePicker,
      synopsis:book.synopsis
    });
  }

  getFieldError (field:string):string|null{
    return this.validationService.getFieldError(field,this.newBookForm);
  }

  isValidField (field:string):boolean | null {
    return this.newBookForm.controls[field].errors && this.newBookForm.controls[field].touched;
  }

  checkFormMessage(){
    if (!this.newBookForm.valid){
      this.hasErrors = true;
      this.messageService.add({severity:'error',summary:'Error',detail:'Hay datos inválidos.'});
      return this.newBookForm.markAllAsTouched();
    }
  }
}



