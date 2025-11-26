import fs from "fs";
import path from "path";
import { ProrationService } from "../src/services/proration/ProrationService";
import { AverageStrategy } from "../src/services/proration/strategies/AverageStrategy";

// Absolute path to /data directory located outside /backend
const dataDir = path.resolve(__dirname, "../../../data");

// Loads and parses a JSON file
const loadJSON = (filePath: string) => {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
};

// Read all files inside the data directory
const allFiles = fs.readdirSync(dataDir);

// Filter only input datasets ending with "_input.json"
const inputFiles = allFiles.filter((f) => f.endsWith("_input.json"));

describe("Dynamic proration test suite", () => {
    inputFiles.forEach((inputFile) => {
        // Extract base test name (e.g., "simple_1", "complex_2")
        const baseName = inputFile.replace("_input.json", "");

        // Determine expected output filename
        const outputFile = `${baseName}_output.json`;
        const outputPath = path.join(dataDir, outputFile);

        if (!fs.existsSync(outputPath)) {
            console.warn(`Missing output file for ${inputFile}`);
            return;
        }

        test(`Dataset "${baseName}" should match expected output`, () => {
            const input = loadJSON(path.join(dataDir, inputFile));
            const expected = loadJSON(outputPath);

            // Initialize proration service
            const service = new ProrationService(new AverageStrategy());

            // Run the algorithm using input data
            const result = service.run(
                input.allocation_amount,
                input.investor_amounts
            );

            // Compare the result with expected output
            expect(result).toEqual(expected);
        });
    });
});
