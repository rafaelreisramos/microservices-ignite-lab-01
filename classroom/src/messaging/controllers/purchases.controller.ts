import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { logger } from '../../util/logger';

type Customer = {
  authUserId: string;
};

type Product = {
  id: string;
  title: string;
  slug: string;
};

export type PurchaseCreatedPayload = {
  customer: Customer;
  product: Product;
};

@Controller()
export class PurchaseController {
  @EventPattern('purchase.new')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    logger.info(payload);
  }
}
