import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;
  @Field(() => Date, { nullable: true })
  canceledAt: Date;
  @Field(() => Date)
  createdAt: Date;

  studentId: string;
  courseId: string;
}
