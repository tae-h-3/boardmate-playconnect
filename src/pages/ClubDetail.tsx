import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Calendar, 
  Send, 
  ArrowLeft,
  Plus,
  MapPin,
  Clock
} from "lucide-react";
import { clubs, clubMessages, currentUser, meetups } from "@/data/dummy";

export default function ClubDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const club = clubs.find(c => c.id === id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(clubMessages.filter(m => m.clubId === id));
  
  const clubMeetups = meetups.filter(m => 
    club?.members.some(memberId => m.participants.includes(memberId))
  ).slice(0, 3);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-muted-foreground">동아리를 찾을 수 없습니다</p>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: `cm${messages.length + 1}`,
        clubId: club.id,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/clubs")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        {/* Club Header */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <img
              src={club.imageUrl}
              alt={club.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold mb-2 text-white">{club.name}</h1>
              <p className="text-lg text-white/90">{club.description}</p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">멤버 {club.memberCount}명</span>
              </div>
              <div className="flex gap-2">
                {club.gameTypes.map(type => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              관리자: {club.adminName}
            </p>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">채팅</TabsTrigger>
            <TabsTrigger value="meetups">모임</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-6">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">동아리 채팅방</h3>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => {
                    const isCurrentUser = msg.userId === currentUser.id;
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={msg.userAvatar} />
                          <AvatarFallback>{msg.userName[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div className={`flex-1 ${isCurrentUser ? "text-right" : ""}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              {msg.userName}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              isCurrentUser
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="meetups" className="mt-6">
            <div className="mb-6">
              <Button className="w-full md:w-auto">
                <Plus className="w-5 h-5 mr-2" />
                동아리 모임 만들기
              </Button>
            </div>

            <div className="grid gap-6">
              {clubMeetups.map((meetup) => (
                <Card key={meetup.id} className="overflow-hidden hover:shadow-card transition-smooth border-2">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-64 overflow-hidden">
                      <img
                        src={meetup.imageUrl}
                        alt={meetup.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary">
                        동아리 전용
                      </Badge>
                    </div>

                    <div className="p-6 flex-1">
                      <h3 className="text-2xl font-bold mb-2">{meetup.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {meetup.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{new Date(meetup.date).toLocaleDateString('ko-KR')} {meetup.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{meetup.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{meetup.currentParticipants}/{meetup.maxParticipants} 참가자</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>호스트: {meetup.hostName}</span>
                        </div>
                      </div>

                      <Button className="w-full md:w-auto">
                        참가하기
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {clubMeetups.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-2xl text-muted-foreground mb-4">
                    예정된 모임이 없습니다
                  </p>
                  <p className="text-muted-foreground">
                    첫 번째 동아리 모임을 만들어보세요!
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
