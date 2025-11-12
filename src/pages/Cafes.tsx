import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Star, Users, Clock, Search, Phone, Wifi, CreditCard } from "lucide-react";
import { Cafe } from "@/types";
import { useNavigate } from "react-router-dom";
import cafeGangnam from "@/assets/cafe-gangnam.jpg";
import cafeHongdae from "@/assets/cafe-hongdae.jpg";
import cafeLounge from "@/assets/cafe-lounge.jpg";

const dummyCafes: Cafe[] = [
  {
    id: "cafe1",
    name: "보드게임 천국",
    address: "서울시 강남구 테헤란로 123",
    region: "서울",
    district: "강남구",
    openingHours: "12:00 - 23:00",
    availableGames: ["카탄", "스플렌더", "다빈치코드", "루미큐브", "할리갈리"],
    imageUrl: cafeGangnam,
    rating: 4.8,
    pricePerHour: 8000,
    totalTables: 12,
    availableTables: 5,
    phone: "02-1234-5678",
    isPartner: true,
    features: ["무료 와이파이", "음료 무제한", "주차 가능", "카드 결제"]
  },
  {
    id: "cafe2",
    name: "게임스팟 홍대",
    address: "서울시 마포구 홍익로 45",
    region: "서울",
    district: "마포구",
    openingHours: "13:00 - 24:00",
    availableGames: ["젠가", "디셉션", "레지스탕스", "아발론", "뱅"],
    imageUrl: cafeHongdae,
    rating: 4.6,
    pricePerHour: 10000,
    totalTables: 8,
    availableTables: 2,
    phone: "02-2345-6789",
    isPartner: true,
    features: ["무료 와이파이", "술 판매", "카드 결제", "단체 예약"]
  },
  {
    id: "cafe3",
    name: "보드게임 라운지",
    address: "서울시 송파구 올림픽로 234",
    region: "서울",
    district: "송파구",
    openingHours: "11:00 - 22:00",
    availableGames: ["윙스팬", "아그리콜라", "푸에르토리코", "테라포밍 마스", "7 Wonders"],
    imageUrl: cafeLounge,
    rating: 4.9,
    pricePerHour: 7000,
    totalTables: 15,
    availableTables: 8,
    phone: "02-3456-7890",
    isPartner: false,
    features: ["무료 와이파이", "음료 제공", "주차 가능"]
  }
];

export default function Cafes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const navigate = useNavigate();

  const regions = ["전체", "서울", "경기", "인천", "부산", "대구"];

  const filteredCafes = dummyCafes.filter(cafe => {
    const matchesSearch = cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cafe.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === "전체" || cafe.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">제휴 카페</h1>
          <p className="text-muted-foreground text-lg">보드게임을 즐길 수 있는 카페를 찾아보세요</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="카페 이름 또는 위치로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {regions.map(region => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
                className="rounded-full"
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        {/* Cafes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.map(cafe => {
            const availabilityPercent = (cafe.availableTables / cafe.totalTables) * 100;
            const availabilityColor = availabilityPercent > 50 ? "text-green-500" : 
                                     availabilityPercent > 20 ? "text-yellow-500" : "text-red-500";

            return (
              <Card 
                key={cafe.id} 
                className="overflow-hidden hover:shadow-card transition-smooth border-2 cursor-pointer"
                onClick={() => navigate(`/cafes/${cafe.id}`)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cafe.imageUrl}
                    alt={cafe.name}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                    }}
                    className="w-full h-full object-cover"
                  />
                  {cafe.isPartner && (
                    <Badge className="absolute top-4 right-4 bg-primary">
                      제휴 카페
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold">{cafe.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{cafe.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="line-clamp-1">{cafe.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{cafe.openingHours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{cafe.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className={`w-4 h-4 ${availabilityColor}`} />
                      <span className={availabilityColor}>
                        {cafe.availableTables}/{cafe.totalTables} 테이블 이용 가능
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {cafe.features.slice(0, 3).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">시간당</p>
                      <p className="text-lg font-bold text-primary">
                        {cafe.pricePerHour.toLocaleString()}원
                      </p>
                    </div>
                    <Button onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cafes/${cafe.id}`);
                    }}>
                      예약하기
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCafes.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">검색 결과가 없습니다</p>
            <p className="text-muted-foreground">다른 검색어를 시도해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
