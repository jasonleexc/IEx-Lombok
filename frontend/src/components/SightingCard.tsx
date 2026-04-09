import { Heart, MessageCircle, MapPin, Calendar, Share2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SightingCardProps {
  author: string;
  avatar: string;
  image: string;
  species: string;
  location: string;
  date: string;
  description: string;
  likes: number;
  comments: number;
  size?: string;
  behavior?: string;
}

const SightingCard = ({
  author, avatar, image, species, location, date,
  description, likes, comments, size, behavior,
}: SightingCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <article className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-sm text-card-foreground">{author}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
            <span>·</span>
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={image} alt={`${species} sighting`} className="w-full h-full object-cover" loading="lazy" />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
          {species}
        </Badge>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm text-card-foreground leading-relaxed">{description}</p>

        {(size || behavior) && (
          <div className="flex flex-wrap gap-2">
            {size && (
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                📏 {size}
              </span>
            )}
            {behavior && (
              <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                🐢 {behavior}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2 border-t border-border">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              liked ? "text-coral" : "text-muted-foreground hover:text-coral"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default SightingCard;
