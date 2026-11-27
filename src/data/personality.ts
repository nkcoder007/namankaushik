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
 */
export const personality = {
  
  interests: [
    {
      id: "gaming",
      label: "Gaming",
      description:
        "I enjoy playing various kinds of games in my free time to relax as a great substitute for doom-scrolling. Some of my favorites include Minecraft, Fortnite, Roblox, Spider-Man Remastered, etc.",
    },
    {
      id: "anime",
      label: "Anime",
      description:
        "Another great passtime (Anime is NOT a cartoon). My favorites include One Piece, Jojo's Bizarre Adventure, Attack on Titan, Jujutsu Kaisen, and more. ",
    },
    {
      id: "reading",
      label: "Reading",
      description:
        "Whether it is fiction or non-fiction, I enjoy reading books as long as they interest me. The ones that stood out to me are Atomic Habits and Land of Stories.",
    },
    {
      id: "video-editing",
      label: "Video Editing",
      description:
        "This is one of the few creative skills I can spend hours perfecting a single video. My primary tool is Davinci Resolve.",
    },
    {
      id: "strength-training",
      label: "Strength Training",
      description:
        "One consistent habit improves discipline and mood. 'I enjoy taking care of my health' is what I would have said in an interview. My true goal is to be buff like The Rock.",
    },
    {
      id: "cooking",
      label: "Cooking",
      description:
        "Cooking is amazing as it allows me to get my mind off of the chaotic world around. Food is comfort.",
    },
  ],
} as const;
