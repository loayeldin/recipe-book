import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'' , redirectTo:'Auth' , pathMatch:'full'},
  {path:'recipe',loadChildren: ()=> import('./recipes/recipes.module').then(m=> m.RecipeModule)},
  {path:'shopping-list',loadChildren: ()=> import('./shopping-list/shopping-list.module').then(m=> m.ShoppingListModule)},
  {path:'Auth',loadChildren: ()=> import('./auth/auth.module').then(m=> m.AuthModule)},


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
