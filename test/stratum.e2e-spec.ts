import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Stratums e2e', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Creating new stratum', () => {
    it('should create a new stratum', async () => {
      const response = await request(app.getHttpServer())
        .post('/stratum')
        .send({
          name: 'stratum test',
          landUseBaseline: "test land use baseline",
          landUseProject: "test land use project"
        })
        .expect(201);

      createdId = response.body.id;
    });

    it('should not create a new stratum without data', () => {
      return request(app.getHttpServer()).post('/stratum').expect(400);
    });
  });

  describe('Getting stratums', () => {
    it('should return stratums', () => {
      return request(app.getHttpServer()).get('/stratum').expect(200);
    });

    it('should return one stratum', async () => {
      const getResponse = await request(app.getHttpServer())
        .get(`/stratum/${createdId}`)
        .expect(200);

      expect(getResponse.body).toEqual({
        id: createdId,
        name: 'stratum test',
        landUseBaseline: "test land use baseline",
        landUseProject: "test land use project"
      });
    });
  });

  describe('Updating stratum', () => {
    it('should update stratum name', async () => {
      const updatedData = {
        name: 'stratum updated',
      };

      const response = await request(app.getHttpServer())
        .put(`/stratum/${createdId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
    });

    it('should return 404 when updating non-existing stratum', () => {
      return request(app.getHttpServer())
        .patch(`/stratum/9999999`)
        .send({ name: 'Does not exist' })
        .expect(404);
    });
  });

  describe('Deleting stratum', () => {
    it('should delete the stratum', () => {
      return request(app.getHttpServer())
        .delete(`/stratum/${createdId}`)
        .expect(200);
    });

    it('should return 404 when deleting already deleted or non-existing stratum', () => {
      return request(app.getHttpServer())
        .delete(`/stratum/${createdId}`)
        .expect(404);
    });
  });
});
