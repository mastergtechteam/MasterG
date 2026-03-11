import { useEffect, useState } from "react";
import { checkAppVersion } from "../screens/services/versionService";
import { VersionCheckResult } from "../types/version";

export const useAppVersionCheck = () => {

  const [updateStatus, setUpdateStatus] = useState<VersionCheckResult | null>(null);

  useEffect(() => {

    const check = async () => {
      const result = await checkAppVersion();
      setUpdateStatus(result);
    };

    check();

  }, []);

  return updateStatus;
};
