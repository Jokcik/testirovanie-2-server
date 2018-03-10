import { Module } from '@nestjs/common';
import {VkModule} from './modules/vk/vk.module';

@Module({
  imports: [],
  controllers: [],
  components: [],
  modules: [VkModule],
})
export class ApplicationModule {}
