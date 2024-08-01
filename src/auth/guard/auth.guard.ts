import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let payload:string;
        let value
        if(context.getType<GqlContextType>()==="graphql"){
            let ctx=GqlExecutionContext.create(context).getContext()
            let req=ctx.req
            payload=req.cookies['auth']
            if(!payload){
                throw new HttpException('you shold register,there is no cookie',HttpStatus.UNAUTHORIZED)
            }
            value=this.verifyToken(payload)
            GqlExecutionContext.create(context).getContext().req.user=value
            return true
         }else{
            payload= context.switchToHttp().getRequest().cookies['auth']
            if(!payload){
                throw new HttpException('you shold register,there is no cookie',HttpStatus.UNAUTHORIZED)
            }
            value=this.verifyToken(payload)
            context.switchToHttp().getRequest().user=value
            return true
         }

    }
     verifyToken(token:string){
        return this.jwtService.verify(token)
     }
    
}