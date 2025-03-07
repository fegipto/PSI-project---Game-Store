import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService} from './service/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListsComponent } from './lists/lists.component';
import { LibraryComponent } from './library/library.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { ItemService } from './service/item.service';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { LoginComponent } from './login/login.component';
import { UserloginService } from './service/userlogin.service';
import { LoginService } from './service/login.service';
import { CartService } from './service/cart.service';
import { CartComponent } from './cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { CarrinhoComprasComponent } from './carrinho-compras/carrinho-compras.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    ListsComponent,
    LibraryComponent,
    FollowingComponent,
    FollowersComponent,
    ItemsSearchComponent,
    ItemDetailComponent,
    UserLoginComponent,
    LoginComponent,
    CartComponent,
    CarrinhoComprasComponent,
    ShoppingCartComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    /** The HttpClientInMemoryWebApiModule module intercepts HTTP requests
     and returns simulated server responses.
     Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )*/
  ],
  providers: [UserService, ItemService, UserloginService, LoginService, CartService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
