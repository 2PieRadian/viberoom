export function extractYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    // youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}
