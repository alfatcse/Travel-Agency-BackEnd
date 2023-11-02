import bcrypt from "bcrypt";
import config from "../config";
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
export const hashPassword = async (password: string): Promise<string> => {
  const HashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );
  console.log(HashedPassword);
  return HashedPassword;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export const hasTimeConflict = (
//   existingSlots: {
//     startTime: string;
//     endTime: string;
//     dayOfWeek: WeekDays;
//   }[],
//   newSlot: {
//     startTime: string;
//     endTime: string;
//     dayOfWeek: WeekDays;
//   }
// ) => {
//   for (const slot of existingSlots) {
//     const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
//     const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
//     const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
//     const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);
//     if (newStart <= existingEnd && newEnd >= existingStart) {
//       return true;
//     }
//   }
//   return false;
// };
