import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Users, Clock, Search, Plus, MessageCircle, Coffee } from "lucide-react";
import { meetups, currentUser } from "@/data/dummy";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Meetups() {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const createMapRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("전체");
  const [joinedMeetups, setJoinedMeetups] = useState<string[]>(
    meetups.filter(m => m.participants.includes(currentUser.id)).map(m => m.id)
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [newMeetup, setNewMeetup] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    gameType: "전략",
    description: "",
    linkCafe: false,
    cafeId: ""
  });

  const gameTypes = ["전체", "전략", "파티", "RPG", "가족"];

  const filteredMeetups = meetups.filter(meetup => {
    const matchesSearch = meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meetup.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "전체" || meetup.gameType === filterType;
    return matchesSearch && matchesType;
  });

  useEffect(() => {
    if (mapRef.current && window.kakao && window.kakao.maps) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심
        level: 5
      };
      const map = new window.kakao.maps.Map(container, options);

      // 모임 위치에 마커 추가
      filteredMeetups.forEach((meetup) => {
        // 실제로는 meetup.location을 좌표로 변환해야 하지만, 
        // 데모를 위해 랜덤 위치에 마커 추가
        const lat = 37.5665 + (Math.random() - 0.5) * 0.1;
        const lng = 126.9780 + (Math.random() - 0.5) * 0.1;
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });

        // 마커에 정보창 추가
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${meetup.title}</div>`
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });
      });
    }
  }, [filteredMeetups]);

  // 모임 생성 지도 초기화
  useEffect(() => {
    if (isCreateModalOpen && createMapRef.current && window.kakao && window.kakao.maps) {
      const container = createMapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3
      };
      const map = new window.kakao.maps.Map(container, options);

      // 선택된 위치에 마커 표시
      if (selectedLocation) {
        const markerPosition = new window.kakao.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });
        map.setCenter(markerPosition);
      }
    }
  }, [isCreateModalOpen, selectedLocation]);

  // 주소 검색 함수
  const handleLocationSearch = () => {
    if (!locationSearch.trim() || !window.kakao) {
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(locationSearch, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 5)); // 상위 5개만 표시
      } else {
        toast.error("검색 결과가 없습니다.");
        setSearchResults([]);
      }
    });
  };

  // 검색 결과 선택
  const handleSelectLocation = (place: any) => {
    const location = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      address: place.place_name + " (" + place.address_name + ")"
    };
    setSelectedLocation(location);
    setNewMeetup({ ...newMeetup, location: location.address });
    setSearchResults([]);
    setLocationSearch("");
    toast.success("장소가 선택되었습니다!");
  };

  const handleJoin = (meetupId: string) => {
    if (joinedMeetups.includes(meetupId)) {
      setJoinedMeetups(prev => prev.filter(id => id !== meetupId));
    } else {
      setJoinedMeetups(prev => [...prev, meetupId]);
    }
  };

  const handleCreateMeetup = () => {
    if (!newMeetup.title.trim() || !newMeetup.location.trim()) {
      toast.error("제목과 장소를 입력해주세요.");
      return;
    }
    
    toast.success("모임이 생성되었습니다!");
    setIsCreateModalOpen(false);
    setNewMeetup({
      title: "",
      date: "",
      time: "",
      location: "",
      maxParticipants: "",
      gameType: "전략",
      description: "",
      linkCafe: false,
      cafeId: ""
    });
    setSelectedLocation(null);
    setSearchResults([]);
    setLocationSearch("");
  };

  const handleShareKakao = (meetupId: string) => {
    // 실제로는 카카오톡 SDK를 통해 공유
    toast.success("카카오톡으로 모임이 공유되었습니다!");
    console.log("Sharing to KakaoTalk:", meetupId);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">모임 찾기</h1>
          <p className="text-muted-foreground text-lg">다음 보드게임 모험을 찾아보세요</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="모임이나 장소 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {gameTypes.map(type => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Kakao Map */}
        <Card className="mb-8 overflow-hidden">
          <div ref={mapRef} className="w-full h-64"></div>
        </Card>

        {/* Meetups Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredMeetups.map(meetup => {
            const isJoined = joinedMeetups.includes(meetup.id);
            const isFull = meetup.currentParticipants >= meetup.maxParticipants;

            return (
              <Card key={meetup.id} className="overflow-hidden hover:shadow-card transition-smooth border-2">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={meetup.imageUrl}
                    alt={meetup.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm">
                    {meetup.gameType}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{meetup.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {meetup.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(meetup.date).toLocaleDateString()} {meetup.time}</span>
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
                      <span>주최자: {meetup.hostName}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className={cn("flex-1", isJoined && "bg-secondary hover:bg-secondary/90")}
                      onClick={() => handleJoin(meetup.id)}
                      disabled={!isJoined && isFull}
                    >
                      {isJoined ? "나가기" : isFull ? "마감" : "참여하기"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleShareKakao(meetup.id)}
                      title="카카오톡으로 공유"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredMeetups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">모임을 찾을 수 없습니다</p>
            <p className="text-muted-foreground">검색어나 필터를 조정해보세요</p>
          </div>
        )}
      </div>

      {/* Floating Create Button */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogTrigger asChild>
          <Button 
            size="lg" 
            className="fixed bottom-24 md:bottom-8 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all z-50"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">새 모임 만들기</DialogTitle>
            <DialogDescription>
              보드게임 모임을 만들기 위한 세부 정보를 입력하세요
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                value={newMeetup.title}
                onChange={(e) => setNewMeetup({ ...newMeetup, title: e.target.value })}
                placeholder="예: 카탄 토너먼트의 밤"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">날짜</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeetup.date}
                  onChange={(e) => setNewMeetup({ ...newMeetup, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time">시간</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMeetup.time}
                  onChange={(e) => setNewMeetup({ ...newMeetup, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label>장소 검색</Label>
              <div className="flex gap-2">
                <Input
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                  placeholder="카페 이름이나 주소를 검색하세요"
                />
                <Button type="button" onClick={handleLocationSearch} variant="secondary">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <Card className="max-h-48 overflow-y-auto">
                  <div className="divide-y">
                    {searchResults.map((place, idx) => (
                      <div
                        key={idx}
                        className="p-3 hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => handleSelectLocation(place)}
                      >
                        <p className="font-semibold text-sm">{place.place_name}</p>
                        <p className="text-xs text-muted-foreground">{place.address_name}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              <div>
                <Label htmlFor="location">선택된 장소</Label>
                <Input
                  id="location"
                  value={newMeetup.location}
                  onChange={(e) => setNewMeetup({ ...newMeetup, location: e.target.value })}
                  placeholder="위에서 검색하거나 직접 입력하세요"
                />
              </div>

              {selectedLocation && (
                <div ref={createMapRef} className="w-full h-48 rounded-lg overflow-hidden border"></div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxParticipants">최대 참가자 수</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={newMeetup.maxParticipants}
                  onChange={(e) => setNewMeetup({ ...newMeetup, maxParticipants: e.target.value })}
                  placeholder="예: 12"
                />
              </div>
              <div>
                <Label htmlFor="gameType">게임 유형</Label>
                <select
                  id="gameType"
                  value={newMeetup.gameType}
                  onChange={(e) => setNewMeetup({ ...newMeetup, gameType: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="전략">전략</option>
                  <option value="파티">파티</option>
                  <option value="RPG">RPG</option>
                  <option value="가족">가족</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">설명</Label>
              <Textarea
                id="description"
                value={newMeetup.description}
                onChange={(e) => setNewMeetup({ ...newMeetup, description: e.target.value })}
                placeholder="모임에 대해 설명해주세요..."
                rows={4}
              />
            </div>
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <input
                type="checkbox"
                id="linkCafe"
                checked={newMeetup.linkCafe}
                onChange={(e) => setNewMeetup({ ...newMeetup, linkCafe: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="linkCafe" className="cursor-pointer">
                제휴 카페와 연동하기
              </Label>
            </div>
            {newMeetup.linkCafe && (
              <div>
                <Label>카페 선택</Label>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate("/cafes")}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  카페 찾아보기
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  * 카페를 선택하면 자동으로 예약이 연동됩니다
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              취소
            </Button>
            <Button onClick={handleCreateMeetup}>
              모임 만들기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
