import {Test} from '@nestjs/testing';
import {TestingModule} from '@nestjs/testing/testing-module';
import {VkController} from './vk.controller';
import {VkService} from './vk.service';

describe('VkController', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      controllers: [
        VkController,
      ],
      components: [
        VkService,
      ],
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

  it('users', async () => {
    const value = '1,2,3';
    jest.spyOn(service, 'users').mockImplementation(users => [{count: 2, users}]);
    expect(await controller.users(value)).toEqual([{count: 2, users: value}]);
  });

  it('friends', async () => {
    const userId = 5;
    const result = {response: [{uid: userId, first_name: 'name'}]};
    jest.spyOn(service, 'friends').mockImplementation(id => ({res: result, id}));
    expect(await controller.friends(userId)).toEqual({res: result, id: userId});
  });
});
