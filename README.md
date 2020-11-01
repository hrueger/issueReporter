# IssueReporter
> A simple UI for people to report issues to GitHub Repositories without having a GitHub Account 

## Usage
```yaml
version: '3.3'
services:
    issueReporter:
        ports:
            - '3000:3000'
        restart: always
        image: 'hrueger/issueReporter:latest'
        environment:
            APP_NAME: My IssueReporter
            REPOSITORY: owner/repo
            TOKEN: GITHUB_ACCESS_TOKEN
            URL_KEY: someSecretKey
            SECRET: anotherSecret
```

You can then access the IssueReporter on `http://your-domain.tld:3000/someSecretKey`. A Reverse Proxy is recommended.

## License
MIT