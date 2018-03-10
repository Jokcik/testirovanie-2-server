import {environment as environmentDevelop} from './environment';
import {environment as environmentProd} from './environment.prod';
import {environment as environmentTest} from './environment.test';

export default function() {
  console.log('BLAAAAA');
  const ENV = process.env.NODE_ENV;

  if (ENV === 'prod') {
    Object.assign(environmentDevelop, environmentProd);
    Object.assign(environmentTest, environmentProd);
  } else if (ENV === 'test') {
    Object.assign(environmentProd, environmentTest);
    Object.assign(environmentDevelop, environmentTest);
  } else {
    Object.assign(environmentProd, environmentDevelop);
    Object.assign(environmentTest, environmentDevelop);
  }
}