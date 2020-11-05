import { getGlobalConfigs, getOctokit } from "../globalConfigs";

const octokit = getOctokit();

async function viewIssues(request, response) {
    const globals = getGlobalConfigs();
    const issues = (await octokit.issues.listForRepo({
        owner: globals.repository.split("/")[0],
        repo: globals.repository.split("/")[1],
    })).data;
    console.log(issues);
    response.render('viewIssues',
        {
            ...globals,
            issues,
        }
    );
}

export default viewIssues;