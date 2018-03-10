import * as express from 'express';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { VkService } from './vk.service';
import {environment} from '../../config/environment.test';

describe('VkService', () => {
  let server;
  let http;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      components: [VkService],
    }).compile();

    server = express();
    http = server.listen(environment.port);
  });

  let service: VkService;
  beforeEach(() => {
    service = module.get(VkService);
  });

  afterEach(() => {
    http.close();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('/users service', async () => {
    server.use('*', (req, res, next) => res.send(JSON.stringify({response: 'users'})));
    expect(await service.users('1,2,3')).toEqual({response: 'users'});
  });

  it('/friends service', async () => {
    server.use('*', (req, res, next) => res.send(JSON.stringify({response: 'friends'})));
    expect(await service.friends(1)).toEqual({response: 'friends'});
  });
});
