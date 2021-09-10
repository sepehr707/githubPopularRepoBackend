
const githubRepo = "https://api.github.com/search/repositories"


exports.mapGithubRepoData = (val) => {
    return {
        id: val.id,
        name: val.name,
        git_url: val.git_url,
        owner : {
            id: val.owner.id,
            login: val.owner.login,
            avatar_url: val.owner.avatar_url,
        },
        created_at: val.created_at,
        updated_at: val.updated_at,
        pushed_at: val.pushed_at,
        stargazers_count: val.stargazers_count,
        language: val.language,
    }
}

exports.getGithubTopRepoUrl = (date, language, page) => {
    return githubRepo + `?q=created:>${date}${language ? ` language:${language}` : ''}&sort=stars&order=desc${page ? `&per_page=${page}` : ''}`
}