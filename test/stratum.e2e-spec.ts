import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Stratums e2e', () => {
  let app: INestApplication;
  let createdId: number;
  let createdProjectId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();

    const projectDto = {
      name: 'Projeto Sustentável Alpha',
      location: 'São Paulo',
      state: 'SP',
      climateZone: 'Tropical',
      ecologicalZone: 'Mata Atlântica',
      startPeriod: '2025-06-01',
      endPeriod: '2025-12-31',
    };

    try {
      const response = await request(app.getHttpServer())
        .post('/project')
        .send(projectDto)
        .expect(201);

      createdProjectId = response.body.id;

      if (!createdProjectId) {
        throw new Error('Failed to create project or extract its ID in beforeAll.');
      }
    } catch (error) {
      console.error('Failed to create project in beforeAll:', error.response?.body || error.message);
      throw error;
    }
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
          landUseProject: "test land use project",
          projectId: createdProjectId,
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
        landUseProject: "test land use project",
        projectId: createdProjectId
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
