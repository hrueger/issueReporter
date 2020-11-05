import { Octokit } from "@octokit/rest";
import * as fs from "fs";
import * as path from "path";

export function getGlobalConfigs() {
    const language = process.env.LANGUAGE?.trim() || "en";
    return {
        appName: process.env.APP_NAME || "IssueReporter",
        repository: process.env.REPOSITORY?.trim(),
        assetsRepository: process.env.ASSETS_REPOSITORY?.trim(),
        assetsBranch: process.env.ASSETS_BRANCH?.trim() || "assets",
        token: process.env.TOKEN?.trim(),
        urlKey: process.env.URL_KEY?.trim() || "create",
        spamSecret: process.env.SECRET?.trim() || "IssueReporterSecret",
        language,
        i18n: JSON.parse(fs.readFileSync(path.join(__dirname, `./assets/i18n/${language}.json`)).toString()),
    };
}

export function getOctokit() {
    return new Octokit({
        auth: getGlobalConfigs().token,
        log: {
            debug: () => console.debug,
            info: () => console.info,
            warn: console.warn,
            error: console.error
        },
        
    });
}