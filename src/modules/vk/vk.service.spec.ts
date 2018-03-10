import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { VkService } from './vk.service';
import { expect } from 'chai';

describe('VkService', () => {
  let module: TestingModule;
  beforeEach(() => {
    return Test.createTestingModule({
      components: [
        VkService,
      ],
    }).compile()
      .then(compiledModule => module = compiledModule);
  });

  let service: VkService;
  beforeEach(() => {
    service = module.get(VkService);
  });

  it('should exist', () => {
    expect(service).to.exist;
  });


});
