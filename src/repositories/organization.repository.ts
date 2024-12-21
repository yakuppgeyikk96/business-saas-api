import { OrganizationModel } from "@/models/organization.model";
import { UpdateOrganizationInput } from "@/schemas/organization";
import CreateOrganizationData from "@/types/organization/CreateOrganizationData";
import IOrganization from "@/types/organization/IOrganization";

export class OrganizationRepository {
  async create(data: CreateOrganizationData): Promise<IOrganization> {
    return OrganizationModel.create(data);
  }

  async findById(id: string): Promise<IOrganization | null> {
    return OrganizationModel.findById(id);
  }

  async findByOwner(ownerId: string): Promise<IOrganization[]> {
    const organizations = await OrganizationModel.find({ owner: ownerId });

    if (!organizations) {
      return [];
    }

    return organizations;
  }

  async update(
    id: string,
    data: UpdateOrganizationInput
  ): Promise<IOrganization | null> {
    return OrganizationModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<IOrganization | null> {
    return OrganizationModel.findByIdAndDelete(id);
  }
}
