import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  listAll() {
    return this.prisma.student.findMany();
  }

  findStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({ where: { authUserId } });
  }

  findStudentById(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }
}
