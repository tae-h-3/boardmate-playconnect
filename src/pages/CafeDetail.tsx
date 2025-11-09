import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Phone, Clock, CreditCard, Wifi, Users, ArrowLeft, Calendar } from "lucide-react";
import { Cafe, TableStatus, CafeReservation } from "@/types";
import { toast } from "sonner";

const dummyCafe: Cafe = {
  id: "cafe1",
  name: "보드게임 천국",
  address: "서울시 강남구 테헤란로 123",
  region: "서울",
  district: "강남구",
  openingHours: "12:00 - 23:00",
  availableGames: ["카탄", "스플렌더", "다빈치코드", "루미큐브", "할리갈리", "윙스팬", "아그리콜라", "젠가"],
  imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
  rating: 4.8,
  pricePerHour: 8000,
  totalTables: 12,
  availableTables: 5,
  phone: "02-1234-5678",
  isPartner: true,
  features: ["무료 와이파이", "음료 무제한", "주차 가능", "카드 결제", "단체 예약", "게임 설명"]
};

const dummyTables: TableStatus[] = [
  { tableNumber: 1, capacity: 4, status: "사용가능" },
  { tableNumber: 2, capacity: 6, status: "사용중", currentUsage: { startTime: "14:00", estimatedEndTime: "16:00" } },
  { tableNumber: 3, capacity: 4, status: "사용가능" },
  { tableNumber: 4, capacity: 8, status: "예약됨" },
  { tableNumber: 5, capacity: 4, status: "사용가능" },
  { tableNumber: 6, capacity: 6, status: "사용중", currentUsage: { startTime: "15:00", estimatedEndTime: "17:00" } },
  { tableNumber: 7, capacity: 4, status: "사용가능" },
  { tableNumber: 8, capacity: 4, status: "사용가능" },
  { tableNumber: 9, capacity: 8, status: "예약됨" },
  { tableNumber: 10, capacity: 6, status: "사용중", currentUsage: { startTime: "13:30", estimatedEndTime: "15:30" } },
  { tableNumber: 11, capacity: 4, status: "사용가능" },
  { tableNumber: 12, capacity: 10, status: "사용가능" },
];

export default function CafeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservation, setReservation] = useState({
    date: "",
    time: "",
    duration: "2",
    numberOfPeople: "4",
    specialRequests: ""
  });

  const handleReservation = () => {
    console.log("Creating reservation:", reservation);
    toast.success("예약이 접수되었습니다! 승인 대기 중입니다.");
    setIsReservationModalOpen(false);
    setReservation({
      date: "",
      time: "",
      duration: "2",
      numberOfPeople: "4",
      specialRequests: ""
    });
  };

  const getStatusColor = (status: TableStatus["status"]) => {
    switch (status) {
      case "사용가능": return "bg-green-500";
      case "사용중": return "bg-red-500";
      case "예약됨": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: TableStatus["status"]) => {
    switch (status) {
      case "사용가능": return "이용 가능";
      case "사용중": return "사용 중";
      case "예약됨": return "예약됨";
      default: return status;
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/cafes")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          카페 목록으로
        </Button>

        {/* Hero Image */}
        <Card className="overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={dummyCafe.imageUrl}
              alt={dummyCafe.name}
              className="w-full h-full object-cover"
            />
            {dummyCafe.isPartner && (
              <Badge className="absolute top-4 right-4 bg-primary text-lg px-4 py-2">
                제휴 카페
              </Badge>
            )}
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Card */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{dummyCafe.name}</h1>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold">{dummyCafe.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{dummyCafe.address}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{dummyCafe.openingHours}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone className="w-5 h-5" />
                  <span>{dummyCafe.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="text-green-500 font-semibold">
                    {dummyCafe.availableTables}/{dummyCafe.totalTables} 테이블 이용 가능
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {dummyCafe.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="pt-6 border-t flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground mb-1">시간당 이용료</p>
                  <p className="text-3xl font-bold text-primary">
                    {dummyCafe.pricePerHour.toLocaleString()}원
                  </p>
                </div>
                <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-lg px-8">
                      <Calendar className="w-5 h-5 mr-2" />
                      예약하기
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">카페 예약</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="date">방문 날짜</Label>
                        <Input
                          id="date"
                          type="date"
                          value={reservation.date}
                          onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">방문 시간</Label>
                        <Input
                          id="time"
                          type="time"
                          value={reservation.time}
                          onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration">이용 시간 (시간)</Label>
                          <Input
                            id="duration"
                            type="number"
                            min="1"
                            value={reservation.duration}
                            onChange={(e) => setReservation({ ...reservation, duration: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="people">인원</Label>
                          <Input
                            id="people"
                            type="number"
                            min="1"
                            value={reservation.numberOfPeople}
                            onChange={(e) => setReservation({ ...reservation, numberOfPeople: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="requests">특별 요청사항</Label>
                        <Textarea
                          id="requests"
                          value={reservation.specialRequests}
                          onChange={(e) => setReservation({ ...reservation, specialRequests: e.target.value })}
                          placeholder="예: 조용한 테이블 희망, 게임 준비 요청 등"
                          rows={3}
                        />
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between mb-2">
                          <span className="text-muted-foreground">예상 금액</span>
                          <span className="font-semibold">
                            {(dummyCafe.pricePerHour * parseInt(reservation.duration || "2")).toLocaleString()}원
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          * 최종 금액은 실제 이용 시간에 따라 달라질 수 있습니다
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={() => setIsReservationModalOpen(false)}>
                        취소
                      </Button>
                      <Button onClick={handleReservation}>
                        예약 신청
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="tables" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="tables" className="flex-1">실시간 테이블 현황</TabsTrigger>
                <TabsTrigger value="games" className="flex-1">보유 게임</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tables">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">실시간 테이블 이용 현황</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {dummyTables.map((table) => (
                      <Card 
                        key={table.tableNumber}
                        className={`p-4 ${table.status === "사용가능" ? "border-green-500" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">테이블 {table.tableNumber}</span>
                          <Badge className={getStatusColor(table.status)}>
                            {getStatusText(table.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          최대 {table.capacity}인
                        </p>
                        {table.currentUsage && (
                          <div className="text-xs text-muted-foreground">
                            <p>{table.currentUsage.startTime} ~ {table.currentUsage.estimatedEndTime} (예상)</p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * 실시간 현황이므로 변동될 수 있습니다
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="games">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">보유 게임 목록</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {dummyCafe.availableGames.map((game, idx) => (
                      <Badge key={idx} variant="outline" className="py-2 justify-center">
                        {game}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * 게임 목록은 수시로 업데이트됩니다
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                결제 방법
              </h3>
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-center py-2">
                  KakaoPay
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2">
                  TossPay
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2">
                  카드 결제
                </Badge>
                <Badge variant="secondary" className="w-full justify-center py-2">
                  현금
                </Badge>
              </div>
            </Card>

            {/* Map Preview */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">위치</h3>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 text-primary opacity-50" />
                  <p className="text-sm text-muted-foreground">지도 미리보기</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                길찾기
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
