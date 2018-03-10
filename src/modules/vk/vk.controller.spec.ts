import * as express from 'express';
import * as request from 'supertest';
import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {VkController} from './vk.controller';
import {VkService} from './vk.service';
import {VkModule} from './vk.module';

describe('VkController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [VkController],
      components: [VkService],
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let controller: VkController;
  let service: VkService;
  beforeEach(() => {
    controller = module.get(VkController);
    service = module.get(VkService);
  });

  it('should exist', () => {
    expect(controller).toBeTruthy();
  });

  describe('mock service', () => {
    it('users', async () => {
      const value = '1,2,3';
      jest.spyOn(service, 'users').mockImplementation(users => [{count: 2, users}]);
      expect(await controller.users(value)).toEqual([{count: 2, users: value}]);
    });

    it('friends', async () => {
      const userId = '5';
      const result = {response: [{uid: userId, first_name: 'name'}]};
      jest.spyOn(service, 'friends').mockImplementation(id => ({res: result, id}));
      expect(await controller.friends(userId)).toEqual({res: result, id: +userId});
    });
  });

  describe('api', () => {
    const server = express();
    const vkService: VkService = {} as any;
    let app;

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [VkModule],
        controllers: [VkController],
      })
        .overrideComponent(VkService).useValue(vkService)
        .compile();

      app = module.createNestApplication(server);
      await app.init();
    });

    afterAll(() => {
      app.close();
    });

    it('users', async done => {
      vkService['users'] = jest.fn(users => ['test' + users]);
      const userIds = '1,2,3';

      const res = await request(server)
        .get(`/vk/users?users_ids=${userIds}`)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(['test' + userIds]);
      expect(vkService.users).toHaveBeenCalledWith(userIds);

      done();
    });

    it('friends', async done => {
      vkService['friends'] = jest.fn(id => ['test' + id]);
      const userId = 5;

      const res = await request(server)
        .get(`/vk/friends?user_id=${userId}`)
        .set('Accept', 'application/json');

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(['test' + userId]);
      expect(vkService.friends).toHaveBeenCalledWith(userId);

      done();
    });
  });
});
