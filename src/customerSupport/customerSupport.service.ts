import { Injectable } from '@nestjs/common';

@Injectable()
export class customerSupportService {
    getHello(): string {
        return 'Hello CustomerSupport!';
    }
    registerUser(myobj:object):object{
        return myobj;
    }
}