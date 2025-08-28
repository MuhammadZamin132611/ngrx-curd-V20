import { Routes } from "@angular/router";
import { Calender } from "./calender/calender";
import { AddCalenderMetting } from "./add-calender-metting/add-calender-metting";

export const employeeCalender: Routes = [
    { path: '',title:'Employee Calender', component: Calender },
    { path: 'meet',title:'Add Calender Meeting', component: AddCalenderMetting },
]