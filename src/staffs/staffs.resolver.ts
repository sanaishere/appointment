import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StaffsService } from './staffs.service';
import { User } from 'src/auth/models/user.model';
import { StaffInput } from './dto/staff.dto';
import { StaffUpdateInput } from './dto/staff.update';

@Resolver()
export class StaffsResolver {
    constructor(private staffService:StaffsService){}
    @Mutation(()=>User,{name:'create'})
    async create(@Args('staffInput') staffInput:StaffInput) {
        
        
    }
    @Mutation(()=>User,{name:'edit'})
    async update(@Args('staffInput') staffUpdateInput:StaffUpdateInput) {
        
        
    }
    @Mutation(()=>User,{name:'delet'})
    async delete(@Args('id') staffId:number){

    }
    @Query(()=>[User])
    async getAll(){

    }

    @Query(()=>User,{name:'getUser'})
    async getOne(@Args('id') staffId:number) {

    }
}
