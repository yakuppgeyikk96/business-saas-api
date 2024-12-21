import { OrganizationMemberRepository } from "@/repositories/organizationMember.repository";
import {
  CreateOrganizationMemberInput,
  UpdateOrganizationMemberInput,
} from "@/schemas/organizationMember";
import { NotFoundError, UnauthorizedError } from "@/types/error";
import { OrganizationRole } from "@/types/organization/Role";
import { IOrganizationMember } from "@/models/organizationMember.model";
import {
  OrganizationPermission,
  RolePermissions,
} from "@/types/organization/Permission";

export class OrganizationMemberService {
  private static instance: OrganizationMemberService;
  private organizationMemberRepository: OrganizationMemberRepository;

  constructor() {
    this.organizationMemberRepository = new OrganizationMemberRepository();
  }

  public static getInstance(): OrganizationMemberService {
    if (!OrganizationMemberService.instance) {
      OrganizationMemberService.instance = new OrganizationMemberService();
    }
    return OrganizationMemberService.instance;
  }

  async findByOrganizationAndUser(
    organizationId: string,
    userId: string
  ): Promise<IOrganizationMember | null> {
    return this.organizationMemberRepository.findByOrganizationAndUser(
      organizationId,
      userId
    );
  }

  async addMember(
    data: CreateOrganizationMemberInput
  ): Promise<IOrganizationMember> {
    const existingMember =
      await this.organizationMemberRepository.findByOrganizationAndUser(
        data.organization,
        data.user
      );

    if (existingMember) {
      throw new Error("User is already a member of this organization");
    }

    if (data.role === OrganizationRole.OWNER) {
      const existingOwner = await this.organizationMemberRepository.findOne({
        organization: data.organization,
        role: OrganizationRole.OWNER,
      });

      if (existingOwner) {
        throw new Error("Organization already has an owner");
      }
    }

    const memberData = {
      ...data,
      permissions: data.permissions || RolePermissions[data.role],
    };

    return this.organizationMemberRepository.create(memberData);
  }

  async getOrganizationMembers(
    organizationId: string,
    options?: {
      page?: number;
      limit?: number;
      sortField?: string;
      sortOrder?: "asc" | "desc";
    }
  ): Promise<{ members: IOrganizationMember[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortField,
      sortOrder = "asc",
    } = options || {};

    const query = { organization: organizationId };
    console.log("Service - query:", query);

    const total = await this.organizationMemberRepository.count(query);
    console.log("Service - total count:", total);

    const members = await this.organizationMemberRepository.findAll({
      query,
      sort: sortField ? { [sortField]: sortOrder } : undefined,
      skip: (page - 1) * limit,
      limit,
    });
    console.log("Service - found members:", members);

    return { members, total };
  }

  async getMember(id: string): Promise<IOrganizationMember> {
    const member = await this.organizationMemberRepository.findById(id);

    if (!member) {
      throw new NotFoundError("Member not found");
    }

    return member;
  }

  async updateMember(
    id: string,
    data: UpdateOrganizationMemberInput
  ): Promise<IOrganizationMember> {
    const member = await this.organizationMemberRepository.findById(id);

    if (!member) {
      throw new NotFoundError("Member not found");
    }

    if (
      member.role === OrganizationRole.OWNER ||
      data.role === OrganizationRole.OWNER
    ) {
      throw new UnauthorizedError("Owner role cannot be changed");
    }

    let updateData = { ...data };
    if (data.role && data.role !== member.role && !data.permissions) {
      updateData.permissions = RolePermissions[data.role];
    }

    const updatedMember = await this.organizationMemberRepository.update(
      id,
      updateData
    );
    if (!updatedMember) {
      throw new NotFoundError("Member not found");
    }

    return updatedMember;
  }

  async removeMember(id: string): Promise<IOrganizationMember> {
    const member = await this.organizationMemberRepository.findById(id);

    if (!member) {
      throw new NotFoundError("Member not found");
    }

    if (member.role === OrganizationRole.OWNER) {
      throw new UnauthorizedError("Owner cannot be removed");
    }

    const deletedMember = await this.organizationMemberRepository.delete(id);
    if (!deletedMember) {
      throw new NotFoundError("Member not found");
    }

    return deletedMember;
  }

  async hasPermission(
    organizationId: string,
    userId: string,
    permission: OrganizationPermission
  ): Promise<boolean> {
    const member =
      await this.organizationMemberRepository.findByOrganizationAndUser(
        organizationId,
        userId
      );

    if (!member) {
      return false;
    }

    return member.permissions.includes(permission);
  }
}

export const organizationMemberService =
  OrganizationMemberService.getInstance();
