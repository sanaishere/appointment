import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SalaryRate } from './model/salary-rate.model';
import { Model } from 'mongoose';
import { SalaryRateInput } from './dto/salaryRate.dto';
import { SalaryRateUpdate } from './dto/salaryRateUpdate.dto';

@Injectable()
export class SalaryRateService {
  constructor(
    @InjectModel(SalaryRate.name) private salatyRateModel: Model<SalaryRate>,
  ) {}
  async create(input: SalaryRateInput) {
    const found = await this.salatyRateModel.findOne({ year: input.year });
    if (found) {
      throw new HttpException(
        'you have already insert this year rate',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createRate = await this.salatyRateModel.create({
      ...input,
      incomePerPatient: input.income,
    });
    return await createRate.save();
  }
  async update(id: number, input: SalaryRateUpdate) {
    const found = await this.salatyRateModel.findById(id);
    if (!found) {
      throw new HttpException(
        `salary rate with  id ${id} is not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(found, input);
    return await found.save();
  }

  async getPerYear(year: number) {
    const found = await this.salatyRateModel.findOne({ year: year });
    if (!found) {
      throw new HttpException(
        `year ${year} salary rate is not yet created`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return found;
  }
}
