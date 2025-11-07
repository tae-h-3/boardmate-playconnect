import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Plus, 
  Heart, 
  MessageCircle, 
  Bold, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Image as ImageIcon,
  Type
} from "lucide-react";
import { CommunityPost, ChatMessage } from "@/types";
import { currentUser } from "@/data/dummy";

// Dummy data
const initialPosts: CommunityPost[] = [
  {
    id: "cp1",
    userId: "u1",
    userName: "김민지",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    type: "후기",
    title: "어제 보드게임 카페 다녀왔어요!",
    content: "친구들이랑 카탄 하다가 밤 12시까지 있었네요 ㅋㅋ 너무 재밌었어요!",
    likes: 12,
    comments: 3,
    timestamp: new Date().toISOString(),
  },
  {
    id: "cp2",
    userId: "u2",
    userName: "박준호",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    type: "질문",
    title: "초보자 추천 게임 있나요?",
    content: "보드게임 처음 접하는데 어떤 게임부터 시작하면 좋을까요?",
    likes: 8,
    comments: 15,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
];

const initialChatMessages: ChatMessage[] = [
  {
    id: "cm1",
    userId: "u1",
    userName: "이서연",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
    content: "안녕하세요! 오늘 날씨 정말 좋네요 😊",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: "cm2",
    userId: "u2",
    userName: "최민수",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
    content: "이번 주말에 모임 있는 분 계신가요?",
    timestamp: new Date(Date.now() - 180000).toISOString(),
  },
];

export default function EnhancedCommunity() {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [newPost, setNewPost] = useState({
    type: "잡담" as "정보" | "공유" | "질문" | "후기" | "잡담" | "기타",
    title: "",
    content: "",
  });

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Text formatting state
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      setPosts(prev => prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      ));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setPosts(prev => prev.map(post =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ));
    }
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: CommunityPost = {
      id: `cp${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      type: newPost.type,
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };

    setPosts([post, ...posts]);
    setIsCreateModalOpen(false);
    setNewPost({ type: "잡담", title: "", content: "" });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `cm${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage("");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
  };

  const postTypeColors = {
    "정보": "bg-primary text-primary-foreground",
    "공유": "bg-secondary text-secondary-foreground",
    "질문": "bg-accent text-accent-foreground",
    "후기": "bg-muted text-muted-foreground",
    "잡담": "bg-card-foreground/10 text-card-foreground",
    "기타": "bg-border text-foreground",
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Posts */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">커뮤니티</h1>
                <p className="text-muted-foreground text-lg">자유롭게 소통해요</p>
              </div>
              
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button size="lg">
                    <Plus className="w-5 h-5 mr-2" />
                    글쓰기
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>게시글 작성</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label>글 종류</Label>
                      <Select 
                        value={newPost.type} 
                        onValueChange={(value: any) => setNewPost({ ...newPost, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="정보">정보</SelectItem>
                          <SelectItem value="공유">공유</SelectItem>
                          <SelectItem value="질문">질문</SelectItem>
                          <SelectItem value="후기">후기</SelectItem>
                          <SelectItem value="잡담">잡담</SelectItem>
                          <SelectItem value="기타">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>제목</Label>
                      <Input
                        placeholder="제목을 입력하세요"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>본문</Label>
                      {/* Text Formatting Toolbar */}
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-t-lg border border-border">
                        <Button
                          size="sm"
                          variant={isBold ? "default" : "ghost"}
                          onClick={() => setIsBold(!isBold)}
                        >
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={isUnderline ? "default" : "ghost"}
                          onClick={() => setIsUnderline(!isUnderline)}
                        >
                          <Underline className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button
                          size="sm"
                          variant={textAlign === "left" ? "default" : "ghost"}
                          onClick={() => setTextAlign("left")}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={textAlign === "center" ? "default" : "ghost"}
                          onClick={() => setTextAlign("center")}
                        >
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={textAlign === "right" ? "default" : "ghost"}
                          onClick={() => setTextAlign("right")}
                        >
                          <AlignRight className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button size="sm" variant="ghost">
                          <Type className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea
                        placeholder="내용을 입력하세요"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="min-h-48 rounded-t-none"
                        style={{
                          fontWeight: isBold ? "bold" : "normal",
                          textDecoration: isUnderline ? "underline" : "none",
                          textAlign: textAlign,
                        }}
                      />
                    </div>

                    <Button 
                      onClick={handleCreatePost} 
                      className="w-full"
                      disabled={!newPost.title || !newPost.content}
                    >
                      작성 완료
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map(post => (
                <Card key={post.id} className="p-6 hover:shadow-card transition-smooth border-2">
                  {/* Post Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/20">
                      <img src={post.userAvatar} alt={post.userName} className="w-full h-full" />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{post.userName}</h4>
                        <Badge className={postTypeColors[post.type]}>
                          {post.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="mb-4 text-foreground leading-relaxed">{post.content}</p>

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

            {posts.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-2xl text-muted-foreground mb-2">아직 게시글이 없습니다</p>
                <p className="text-muted-foreground">첫 게시글을 작성해보세요!</p>
              </Card>
            )}
          </div>

          {/* Sidebar - Live Chat */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 overflow-hidden">
              <div className="p-4 bg-primary text-primary-foreground">
                <h3 className="text-lg font-bold">실시간 채팅</h3>
                <p className="text-sm opacity-90">지금 접속 중인 멤버들과 대화하세요</p>
              </div>
              
              <ScrollArea className="h-[500px] p-4" ref={chatScrollRef}>
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      <Avatar className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                        <img src={message.userAvatar} alt={message.userName} className="w-full h-full" />
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-sm">{message.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm bg-muted p-2 rounded-lg break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
