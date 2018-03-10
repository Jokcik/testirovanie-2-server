import {Controller, Get, Query} from '@nestjs/common';
import {VkService} from './vk.service';

@Controller('vk')
export class VkController {
  constructor(private service: VkService) {
  }

  @Get('users')
  async users(@Query('users_ids') usersIds: string): Promise<any> {
    return await this.service.users(usersIds);
  }

  @Get('friends')
  async friends(@Query('userId') userId: string): Promise<any> {
    return await this.service.friends(+userId);
  }
}
