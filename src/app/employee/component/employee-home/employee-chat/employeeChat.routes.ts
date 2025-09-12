import { Routes } from "@angular/router";
import { ChatHome } from "./chat-home/chat-home";

export const chatRoutes: Routes = [
    { path: '', title: 'Employee Chat', component: ChatHome }
]