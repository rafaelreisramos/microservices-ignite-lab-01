import path from 'node:path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { StudentsResover } from './graphql/resolvers/students.resolver';
import { EnrollmentsResover } from './graphql/resolvers/enrollments.resolver';
import { CoursesResover } from './graphql/resolvers/courses.resolvers';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';
import { CoursesService } from '../services/courses.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    StudentsResover,
    StudentsService,
    CoursesResover,
    CoursesService,
    EnrollmentsResover,
    EnrollmentsService,
  ],
})
export class HttpModule {}
