import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

createApp(App).use(store).mount('#app')

import { createReadStream, promises } from "fs";
import csvParser from "csv-parser";
import { StringUtil } from "./string-util";
import { validate } from "class-validator";
import {
  CsvValidationErrorRepresentation,
  ValidationErrorRepresentation,
} from "common/representations";

export class FileUtil {
  static async parseCsv<T>(file: Express.Multer.File): Promise<T[]> {
    const results: Array<T> = [];

    return new Promise((resolve, reject) => {
      createReadStream(file.path)
        .pipe(
          csvParser({
            mapHeaders: ({ header }) => StringUtil.returnCamelCase(header),
          }),
        )
        .on("data", (data) => results.push(data))
        .on("error", (error) => {
          reject(error);
        })
        .on("end", () => {
          resolve(results);
        });
    });
  }

  static async parseAndValidateCsv<T>(
    file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    factory: (data: any) => T,
  ): Promise<{
    data: T[];
    error?: ValidationErrorRepresentation;
  }> {
    const results: Array<T> = [];
    const errors: Array<CsvValidationErrorRepresentation> = [];
    let index = 0;

    return new Promise((resolve, reject) => {
      FileUtil.parseCsv(file)
        .then(async (parsedData) => {
          for (const data of parsedData) {
            try {
              index += 1;

              const d = factory(data);
              // eslint-disable-next-line @typescript-eslint/ban-types
              const validationErrors = await validate(<Object>d);

              if (validationErrors.length) {
                if (index < 4) {
                  const rowError: CsvValidationErrorRepresentation = {
                    fields: [],
                    row: `${index}`,
                  };

                  for (const e of validationErrors) {
                    rowError.fields.push({
                      constraints: e.constraints
                        ? Object.values(e.constraints)
                        : [],
                      fieldName: e.property,
                    });
                  }
                  errors.push(rowError);
                }
              } else {
                results.push(d);
              }
            } catch (e) {
              reject(e);
            }
          }

          resolve({
            data: results,
            error:
              errors.length > 0
                ? {
                    csv: errors,
                    description: "Invalid CSV file",
                  }
                : undefined,
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  static async getFileContents(filePath: string): Promise<Buffer> {
    const stream = createReadStream(filePath);
    const data: Buffer[] = [];

    return new Promise((resolve, reject) => {
      stream
        .on("data", (chunk: Buffer) => {
          data.push(chunk);
        })
        .on("error", (error) => {
          stream.destroy();
          stream.close();
          reject(error);
        })
        .on("end", () => {
          const finalData: Buffer = Buffer.concat(data);

          stream.destroy();
          stream.close();
          resolve(finalData);
        });
    });
  }

  static async writeData(params: {
    csvData?: Record<string, unknown>[];
    filePath: string;
    jsonString?: string;
  }): Promise<boolean> {
    const fileHandle = await promises.open(params.filePath, "w");

    try {
      if (params.csvData) {
        const objectKeys = Object.keys(params.csvData[0] ?? {});
        let csvData = objectKeys.join(",").replace(/,\s*$/, "");

        for (const datum of params.csvData) {
          const row: Array<string | unknown> = [];

          for (const index of objectKeys) {
            row.push(datum[index]);
          }

          csvData += `\n${row.join(",").replace(/,\s*$/, "")}`;
        }

        await fileHandle.writeFile(csvData);
      }

      if (params.jsonString) {
        await fileHandle.writeFile(params.jsonString);
      }
    } finally {
      await fileHandle.close();
    }

    return true;
  }
}