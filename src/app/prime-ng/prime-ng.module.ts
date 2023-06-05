import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule} from '@angular/material/select';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { MessageModule} from 'primeng/message'
import { InputMaskModule } from 'primeng/inputmask';



@NgModule({
  exports:[
      MenubarModule,
      InputTextModule,
      CheckboxModule,
      RadioButtonModule,
      ButtonModule,
      ToastModule,
      CardModule,
      DropdownModule,
      InputTextareaModule,
      InputNumberModule,
      SelectButtonModule,
      CalendarModule,
      TableModule,
      ConfirmDialogModule,
      MessagesModule,
      CardModule,
      MultiSelectModule,
      MatSelectModule,
      DialogModule,
      FieldsetModule,
      SplitButtonModule,
      RatingModule,
      TagModule,
      DataViewModule,
      MessageModule,
      InputMaskModule,

  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class PrimeNgModule { }
