import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';
import { Injectable } from '@nestjs/common';

type CreateProductParams = {
  title: string;
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  listAllProducts() {
    return this.prisma.product.findMany();
  }

  findProductById(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct({ title }: CreateProductParams) {
    const slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      trim: true,
    });
    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error(`Product with slug ${slug} already exists`);
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
