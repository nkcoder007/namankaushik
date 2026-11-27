export type PersonalityInterest = {
  /** Stable slug, used as the React key and the description panel's id. */
  id: string;
  /** The interest itself, set as type. */
  label: string;
  /** One or two sentences, shown when the interest is hovered, focused or tapped. */
  description: string;
};

/**
 * The composition reads top to bottom in this order, so the sequence is fixed
 * here rather than in the component. The six labels are set at different
 * scales: editing the copy must not break the rhythm, so keep each one short.
 *
 * Every description is first person and about the same length: a plain
 * statement about the interest, then one concrete detail (a list of favorites,
 * a tool, a book). Keep that shape when editing so the panel never jumps in
 * length and the six readings sound like one voice.
 */
export const personality = {
  interests: [
    {
      id: "gaming",
      label: "Gaming",
      description:
        "I play a lot of different games to unwind — a better use of free time than doom-scrolling. Some favorites are Minecraft, Fortnite, Roblox and Spider-Man Remastered.",
    },
    {
      id: "anime",
      label: "Anime",
      description:
        "Anime is another great pastime (and no, it is not a cartoon). My favorites are One Piece, JoJo's Bizarre Adventure, Attack on Titan and Jujutsu Kaisen, though that list keeps growing.",
    },
    {
      id: "reading",
      label: "Reading",
      description:
        "I read fiction and non-fiction alike, as long as the book holds my attention. Atomic Habits and Land of Stories are the two that stood out.",
    },
    {
      id: "video-editing",
      label: "Video Editing",
      description:
        "Video editing is one of the few creative skills where I can spend hours perfecting a single video. DaVinci Resolve is my main tool.",
    },
    {
      id: "strength-training",
      label: "Strength Training",
      description:
        "Keeping one consistent habit has improved my discipline and mood. 'I enjoy taking care of my health' is what I would have said in an interview. My true goal is to be buff like The Rock.",
    },
    {
      id: "cooking",
      label: "Cooking",
      description:
        "Cooking is how I switch off from everything else going on. Food is comfort.",
    },
  ],
} as const;
