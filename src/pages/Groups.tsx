import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Users, ExternalLink, Search } from "lucide-react";
import { Group } from "@/types";

// Dummy data
const groups: Group[] = [
  {
    id: "g1",
    name: "서울 보드게임 동호회",
    description: "주말마다 모여서 다양한 전략 게임을 즐기는 동호회입니다. 초보자부터 전문가까지 환영합니다!",
    imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    region: "서울",
    district: "강남구",
    memberCount: 45,
    type: "동호회",
    contactLink: "https://open.kakao.com/o/example1",
    tags: ["전략", "주말", "초보환영"],
  },
  {
    id: "g2",
    name: "연세대 보드게임 동아리",
    description: "연세대학교 학생들의 보드게임 동아리. 매주 화요일과 목요일에 정기 모임을 갖습니다.",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
    region: "서울",
    district: "서대문구",
    memberCount: 28,
    type: "동아리",
    contactLink: "https://open.kakao.com/o/example2",
    tags: ["대학생", "정기모임", "파티게임"],
  },
  {
    id: "g3",
    name: "부산 주말 게임 모임",
    description: "부산 지역 직장인들의 자율 모임. 가벼운 파티 게임부터 깊이 있는 전략 게임까지!",
    imageUrl: "https://images.unsplash.com/photo-1611891487688-249d1d3e0a4d?w=800&q=80",
    region: "부산",
    district: "해운대구",
    memberCount: 32,
    type: "자율모임",
    contactLink: "https://open.kakao.com/o/example3",
    tags: ["직장인", "주말", "전략"],
  },
  {
    id: "g4",
    name: "성균관대 협동게임 동아리",
    description: "협동 보드게임을 주로 즐기는 동아리입니다. 팬데믹, 스피릿 아일랜드 등을 플레이합니다.",
    imageUrl: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80",
    region: "서울",
    district: "종로구",
    memberCount: 22,
    type: "동아리",
    contactLink: "https://open.kakao.com/o/example4",
    tags: ["협동", "대학생", "전략"],
  },
  {
    id: "g5",
    name: "인천 패밀리 게임 동호회",
    description: "가족 단위로 참여 가능한 보드게임 동호회. 아이들과 함께 즐길 수 있는 게임 위주입니다.",
    imageUrl: "https://images.unsplash.com/photo-1606503153255-59d7e12aa0ba?w=800&q=80",
    region: "인천",
    district: "남동구",
    memberCount: 38,
    type: "동호회",
    contactLink: "https://open.kakao.com/o/example5",
    tags: ["가족", "초보환영", "파티게임"],
  },
];

const regions = ["전체", "서울", "부산", "인천", "대구", "대전", "광주"];
const types = ["전체", "동호회", "동아리", "자율모임"];

export default function Groups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = 
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRegion = selectedRegion === "전체" || group.region === selectedRegion;
    const matchesType = selectedType === "전체" || group.type === selectedType;

    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">지역 동호회 찾기</h1>
          <p className="text-muted-foreground text-lg">
            내 지역의 보드게임 동호회, 동아리, 모임을 찾아보세요
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="동호회 이름, 태그로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="지역 선택" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="유형 선택" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="overflow-hidden hover:shadow-card transition-smooth border-2">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {group.type}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{group.name}</h3>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{group.region} {group.district}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span>멤버 {group.memberCount}명</span>
                </div>

                <p className="text-foreground/80 mb-4 line-clamp-3">
                  {group.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full"
                  onClick={() => window.open(group.contactLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  참여하기
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-2">검색 결과가 없습니다</p>
            <p className="text-muted-foreground">다른 조건으로 검색해보세요</p>
          </Card>
        )}
      </div>
    </div>
  );
}
