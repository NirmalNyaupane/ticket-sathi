import { EnvConfiguration, Environment } from "../config/env.config";
import Radis from "ioredis";

class RedisUtil {
    static redis: null | Radis = null;
    initiate() {
        if (EnvConfiguration.NODE_ENV === Environment.DEVELOPMENT) {
            RedisUtil.redis = new Radis({
                maxRetriesPerRequest: null
            });
        }
    }
}

export default RedisUtil;