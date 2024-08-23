import dotenv from "dotenv";
import { Logger } from "winston";
import assert from "assert";
import { GetLogger } from "./logger";

dotenv.config();

export type TestConfig = {
  BASE_URL: string;
  DEBUG_LEVEL: string;
  IS_HEADLESS: boolean;
  logger: Logger;
  artifacts: string;
};

export function GetConfig(): TestConfig {
  const { BASE_URL, DEBUG_LEVEL, HEADLESS } = process.env;

  assert(BASE_URL, "Missing BASE_URL in .env file");
  assert(DEBUG_LEVEL, "Missing DEBUG_LEVEL in .env file");
  assert(HEADLESS, "Missing HEADLESS in .env file");

  if (
    DEBUG_LEVEL.toLowerCase() !== "info" &&
    DEBUG_LEVEL.toLowerCase() !== "debug"
  ) {
    throw "DEBUG_LEVEL must be INFO or DEBUG";
  }

  const artifactsDir = `${__dirname}/../../artifacts`;
  const logger = GetLogger(DEBUG_LEVEL as "info" | "debug");
  return {
    BASE_URL,
    DEBUG_LEVEL,
    logger,
    IS_HEADLESS: HEADLESS === "true",
    artifacts: artifactsDir,
  };
}
