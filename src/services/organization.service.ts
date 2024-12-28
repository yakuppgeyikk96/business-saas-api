import { OrganizationRepository } from "@/repositories/organization.repository";
import { UpdateOrganizationInput } from "@/schemas/organization";
import { NotFoundError, UnauthorizedError } from "@/types/error";
import CreateOrganizationData from "@/types/organization/CreateOrganizationData";
import IOrganization from "@/types/organization/IOrganization";
import { organizationMemberService } from "./organizationMember.service";
import { OrganizationRole } from "@/types/organization/Role";
import { OrganizationMemberRepository } from "@/repositories/organizationMember.repository";

export class OrganizationService {
  private static instance: OrganizationService;
  private organizationRepository: OrganizationRepository;
  private organizationMemberRepository: OrganizationMemberRepository;

  constructor() {
    this.organizationRepository = new OrganizationRepository();
    this.organizationMemberRepository = new OrganizationMemberRepository();
  }

  /**
   * Singleton pattern
   * @returns {OrganizationService}
   */
  public static getInstance(): OrganizationService {
    if (!OrganizationService.instance) {
      OrganizationService.instance = new OrganizationService();
    }
    return OrganizationService.instance;
  }

  /**
   * Create a new organization
   * @param data
   * @returns
   */
  async createOrganization(
    data: CreateOrganizationData
  ): Promise<IOrganization> {
    const organization = await this.organizationRepository.create(data);

    /**
     * Add the owner as a member of the organization
     */
    await organizationMemberService.addMember({
      organization: organization._id!.toString(),
      user: data.owner,
      role: OrganizationRole.OWNER,
    });

    return organization;
  }

  /**
   * Get organization by id and check if the user has access to it
   */
  async getOrganization(id: string, userId: string): Promise<IOrganization> {
    const membership =
      await organizationMemberService.findByOrganizationAndUser(id, userId);

    if (!membership) {
      throw new UnauthorizedError(
        "You do not have access to this organization"
      );
    }

    const organization = await this.organizationRepository.findById(id);

    if (!organization) {
      throw new NotFoundError("Organization not found");
    }

    return organization;
  }

  /**
   * Get all organizations owned by a user
   */
  async getUserOrganizations(userId: string): Promise<IOrganization[]> {
    return await this.organizationRepository.findByOwner(userId);
  }

  /**
   * Update an organization
   */
  async updateOrganization(
    id: string,
    userId: string,
    data: UpdateOrganizationInput
  ): Promise<IOrganization> {
    /**
     * Check if the user has access to the organization
     */
    await this.getOrganization(id, userId);

    const updatedOrganization = await this.organizationRepository.update(
      id,
      data
    );

    if (!updatedOrganization) {
      throw new Error("Failed to update organization");
    }

    return updatedOrganization;
  }

  /**
   * Delete an organization
   */
  async deleteOrganization(id: string, userId: string): Promise<IOrganization> {
    /**
     * Check user has access to the organization
     */
    await this.getOrganization(id, userId);

    await this.organizationMemberRepository.deleteMany({ organization: id });

    const deletedOrganization = await this.organizationRepository.delete(id);

    if (!deletedOrganization) {
      throw new Error("Failed to delete organization");
    }

    return deletedOrganization;
  }
}

export const organizationService = OrganizationService.getInstance();
