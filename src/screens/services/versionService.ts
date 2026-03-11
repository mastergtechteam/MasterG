import DeviceInfo from "react-native-device-info";
import { Platform } from "react-native";
import { isVersionLower } from "../../utils/versionUtils";
import { VersionCheckResult } from "../../types/version";
import { getVersionConfigApi } from "../../api/versionApi";

export const checkAppVersion = async (): Promise<VersionCheckResult> => {

  const config = await getVersionConfigApi();

  // 🔥 Select platform config
  const platformConfig =
    Platform.OS === "ios" ? config.ios : config.android;

  const currentVersion = DeviceInfo.getVersion();

 

  // FORCE UPDATE
  if (isVersionLower(currentVersion, platformConfig.minSupportedVersion)) {
    return {
      type: "force",
      storeUrl: platformConfig.storeUrl
    };
  }

  // OPTIONAL UPDATE
  if (isVersionLower(currentVersion, platformConfig.latestVersion)) {
    return {
      type: "optional",
      storeUrl: platformConfig.storeUrl
    };
  }

  return { type: "ok" };
};
