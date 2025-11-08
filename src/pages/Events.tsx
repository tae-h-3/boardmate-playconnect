import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, MapPin, Users, Trophy, Award, Search, Filter, MessageSquare } from "lucide-react";
import { Event } from "@/types";

const dummyEvents: Event[] = [
  {
    id: "1",
    type: "대회",
    title: "전국 보드게임 챔피언십 2024",
    description: "최고의 보드게임 플레이어를 가리는 전국 규모의 대회입니다. 다양한 종목에서 실력을 겨루고 푸짐한 상금을 받아가세요!",
    imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500",
    region: "서울",
    startDate: "2024-02-15",
    endDate: "2024-02-17",
    prize: "1등 100만원, 2등 50만원, 3등 30만원",
    maxParticipants: 100,
    currentParticipants: 67,
    status: "모집중",
    organizerId: "org1",
    organizerName: "한국보드게임협회",
    participants: [],
  },
  {
    id: "2",
    type: "체험단",
    title: "신작 전략게임 체험단 모집",
    description: "출시 예정인 신작 전략 보드게임을 미리 체험하고 리뷰를 남겨주실 분들을 모집합니다.",
    imageUrl: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=500",
    region: "경기",
    startDate: "2024-01-20",
    endDate: "2024-01-27",
    maxParticipants: 20,
    currentParticipants: 15,
    status: "모집중",
    organizerId: "org2",
    organizerName: "보드게임 스튜디오",
    participants: [],
  },
  {
    id: "3",
    type: "대회",
    title: "부산 지역 보드게임 토너먼트",
    description: "부산 지역 보드게임 동호회들이 함께하는 대규모 토너먼트입니다.",
    imageUrl: "https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500",
    region: "부산",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    prize: "1등 50만원",
    maxParticipants: 50,
    currentParticipants: 50,
    status: "마감",
    organizerId: "org3",
    organizerName: "부산보드게임연합",
    participants: [],
  },
  {
    id: "4",
    type: "체험단",
    title: "가족용 보드게임 체험단",
    description: "온 가족이 함께 즐길 수 있는 보드게임 체험단을 모집합니다.",
    imageUrl: "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=500",
    region: "인천",
    startDate: "2024-02-01",
    endDate: "2024-02-07",
    maxParticipants: 15,
    currentParticipants: 8,
    status: "모집중",
    organizerId: "org4",
    organizerName: "패밀리게임즈",
    participants: [],
  },
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filterEvents = (events: Event[], type: "대회" | "체험단") => {
    return events.filter(event => {
      const matchesType = event.type === type;
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter === "all" || event.region === regionFilter;
      const matchesStatus = statusFilter === "all" || event.status === statusFilter;
      return matchesType && matchesSearch && matchesRegion && matchesStatus;
    });
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="hover:shadow-card transition-smooth border-2 cursor-pointer" onClick={() => setSelectedEvent(event)}>
      <div className="aspect-video overflow-hidden rounded-t-lg">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={event.type === "대회" ? "default" : "secondary"}>
            {event.type}
          </Badge>
          <Badge variant={event.status === "모집중" ? "outline" : "secondary"}>
            {event.status}
          </Badge>
        </div>
        <CardTitle className="text-xl">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.region}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{event.startDate} ~ {event.endDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{event.currentParticipants} / {event.maxParticipants}명</span>
          </div>
          {event.prize && (
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary">{event.prize.split(',')[0]}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">이벤트 & 체험단</h1>
          <p className="text-muted-foreground">다양한 대회와 체험단에 참여해보세요</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-2">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 지역</SelectItem>
                <SelectItem value="서울">서울</SelectItem>
                <SelectItem value="경기">경기</SelectItem>
                <SelectItem value="인천">인천</SelectItem>
                <SelectItem value="부산">부산</SelectItem>
                <SelectItem value="대구">대구</SelectItem>
                <SelectItem value="광주">광주</SelectItem>
                <SelectItem value="대전">대전</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="모집중">모집중</SelectItem>
                <SelectItem value="마감">마감</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="contest" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="contest" className="gap-2">
              <Trophy className="w-4 h-4" />
              대회 공고
            </TabsTrigger>
            <TabsTrigger value="tester" className="gap-2">
              <Award className="w-4 h-4" />
              체험단 모집
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contest" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(dummyEvents, "대회").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tester" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterEvents(dummyEvents, "체험단").map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Event Detail Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={selectedEvent.type === "대회" ? "default" : "secondary"}>
                      {selectedEvent.type}
                    </Badge>
                    <Badge variant={selectedEvent.status === "모집중" ? "outline" : "secondary"}>
                      {selectedEvent.status}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                  <DialogDescription>주최: {selectedEvent.organizerName}</DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Image */}
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img src={selectedEvent.imageUrl} alt={selectedEvent.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">지역</p>
                        <p className="font-semibold">{selectedEvent.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">기간</p>
                        <p className="font-semibold">{selectedEvent.startDate} ~ {selectedEvent.endDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">모집 인원</p>
                        <p className="font-semibold">{selectedEvent.currentParticipants} / {selectedEvent.maxParticipants}명</p>
                      </div>
                    </div>
                    {selectedEvent.prize && (
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">상금</p>
                          <p className="font-semibold text-primary">{selectedEvent.prize}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">상세 설명</h3>
                    <p className="text-muted-foreground">{selectedEvent.description}</p>
                  </div>

                  <Separator />

                  {/* Participants */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">신청자 목록</h3>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground text-center">
                        {selectedEvent.currentParticipants}명이 신청했습니다
                      </p>
                    </div>
                  </div>

                  {/* Q&A Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Q&A
                    </h3>
                    <div className="border rounded-lg p-4 space-y-4">
                      <p className="text-sm text-muted-foreground text-center">아직 질문이 없습니다.</p>
                      <Button variant="outline" className="w-full">
                        질문하기
                      </Button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    size="lg" 
                    className="w-full" 
                    disabled={selectedEvent.status === "마감"}
                  >
                    {selectedEvent.status === "모집중" ? "신청하기" : "모집 마감"}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
