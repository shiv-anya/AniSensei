// fetchAniList.js
export async function fetchAniList({ query, variables = {} }) {
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (!res.ok || json.errors) {
    throw new Error("AniList API request failed");
  }

  return json.data || [];
}
