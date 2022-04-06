import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
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

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   return this.studentsService.findStudentByAuthUserId(user.sub);
  // }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listAllFromStudent(student.id);
  }
}
