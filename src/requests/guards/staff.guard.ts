import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class StaffGuard implements CanActivate {
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if(context.getType<GqlContextType>()==="graphql"){
            let ctx=GqlExecutionContext.create(context).getContext()
            let req=ctx.req
            let roles:String[]=req.user.roles
            console.log(roles)
            if(!roles.includes('staff')){
             throw new HttpException('you should be staff to do this',HttpStatus.FORBIDDEN)
            }
            return true
        }
    }
}