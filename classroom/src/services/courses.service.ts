import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

type CreateCourseParams = {
  title: string;
  slug?: string;
};

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.course.findMany();
  }

  findCourseById(id: string) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  findCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({ where: { slug } });
  }

  async createCourse({
    title,
    slug = slugify(title, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
      trim: true,
    }),
  }: CreateCourseParams) {
    const courseWithSameSlug = await this.prisma.course.findUnique({
      where: { slug },
    });

    if (courseWithSameSlug) {
      throw new Error(`Course with slug ${slug} already exists`);
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
