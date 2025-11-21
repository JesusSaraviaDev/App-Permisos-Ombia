import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TabMenuModule } from 'primeng/tabmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { TimelineModule } from 'primeng/timeline';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Menu } from 'primeng/menu';
import { DatePickerModule } from 'primeng/datepicker';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    PaginatorModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    BreadcrumbModule,
    TagModule,
    InputTextModule,
    ToggleButtonModule,
    DialogModule,
    MessagesModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    MultiSelectModule,
    IconFieldModule,
    DropdownModule,
    InputIconModule,
    TabMenuModule,
    CheckboxModule,
    CalendarModule,
    DatePickerModule,
    InputSwitchModule,
    BadgeModule,
    ProgressSpinnerModule,
    AccordionModule,
    InputNumberModule,
    TimelineModule,
    MessageModule,
    RadioButtonModule,
    Menu,
  ],
  exports: [
    TableModule,
    PaginatorModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    FileUploadModule,
    BreadcrumbModule,
    TagModule,
    InputTextModule,
    ToggleButtonModule,
    DialogModule,
    MessagesModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    MultiSelectModule,
    IconFieldModule,
    DropdownModule,
    InputIconModule,
    TabMenuModule,
    CheckboxModule,
    CalendarModule,
    DatePickerModule,
    InputSwitchModule,
    BadgeModule,
    ProgressSpinnerModule,
    AccordionModule,
    InputNumberModule,
    TimelineModule,
    MessageModule,
    RadioButtonModule,
    Menu,
  ],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class PrimeNgModule {}
