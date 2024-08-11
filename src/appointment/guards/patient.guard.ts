import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

import { Observable } from "rxjs";

@Injectable()
export class PatientGuard implements CanActivate {
    constructor(){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        if(context.getType<GqlContextType>()==="graphql"){
            let ctx=GqlExecutionContext.create(context).getContext()
            let req=ctx.req
            let roles:String[]=req.user.roles
            console.log(roles)
            if(!roles.includes('patient')){
             throw new HttpException('you should be patient to do this',HttpStatus.FORBIDDEN)
            }
            return true
        }
    }
}