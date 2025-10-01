import { Routes } from '@angular/router';
import { StartScreen } from './start-screen/start-screen';
import { Game } from './game/game';

export const routes: Routes = [
    {path: '', component: StartScreen},
    {path: 'game', component: Game}
];
