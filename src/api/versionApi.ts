


import { VersionConfig } from "../types/version";
export const getVersionConfigApi = async (): Promise<{
  android: VersionConfig;
  ios: VersionConfig;
}> => {

  const res = await fetch(
    "https://uqlzs7e7wj.execute-api.ap-south-1.amazonaws.com/app/version"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch version config");
  }

  return res.json();
};
