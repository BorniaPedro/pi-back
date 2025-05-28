import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Projects e2e', () => {
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

  describe('Creating new project', () => {
    it('should create a new project', async () => {
      const response = await request(app.getHttpServer())
        .post('/project')
        .send({
          name: 'Projeto Sustentável Alpha',
          location: 'São Paulo',
          state: 'SP',
          climateZone: 'Tropical',
          ecologicalZone: 'Mata Atlântica',
          startPeriod: '2025-06-01',
          endPeriod: '2025-12-31',
        })
        .expect(201);

      createdId = response.body.id;
    });

    it('should not create a new project without data', () => {
      return request(app.getHttpServer()).post('/project').expect(400);
    });
  });

  describe('Getting projects', () => {
    it('should return projects', () => {
      return request(app.getHttpServer()).get('/project').expect(200);
    });

    it('should return one project', async () => {
      const getResponse = await request(app.getHttpServer())
        .get(`/project/${createdId}`)
        .expect(200);

      expect(getResponse.body).toEqual({
        id: createdId,
        name: 'Projeto Sustentável Alpha',
        location: 'São Paulo',
        state: 'SP',
        climateZone: 'Tropical',
        ecologicalZone: 'Mata Atlântica',
        startPeriod: '2025-06-01',
        endPeriod: '2025-12-31',
      });
    });
  });

  describe('Updating project', () => {
    it('should update project name and climateZone', async () => {
      const updatedData = {
        name: 'Projeto Sustentável Beta',
        startPeriod: '2026-06-01',
        endPeriod: '2026-12-31',
      };

      const response = await request(app.getHttpServer())
        .put(`/project/${createdId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.startPeriod).toBe(updatedData.startPeriod);
      expect(response.body.endPeriod).toBe(updatedData.endPeriod);
    });

    it('should return 404 when updating non-existing project', () => {
      return request(app.getHttpServer())
        .patch(`/project/9999999`)
        .send({ name: 'Does not exist' })
        .expect(404);
    });
  });

  describe('Deleting project', () => {
    it('should delete the project', () => {
      return request(app.getHttpServer())
        .delete(`/project/${createdId}`)
        .expect(200);
    });

    it('should return 404 when deleting already deleted or non-existing project', () => {
      return request(app.getHttpServer())
        .delete(`/project/${createdId}`)
        .expect(404);
    });
  });
});
