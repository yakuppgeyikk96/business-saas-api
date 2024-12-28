// repositories/organizationMember.repository.ts
import {
  IOrganizationMember,
  OrganizationMemberModel,
} from "@/models/organizationMember.model";
import {
  CreateOrganizationMemberInput,
  UpdateOrganizationMemberInput,
} from "@/schemas/organizationMember";
import { OrganizationRole } from "@/types/organization/Role";

interface FindAllOptions {
  query: any;
  sort?: { [key: string]: "asc" | "desc" };
  skip?: number;
  limit?: number;
}

export class OrganizationMemberRepository {
  async create(
    data: CreateOrganizationMemberInput
  ): Promise<IOrganizationMember> {
    return OrganizationMemberModel.create(data);
  }

  async findById(id: string): Promise<IOrganizationMember | null> {
    return OrganizationMemberModel.findById(id)
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");
  }

  async findOne(query: any): Promise<IOrganizationMember | null> {
    return OrganizationMemberModel.findOne(query)
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");
  }

  async findAll(options: FindAllOptions): Promise<IOrganizationMember[]> {
    const { query, sort, skip, limit } = options;
    let findQuery = OrganizationMemberModel.find(query)
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");

    if (sort) {
      const sortCriteria: { [key: string]: 1 | -1 } = {};
      Object.entries(sort).forEach(([key, value]) => {
        sortCriteria[key] = value === "asc" ? 1 : -1;
      });
      findQuery = findQuery.sort(sortCriteria);
    }

    if (skip !== undefined) findQuery = findQuery.skip(skip);
    if (limit !== undefined) findQuery = findQuery.limit(limit);

    return findQuery.exec();
  }

  async update(
    id: string,
    data: UpdateOrganizationMemberInput
  ): Promise<IOrganizationMember | null> {
    return OrganizationMemberModel.findByIdAndUpdate(id, data, { new: true })
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");
  }

  async delete(id: string): Promise<IOrganizationMember | null> {
    return OrganizationMemberModel.findByIdAndDelete(id);
  }

  async deleteMany(query: any): Promise<void> {
    await OrganizationMemberModel.deleteMany(query);
  }

  async findByOrganizationAndUser(
    organizationId: string,
    userId: string
  ): Promise<IOrganizationMember | null> {
    return OrganizationMemberModel.findOne({
      organization: organizationId,
      user: userId,
    })
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");
  }

  async findByOrganization(
    organizationId: string
  ): Promise<IOrganizationMember[]> {
    return OrganizationMemberModel.find({ organization: organizationId })
      .populate("user", "name email")
      .populate("organization", "name")
      .populate("invitedBy", "name email");
  }

  async count(query: any = {}): Promise<number> {
    return OrganizationMemberModel.countDocuments(query);
  }
}
