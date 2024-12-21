import { CreateOrganizationInput } from "@/schemas/organization";

type CreateOrganizationData = CreateOrganizationInput & { owner: string };

export default CreateOrganizationData;
