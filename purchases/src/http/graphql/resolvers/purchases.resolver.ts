import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Purchase } from '../models/purchase';

@Resolver()
export class PurchasesResolver {
  constructor(private purchasesService: PurchasesService) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }
}
