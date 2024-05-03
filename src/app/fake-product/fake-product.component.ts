import { Component } from '@angular/core';
import { FakeProductService } from '../services/fake-product.service';
import { Subscription } from 'rxjs';
import { GraphqlLinkService} from '../services/graphql.link.service';

@Component({
  selector: 'app-fake-product',
  templateUrl: './fake-product.component.html',
  styleUrls: ['./fake-product.component.css']
})

export class FakeProductComponent {

  constructor(private fakeProductService: FakeProductService,
              private graphqlLinkService: GraphqlLinkService,
    ) 
    { }
    //arrFakeProducts = [];
    arrLinks = [];
    loading: boolean;

    private querySubscription: Subscription;    
    
    ngAfterViewInit(): void {
      this.getLinks();
     
    }

    private getLinks()
    {
      /*
     this.fakeProductService.getFake_Products().subscribe((fakeProducts: any) => {
       this.arrFakeProducts = fakeProducts;
       console.log(this.arrFakeProducts);
      });
    */
     alert("query");
     this.querySubscription = this.graphqlLinkService.getLinks()
      //.valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.arrLinks = JSON.parse(JSON.stringify(data)).links;
        console.log(JSON.stringify(this.arrLinks))
      });


    }
   
}
