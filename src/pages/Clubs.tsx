import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, Plus, Calendar } from "lucide-react";
import { clubs, currentUser } from "@/data/dummy";
import { useNavigate } from "react-router-dom";

export default function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [joinedClubs, setJoinedClubs] = useState<string[]>(
    clubs.filter(c => c.members.includes(currentUser.id)).map(c => c.id)
  );
  const navigate = useNavigate();

  const filteredClubs = clubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoin = (clubId: string) => {
    if (joinedClubs.includes(clubId)) {
      setJoinedClubs(prev => prev.filter(id => id !== clubId));
    } else {
      setJoinedClubs(prev => [...prev, clubId]);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">동아리 & 동호회</h1>
          <p className="text-muted-foreground text-lg">
            같은 관심사를 가진 사람들과 함께하세요
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="동아리 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Create Club Button */}
        <Button className="mb-8 w-full md:w-auto" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          새 동아리 만들기
        </Button>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map(club => {
            const isJoined = joinedClubs.includes(club.id);

            return (
              <Card 
                key={club.id} 
                className="overflow-hidden hover:shadow-card transition-smooth border-2 cursor-pointer"
                onClick={() => navigate(`/clubs/${club.id}`)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={club.imageUrl}
                    alt={club.name}
                    className="w-full h-full object-cover"
                  />
                  {isJoined && (
                    <Badge className="absolute top-4 right-4 bg-primary">
                      가입됨
                    </Badge>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{club.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {club.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>멤버 {club.memberCount}명</span>
                  </div>

                  <div className="flex gap-2 mb-4 flex-wrap">
                    {club.gameTypes.map(type => (
                      <Badge key={type} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      variant={isJoined ? "secondary" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoin(club.id);
                      }}
                    >
                      {isJoined ? "탈퇴" : "가입하기"}
                    </Button>
                    {isJoined && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/clubs/${club.id}`);
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">
              검색 결과가 없습니다
            </p>
            <p className="text-muted-foreground">다른 검색어를 시도해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
