export function getGlobalConfigs() {
    return {
        appName: process.env.APP_NAME || "IssueReporter",
        repository: process.env.REPOSITORY,
        token: process.env.TOKEN,
        urlKey: process.env.URL_KEY || "create",
        spamSecret: process.env.SECRET || "IssueReporterSecret",
    }
}