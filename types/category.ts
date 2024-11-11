export const AssetType = {
  CROP: "crop",
  LIVESTOCK: "livestock",
  // Add other asset types as needed
} as const;

// Create a type from the values
export type AssetType = (typeof AssetType)[keyof typeof AssetType];

// Keep your existing AssetInfoType
export type AssetInfoType = {
  assetType: string;
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
};
