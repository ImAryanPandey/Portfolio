/* global process */
const GITHUB_USERNAME = "ImAryanPandey";
// Ensure this is reading from your .env file
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getProjects = async (req, res) => {
    // Debug Log 1: Check if token exists
    if (!GITHUB_TOKEN) {
        console.error("!!! ERROR: GITHUB_TOKEN is missing. Check .env file.");
        return res.status(500).json({ success: false, message: "Server Config Error" });
    }

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
        console.log(`> 1. Requesting data for user: ${GITHUB_USERNAME}...`);

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`
            },
            body: JSON.stringify({ query })
        });

        // Debug Log 2: API Status
        console.log(`> 2. GitHub API Status: ${response.status} ${response.statusText}`);

        const json = await response.json();

        // Debug Log 3: Check for GraphQL specific errors
        if (json.errors) {
            console.error("!!! GITHUB GRAPHQL ERROR !!!");
            console.error(JSON.stringify(json.errors, null, 2));
            throw new Error("GitHub API rejected the request");
        }

        console.log("> 3. Data received successfully.");

        // Format Function
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
                updated: new Date(repo.pushedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })
            },
            tech: repo.repositoryTopics.nodes.map(n => n.topic.name)
        });

        const featured = json.data.user.pinnedItems.nodes.map(formatRepo);
        const latest = json.data.user.repositories.nodes.map(formatRepo);

        console.log(`> 4. Sending ${featured.length} Featured and ${latest.length} Latest projects to frontend.`);

        res.status(200).json({
            success: true,
            data: { featured, latest }
        });

    } catch (error) {
        console.error("!!! BACKEND CRASH !!!", error.message);
        res.status(500).json({ success: false, message: "Sync Failed" });
    }
};

// Helper
function formatTitle(str) {
    return str.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, s => s.toUpperCase());
}