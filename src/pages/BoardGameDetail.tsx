import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Star, Users, Clock, Download, Play, Trophy, Award, MessageSquare, ThumbsUp } from "lucide-react";
import { BoardGame, Review } from "@/types";

const dummyGame: BoardGame = {
  id: "1",
  name: "코드네임",
  category: ["추리", "파티", "협력"],
  description: "두 팀으로 나뉘어 스파이마스터의 단서를 듣고 자신의 팀 코드네임을 먼저 찾는 게임입니다. 간단한 규칙으로 누구나 쉽게 즐길 수 있으며, 매번 다른 전략과 재미를 선사합니다.",
  imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
  videoUrl: "https://www.youtube.com/embed/example",
  rating: 4.5,
  reviewCount: 128,
  minPlayers: 2,
  maxPlayers: 8,
  playTime: "15-30분",
  age: "14세 이상",
  difficulty: "쉬움",
  rulesDownloadUrl: "/rules/codenames.pdf",
  relatedEvents: ["1", "2"],
};

const dummyReviews: Review[] = [
  {
    id: "1",
    userId: "u1",
    userName: "보드게임마니아",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    gameId: "1",
    rating: 5,
    content: "정말 재미있는 게임입니다! 친구들과 함께하면 시간 가는 줄 모르고 즐길 수 있어요. 추천합니다!",
    timestamp: "2024-01-15T10:30:00",
    likes: 12,
  },
  {
    id: "2",
    userId: "u2",
    userName: "게임러버",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    gameId: "1",
    rating: 4,
    content: "가족과 함께 즐기기 좋은 게임입니다. 규칙이 간단해서 누구나 쉽게 배울 수 있어요.",
    timestamp: "2024-01-14T15:20:00",
    likes: 8,
  },
  {
    id: "3",
    userId: "u3",
    userName: "파티게임즈",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    gameId: "1",
    rating: 5,
    content: "파티 게임으로 최고! 8명까지 할 수 있어서 모임에서 자주 꺼내놓습니다.",
    timestamp: "2024-01-13T20:10:00",
    likes: 15,
  },
];

export default function BoardGameDetail() {
  const { id } = useParams();
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState("");

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "fill-primary text-primary" : "text-muted-foreground"
            } ${interactive ? "cursor-pointer hover:text-primary transition-colors" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20 bg-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl border-2 shadow-soft">
              <img src={dummyGame.imageUrl} alt={dummyGame.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-3">{dummyGame.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {renderStars(dummyGame.rating)}
                <span className="text-muted-foreground">
                  {dummyGame.rating.toFixed(1)} ({dummyGame.reviewCount} 리뷰)
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {dummyGame.category.map((cat) => (
                  <Badge key={cat} variant="secondary">{cat}</Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Game Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">인원</p>
                  <p className="font-semibold">{dummyGame.minPlayers}-{dummyGame.maxPlayers}명</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">플레이 시간</p>
                  <p className="font-semibold">{dummyGame.playTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">권장 연령</p>
                  <p className="font-semibold">{dummyGame.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">난이도</p>
                  <p className="font-semibold">{dummyGame.difficulty}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">게임 소개</h3>
              <p className="text-muted-foreground leading-relaxed">{dummyGame.description}</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {dummyGame.rulesDownloadUrl && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={dummyGame.rulesDownloadUrl} download>
                    <Download className="w-4 h-4 mr-2" />
                    규칙서 다운로드
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Video */}
        {dummyGame.videoUrl && (
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                게임 설명 영상
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  className="w-full h-full"
                  src={dummyGame.videoUrl}
                  title="게임 설명 영상"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm">자막: 한국어</Button>
                <Button variant="outline" size="sm">화질: 1080p</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related Events */}
        {dummyGame.relatedEvents.length > 0 && (
          <Card className="mb-8 border-2 bg-gradient-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                관련 대회 & 체험단
              </CardTitle>
              <CardDescription>이 게임과 관련된 이벤트를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">전국 보드게임 챔피언십 2024</p>
                    <p className="text-sm text-muted-foreground">대회 | 2024-02-15 ~ 2024-02-17</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm">자세히 보기</Button>
                  </Link>
                </div>
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">신작 전략게임 체험단 모집</p>
                    <p className="text-sm text-muted-foreground">체험단 | 2024-01-20 ~ 2024-01-27</p>
                  </div>
                  <Link to="/events">
                    <Button size="sm" variant="secondary">지원하기</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews & Ratings Tabs */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="reviews">리뷰</TabsTrigger>
            <TabsTrigger value="ratings">평점</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {/* Write Review */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>리뷰 작성</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">평점</p>
                  {renderStars(newReviewRating, true, setNewReviewRating)}
                </div>
                <div>
                  <Textarea
                    placeholder="이 게임에 대한 리뷰를 작성해주세요..."
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button className="w-full">리뷰 등록</Button>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {dummyReviews.map((review) => (
                <Card key={review.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <img src={review.userAvatar} alt={review.userName} />
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.userName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating)}
                            <span className="text-xs text-muted-foreground">
                              {new Date(review.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {review.likes}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>평점 분포</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = dummyReviews.filter((r) => r.rating === rating).length;
                  const percentage = (count / dummyReviews.length) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-20">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span className="font-medium">{rating}</span>
                      </div>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {count}개 ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
