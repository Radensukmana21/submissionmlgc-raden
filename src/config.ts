import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    gcp: {
        projectId: process.env.GCP_PROJECT_ID,
        serviceAccountKeyPath: process.env.GCP_SERVICE_ACCOUNT_KEY_PATH,
    },
};
