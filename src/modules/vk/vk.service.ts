import { Component } from '@nestjs/common';
import fetch from 'node-fetch';
import {environment} from '../../config/environment';

@Component()
export class VkService {
  public async users(usersIds: string): Promise<any> {
    const response = await fetch(`${environment.host}/users.get?user_ids=${usersIds}&v=5.0`);
    return response.json();
  }

  public async friends(userId: number) {
    const response = await fetch(`${environment.host}/friends.get?user_id=${userId}&v=5.0&fields=[nickname]`);
    return response.json();
  }
}
