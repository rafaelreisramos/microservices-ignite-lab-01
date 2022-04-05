import { Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product';
import { ProductsService } from '../../../services/products.service';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productService.listAllProducts();
  }
}
