import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
  rating: 5,
  productId,
  name: 'Test User',
  title: 'Test Title',
  description: 'This is a test review.',
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('review/create (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/review/create')
      .send(testDto)
      .expect(201);

    createdId = response.body._id;
    expect(createdId).toBeDefined();
  });

  it('review/create (POST) - fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/review/create')
      .send({ ...testDto, rating: 6 })
      .expect(400);
  });

  it('review/:id (GET)', async () => {
    await request(app.getHttpServer())
      .get(`/api/review/product/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('review/:id (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/api/review/${createdId}`)
      .expect(200);
  });
});
