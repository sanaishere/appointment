import { Types } from 'mongoose';

export const validate = (id: string) => {
  if (Types.ObjectId.isValid(id)) {
    return true;
  } else {
    return false;
  }
};
