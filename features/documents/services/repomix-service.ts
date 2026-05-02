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

    return { text, result, uuid };
  } finally {
    await fs.promises.unlink(outputFile).catch((unlinkError: unknown) => {
      console.warn("Could not delete temp file:", unlinkError);
    });
  }
}
