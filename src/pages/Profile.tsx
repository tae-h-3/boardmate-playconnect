import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Calendar, Star, Settings, UserPlus, Users as UsersIcon, MessageCircle, X, Check } from "lucide-react";
import { currentUser } from "@/data/dummy";
import { Friend, FriendRequest } from "@/types";

export default function Profile() {
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  const dummyFriends: Friend[] = [
    { id: "1", name: "김보드", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", status: "온라인", mutualFriends: 5 },
    { id: "2", name: "이게임", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", status: "오프라인", mutualFriends: 3 },
    { id: "3", name: "박모임", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", status: "온라인", mutualFriends: 8 },
    { id: "4", name: "최플레이", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", status: "오프라인", mutualFriends: 2 },
  ];

  const dummyFriendRequests: FriendRequest[] = [
    { id: "1", fromUserId: "u1", fromUserName: "정전략", fromUserAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", timestamp: "2024-01-15T10:30:00" },
    { id: "2", fromUserId: "u2", fromUserName: "강협력", fromUserAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6", timestamp: "2024-01-14T15:20:00" },
  ];

  const achievements = [
    { id: 1, name: "First Meetup", icon: "🎲", earned: true },
    { id: 2, name: "10 Games Played", icon: "🎯", earned: true },
    { id: 3, name: "Social Butterfly", icon: "🦋", earned: true },
    { id: 4, name: "Tournament Winner", icon: "🏆", earned: false },
    { id: 5, name: "Regular Attendee", icon: "⭐", earned: true },
    { id: 6, name: "Community Leader", icon: "👑", earned: false },
  ];

  const stats = [
    { label: "Total Points", value: currentUser.points, icon: Trophy, color: "text-primary" },
    { label: "Meetups Attended", value: currentUser.attendanceCount, icon: Calendar, color: "text-secondary" },
    { label: "Favorite Games", value: currentUser.favoriteGames.length, icon: Star, color: "text-accent" },
  ];

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Profile Header */}
        <Card className="p-8 mb-8 border-2">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-soft">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full" />
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h1 className="text-4xl font-bold mb-2 md:mb-0">{currentUser.name}</h1>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFriendRequests(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    친구 요청 ({dummyFriendRequests.length})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    프로필 수정
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                가입일 {new Date(currentUser.memberSince).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {stats.map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        {/* Friend Requests Dialog */}
        <Dialog open={showFriendRequests} onOpenChange={setShowFriendRequests}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>친구 요청</DialogTitle>
              <DialogDescription>{dummyFriendRequests.length}개의 새로운 친구 요청이 있습니다</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {dummyFriendRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <img src={request.fromUserAvatar} alt={request.fromUserName} />
                    </Avatar>
                    <div>
                      <p className="font-semibold">{request.fromUserName}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(request.timestamp).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="default">
                      <Check className="w-4 h-4 mr-1" />
                      수락
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="w-4 h-4 mr-1" />
                      거절
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Friends Section */}
        <Card className="p-6 mb-8 border-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <UsersIcon className="w-6 h-6" />
              친구 목록
            </h2>
            <Badge variant="secondary">{dummyFriends.length}명</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dummyFriends.map((friend) => (
              <Card key={friend.id} className="p-4 text-center hover:shadow-card transition-smooth">
                <div className="relative inline-block mb-3">
                  <Avatar className="w-20 h-20">
                    <img src={friend.avatar} alt={friend.name} />
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${
                    friend.status === "온라인" ? "bg-green-500" : "bg-gray-400"
                  }`} />
                </div>
                <p className="font-semibold mb-1">{friend.name}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  공통 친구 {friend.mutualFriends}명
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    초대
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Favorite Games */}
        <Card className="p-6 mb-8 border-2">
          <h2 className="text-2xl font-bold mb-4">좋아하는 게임</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.favoriteGames.map(game => (
              <Badge key={game} variant="secondary" className="text-sm px-4 py-2">
                {game}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="rounded-full">
              + 게임 추가
            </Button>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 border-2">
          <h2 className="text-2xl font-bold mb-6">업적</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 text-center transition-smooth ${
                  achievement.earned
                    ? "border-primary/20 bg-primary/5 hover:border-primary/40"
                    : "border-border bg-muted/50 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-semibold text-sm">{achievement.name}</p>
                {achievement.earned && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    획득 완료
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Level Progress */}
        <Card className="p-6 mt-8 bg-gradient-primary text-white border-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">레벨 5 플레이어</h3>
            <span className="text-lg font-semibold">450 / 500 XP</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: '90%' }}
            />
          </div>
          <p className="text-sm mt-3 text-white/90">다음 레벨까지 50 XP!</p>
        </Card>
      </div>
    </div>
  );
}
