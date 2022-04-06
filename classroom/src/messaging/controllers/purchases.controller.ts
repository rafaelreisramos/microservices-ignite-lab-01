import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrollmentsService } from '../../services/enrollments.service';
import { StudentsService } from '../../services/students.service';

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
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchase.new')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.findStudentByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.findCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.create({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
