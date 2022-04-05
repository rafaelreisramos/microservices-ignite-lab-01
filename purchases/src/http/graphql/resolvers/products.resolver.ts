import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models/product';
import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
