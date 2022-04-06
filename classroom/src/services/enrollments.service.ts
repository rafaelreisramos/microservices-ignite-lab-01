import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

type CourseAndStudentParams = {
  studentId: string;
  courseId: string;
};

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllFromStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByCourseAndStudent({ courseId, studentId }: CourseAndStudentParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  create({ studentId, courseId }: CourseAndStudentParams) {
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }
}
