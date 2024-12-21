import { OrganizationRole } from "./Role";

export enum OrganizationPermission {
  VIEW_MEMBERS = "view_members",
  ADD_MEMBER = "add_member",
  UPDATE_MEMBER = "update_member",
  REMOVE_MEMBER = "remove_member",
  VIEW_PRODUCTS = "view_products",
  CREATE_PRODUCT = "create_product",
  UPDATE_PRODUCT = "update_product",
  DELETE_PRODUCT = "delete_product",
  MANAGE_SETTINGS = "manage_settings",
}

export const RolePermissions = {
  [OrganizationRole.OWNER]: Object.values(OrganizationPermission),
  [OrganizationRole.ADMIN]: [
    OrganizationPermission.VIEW_MEMBERS,
    OrganizationPermission.ADD_MEMBER,
    OrganizationPermission.UPDATE_MEMBER,
    OrganizationPermission.REMOVE_MEMBER,
    OrganizationPermission.VIEW_PRODUCTS,
    OrganizationPermission.CREATE_PRODUCT,
    OrganizationPermission.UPDATE_PRODUCT,
    OrganizationPermission.DELETE_PRODUCT,
  ],
  [OrganizationRole.EDITOR]: [
    OrganizationPermission.VIEW_MEMBERS,
    OrganizationPermission.VIEW_PRODUCTS,
    OrganizationPermission.CREATE_PRODUCT,
    OrganizationPermission.UPDATE_PRODUCT,
  ],
  [OrganizationRole.VIEWER]: [
    OrganizationPermission.VIEW_MEMBERS,
    OrganizationPermission.VIEW_PRODUCTS,
  ],
};
