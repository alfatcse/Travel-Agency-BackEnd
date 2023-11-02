export const UserType = ["admin", "customer", "super_admin"];
export const userSearchableFields: string[] = ["name", "email"];
export const userRelationalFields: string[] = ["customerId", "adminId"];
export const userRelationalFieldsMapper: { [key: string]: string } = {
  customerId: "customerId",
  adminId: "adminId",
};
