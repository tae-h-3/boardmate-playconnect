import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Eye, MessageCircle, MapPin } from "lucide-react";
import { MarketplaceItem } from "@/types";
import { currentUser } from "@/data/dummy";

// Dummy data
const marketplaceItems: MarketplaceItem[] = [
  {
    id: "mp1",
    userId: "u1",
    userName: "김민수",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    category: "판매",
    title: "카탄 확장판 (항해자) 판매합니다",
    gameName: "카탄: 항해자 확장",
    price: 35000,
    condition: "상태 좋음, 구성품 완전",
    region: "서울 강남구",
    description: "2회 정도 플레이했고, 구성품 모두 완벽합니다. 박스 상태도 깨끗해요!",
    imageUrl: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    timestamp: new Date().toISOString(),
    status: "활성",
    views: 45,
    comments: 3,
  },
  {
    id: "mp2",
    userId: "u2",
    userName: "박지은",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user2",
    category: "구매",
    title: "스플렌더 구매 원합니다",
    gameName: "스플렌더",
    price: 25000,
    region: "서울 서초구",
    description: "스플렌더 구매하고 싶습니다. 상태 양호한 제품 찾아요!",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: "활성",
    views: 23,
    comments: 1,
  },
  {
    id: "mp3",
    userId: "u3",
    userName: "이준호",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user3",
    category: "교환",
    title: "티켓 투 라이드 ↔ 윙스팬 교환",
    gameName: "티켓 투 라이드",
    region: "부산 해운대구",
    description: "티켓 투 라이드를 윙스팬과 교환하고 싶습니다. 둘 다 상태 양호합니다!",
    imageUrl: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    status: "활성",
    views: 67,
    comments: 5,
  },
  {
    id: "mp4",
    userId: "u4",
    userName: "최서연",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user4",
    category: "나눔",
    title: "코드네임즈 나눔합니다",
    gameName: "코드네임즈",
    region: "인천 남동구",
    description: "집에서 안 하게 되어 나눔합니다. 직거래만 가능합니다!",
    imageUrl: "https://images.unsplash.com/photo-1611891487688-249d1d3e0a4d?w=800&q=80",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    status: "활성",
    views: 89,
    comments: 12,
  },
];

const categories = ["전체", "판매", "구매", "교환", "나눔"];

const categoryColors = {
  "판매": "bg-primary text-primary-foreground",
  "구매": "bg-secondary text-secondary-foreground",
  "교환": "bg-accent text-accent-foreground",
  "나눔": "bg-destructive/80 text-destructive-foreground",
};

export default function Marketplace() {
  const [items, setItems] = useState<MarketplaceItem[]>(marketplaceItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [newItem, setNewItem] = useState({
    category: "판매" as "판매" | "구매" | "교환" | "나눔",
    title: "",
    gameName: "",
    price: "",
    condition: "",
    region: "",
    description: "",
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gameName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCreateItem = () => {
    if (!newItem.title || !newItem.gameName || !newItem.region || !newItem.description) return;

    const item: MarketplaceItem = {
      id: `mp${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      category: newItem.category,
      title: newItem.title,
      gameName: newItem.gameName,
      price: newItem.price ? parseInt(newItem.price) : undefined,
      condition: newItem.condition,
      region: newItem.region,
      description: newItem.description,
      timestamp: new Date().toISOString(),
      status: "활성",
      views: 0,
      comments: 0,
    };

    setItems([item, ...items]);
    setIsCreateModalOpen(false);
    setNewItem({
      category: "판매",
      title: "",
      gameName: "",
      price: "",
      condition: "",
      region: "",
      description: "",
    });
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

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">중고 거래</h1>
            <p className="text-muted-foreground text-lg">보드게임 사고팔고 교환하고 나눔하세요</p>
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
                <DialogTitle>거래글 작성</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label>카테고리</Label>
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="판매">판매</SelectItem>
                      <SelectItem value="구매">구매</SelectItem>
                      <SelectItem value="교환">교환</SelectItem>
                      <SelectItem value="나눔">나눔</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>제목</Label>
                  <Input
                    placeholder="거래글 제목을 입력하세요"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label>게임 이름</Label>
                  <Input
                    placeholder="게임 이름을 입력하세요"
                    value={newItem.gameName}
                    onChange={(e) => setNewItem({ ...newItem, gameName: e.target.value })}
                  />
                </div>

                {(newItem.category === "판매" || newItem.category === "구매") && (
                  <div>
                    <Label>가격</Label>
                    <Input
                      type="number"
                      placeholder="가격 (원)"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                )}

                {newItem.category === "판매" && (
                  <div>
                    <Label>상태</Label>
                    <Input
                      placeholder="예: 상태 좋음, 구성품 완전"
                      value={newItem.condition}
                      onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                    />
                  </div>
                )}

                <div>
                  <Label>거래 지역</Label>
                  <Input
                    placeholder="예: 서울 강남구"
                    value={newItem.region}
                    onChange={(e) => setNewItem({ ...newItem, region: e.target.value })}
                  />
                </div>

                <div>
                  <Label>상세 설명</Label>
                  <Textarea
                    placeholder="거래에 대한 자세한 설명을 입력하세요"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="min-h-32"
                  />
                </div>

                <Button 
                  onClick={handleCreateItem} 
                  className="w-full"
                  disabled={!newItem.title || !newItem.gameName || !newItem.region || !newItem.description}
                >
                  작성 완료
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 border-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="제목, 게임 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="flex-1"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-card transition-smooth border-2">
              {/* Image */}
              {item.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={categoryColors[item.category]}>
                    {item.category}
                  </Badge>
                  {item.price && (
                    <span className="text-xl font-bold text-primary">
                      {item.price.toLocaleString()}원
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold mb-2 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">게임: {item.gameName}</p>

                {item.condition && (
                  <p className="text-sm text-foreground/80 mb-2">{item.condition}</p>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{item.region}</span>
                </div>

                <p className="text-foreground/70 mb-4 line-clamp-2 text-sm">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20">
                      <img src={item.userAvatar} alt={item.userName} className="w-full h-full" />
                    </Avatar>
                    <span className="text-sm font-medium">{item.userName}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.comments}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-2">
                  {formatTimestamp(item.timestamp)}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-2xl text-muted-foreground mb-2">검색 결과가 없습니다</p>
            <p className="text-muted-foreground">다른 조건으로 검색해보세요</p>
          </Card>
        )}
      </div>
    </div>
  );
}
