import { Octokit } from "@octokit/rest";
import { getGlobalConfigs, getOctokit } from "../globalConfigs";
import { v4 } from "uuid";
const octokit = getOctokit();

function getCreateIssueRoute(request, response) {
    response.render('createIssue',
        {
            ...getGlobalConfigs()
        }
    );
}

async function postCreateIssueRoute(request, response) {
    const globals = getGlobalConfigs();
    if (!(request.body.title && request.body.description && request.body.location && request.body.suggestion && typeof request.body.title == "string" && typeof request.body.description == "string" && typeof request.body.location == "string" && typeof request.body.suggestion == "string")) {
        response.render('createIssue',
            {
                ...globals,
                title: request.body.title,
                description: request.body.description,
                suggestion: request.body.suggestion,
                location: request.body.location,
                missingFields: true,
            }
        );
    } else if (!(typeof request.body.secret == "string" && request.body.secret == globals.spamSecret)) {
        response.render('createIssue',
            {
                ...globals,
                title: request.body.title,
                description: request.body.description,
                suggestion: request.body.suggestion,
                location: request.body.location,
                secretIncorrect: true,
            }
        );
    } else {
        // Submit issue
        if (globals.repository) {
            try {
                let body = `**Location:**\n${request.body.location}\n\n**Description:**\n${request.body.description}\n\n**Suggestion:**\n${request.body.suggestion}`;
                if (request.files?.screenshot) {
                    const filename = `${v4()}.${(request.files.screenshot.name as string).split(".").pop()}`;
                    await octokit.repos.createOrUpdateFileContents({
                        owner: globals.assetsRepository.split("/")[0],
                        repo: globals.assetsRepository.split("/")[1],
                        content: (request.files.screenshot.data as Buffer).toString("base64"),
                        message: `Added \`${filename}\``,
                        path: filename,
                        branch: globals.assetsBranch,
                    });
                    body += `\n\n**Attached Screenshot:**\n![${filename}](https://raw.githubusercontent.com/${globals.assetsRepository}/${globals.assetsBranch}/${filename})`;
                }
               const result = await octokit.issues.create({
                    owner: globals.repository.split("/")[0],
                    repo: globals.repository.split("/")[1],
                    title: request.body.title,
                    body,
                });
                response.render('createIssue',
                    {
                        ...getGlobalConfigs(),
                        issueUrl: result.data.html_url,
                        issueCreatedSuccessfully: true,
                    }
                );
            } catch (e) {
                error(e);
            }
        } else {
            error("Repository not set.");
        }
    }


    function error(e) {
        console.log(e);
        response.render('createIssue',
            {
                ...getGlobalConfigs(),
                title: request.body.title,
                description: request.body.description,
                suggestion: request.body.suggestion,
                location: request.body.location,
                unknownError: true,
            }
        );
    }
}

export {
    getCreateIssueRoute,
    postCreateIssueRoute,
};