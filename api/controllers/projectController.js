/* global process */

const GITHUB_USERNAME = "ImAryanPandey";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getProjects = async (req, res) => {
    const query = `
    {
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              id
              name
              description
              url
              homepageUrl
              pushedAt
              stargazerCount
              forkCount
              openGraphImageUrl
              usesCustomOpenGraphImage
              primaryLanguage {
                name
                color
              }
              repositoryTopics(first: 4) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
        repositories(first: 6, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            id
            name
            description
            url
            homepageUrl
            pushedAt
            stargazerCount
            forkCount
            openGraphImageUrl
            usesCustomOpenGraphImage
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 4) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
    `;

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GITHUB_TOKEN}`
            },
            body: JSON.stringify({ query })
        });

        const json = await response.json();

        if (json.errors) {
            throw new Error("GitHub API rejected the request");
        }

        const formatRepo = (repo) => ({
            id: repo.id,
            title: formatTitle(repo.name),
            description: repo.description || "System architecture in progress.",
            github: repo.url,
            demo: repo.homepageUrl || null,
            image: repo.usesCustomOpenGraphImage ? repo.openGraphImageUrl : null,
            stats: {
                stars: repo.stargazerCount,
                forks: repo.forkCount,
                lang: repo.primaryLanguage?.name || "Code",
                langColor: repo.primaryLanguage?.color || "#ffffff",
                updated: new Date(repo.pushedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                })
            },
            tech: repo.repositoryTopics.nodes.map(n => n.topic.name)
        });

        const featured = json.data.user.pinnedItems.nodes.map(formatRepo);
        const latest = json.data.user.repositories.nodes.map(formatRepo);

        res.status(200).json({
            success: true,
            data: { featured, latest }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Sync Failed"
        });
    }
};

function formatTitle(str) {
    return str
        .replace(/-/g, " ")
        .replace(/_/g, " ")
        .replace(/\b\w/g, s => s.toUpperCase());
}
