import * as fs from "fs";
import * as path from "path";

export function getGlobalConfigs() {
    const language = process.env.LANGUAGE?.trim() || "en";
    return {
        appName: process.env.APP_NAME || "IssueReporter",
        repository: process.env.REPOSITORY,
        token: process.env.TOKEN,
        urlKey: process.env.URL_KEY || "create",
        spamSecret: process.env.SECRET || "IssueReporterSecret",
        language,
        i18n: JSON.parse(fs.readFileSync(path.join(__dirname, `./assets/i18n/${language}.json`)).toString()),
    };
}