import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Send, Image as ImageIcon } from "lucide-react";
import { posts, currentUser } from "@/data/dummy";
import { Post } from "@/types";

export default function Community() {
  const [postList, setPostList] = useState<Post[]>(posts);
  const [newPostContent, setNewPostContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      setPostList(prev => prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setPostList(prev => prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: `p${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };

    setPostList([newPost, ...postList]);
    setNewPostContent("");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">커뮤니티 피드</h1>
          <p className="text-muted-foreground text-lg">게임 나이트 경험을 공유하세요</p>
        </div>

        {/* Create Post */}
        <Card className="p-6 mb-8 border-2">
          <div className="flex gap-4">
            <Avatar className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full" />
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="보드게임 경험을 공유해보세요..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="min-h-24 mb-3 resize-none"
              />
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  사진 추가
                </Button>
                <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  게시
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {postList.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-card transition-smooth border-2">
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20">
                  <img src={post.userAvatar} alt={post.userName} className="w-full h-full" />
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{post.userName}</h4>
                  <p className="text-sm text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="mb-4 text-foreground leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt="Post content"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={likedPosts.includes(post.id) ? "text-destructive" : ""}
                >
                  <Heart
                    className="w-5 h-5 mr-2"
                    fill={likedPosts.includes(post.id) ? "currentColor" : "none"}
                  />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {post.comments}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {postList.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-2">아직 게시글이 없습니다</p>
            <p className="text-muted-foreground">게임 나이트 이야기를 처음으로 공유해보세요!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
