import { Component } from '@angular/core';
import { FakeProductService } from '../services/fake-product.service';

@Component({
  selector: 'app-fake-product',
  templateUrl: './fake-product.component.html',
  styleUrls: ['./fake-product.component.css']
})
export class FakeProductComponent {

  constructor(private fakeProductService: FakeProductService,
    ) 
    { }
    arrFakeProducts = [];

    ngAfterViewInit(): void {
      this.getFakeProducts();
     
    }

    private getFakeProducts()
    {
     this.fakeProductService.getFake_Products().subscribe((fakeProducts: any) => {
       this.arrFakeProducts = fakeProducts;
       console.log(this.arrFakeProducts);
      });
    
    }
   
}
