import { Injectable, CanActivate, ExecutionContext } from  '@nestjs/common';
import { Observable } from 'rxjs';
/*
@Injectable()
 export class SessionGuard implements CanActivate {
 canActivate(
 context: ExecutionContext,
 ): boolean |Promise<boolean>|Observable<boolean>{
 const request = context.switchToHttp().getRequest();
 return (request.session.email !== undefined);
 }
}*/


//import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
//import { Observable } from 'rxjs';

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return !!request.session?.email; // Check if email property exists in the session
  }
}
