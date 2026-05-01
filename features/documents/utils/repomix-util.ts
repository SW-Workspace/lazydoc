import { runCli } from "repomix";
import fs from "fs";
import { randomUUID } from "crypto";

export async function processRemoteRepoPublic(repoUrl: string) {
  const uuid = randomUUID();
  const outputFile = `output-${uuid}.xml`;

  try {
    const options = {
      remote: repoUrl,
      output: outputFile,
      compress: true,
    };

    const result = await runCli(["."], process.cwd(), options);

    const text = await fs.promises.readFile(outputFile, "utf-8");

    return { text: text, result: result, uuid: uuid };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`There was an error getting repository: ${message}`, {
      cause: error,
    });
  }
}
