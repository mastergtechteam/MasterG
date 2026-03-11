export type UpdateType = "force" | "optional" | "ok";

export interface VersionCheckResult {
  type: UpdateType;
  storeUrl?: string;
}

export interface VersionConfig {
  latestVersion: string;
  minSupportedVersion: string;
  forceUpdate: boolean;
  storeUrl: string;
}
