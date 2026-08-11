import { createClient } from "@sanity/client";
import { SANITY_PROJECT_ID } from "../../constants";

export const sanityClient = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: "production",
    apiVersion: "2026-08-11",
    useCdn: true,
});