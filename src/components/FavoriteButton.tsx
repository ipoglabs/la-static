"use client";

import { useState } from "react";

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      className="size-8 flex items-center justify-center bg-slate-50 hover:bg-slate-200 -mr-2"
      onClick={(e) => {
        e.preventDefault(); // prevent Link navigation
        setLiked(!liked);
      }}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}