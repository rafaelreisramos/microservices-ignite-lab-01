import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Student } from '../models/student';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { EnrollmentsService } from '../../../services/enrollments.service';

@Resolver(() => Student)
export class StudentsResover {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAll();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listAllFromStudent(student.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.studentsService.findStudentByAuthUserId(reference.authUserId);
  }
}
