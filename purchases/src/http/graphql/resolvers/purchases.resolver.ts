import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Purchase } from '../models/purchase';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }
  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productsService.findProductById(purchase.productId);
  }
}
