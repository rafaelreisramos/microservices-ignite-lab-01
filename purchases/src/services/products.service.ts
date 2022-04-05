import { PrismaService } from '../database/prisma/prisma.service';

export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }
}
