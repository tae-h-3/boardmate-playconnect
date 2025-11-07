import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Trophy, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-6">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="text-7xl">🎲</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            보드메이트에 오신 것을 환영합니다
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            보드게임 모임을 찾고, 플레이어들과 연결하고, 게임 나이트를 더 즐겁게!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/meetups">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-soft text-lg px-8">
                모임 찾기
              </Button>
            </Link>
            <Link to="/calendar">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                캘린더 보기
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20 text-6xl">🎯</div>
        <div className="absolute bottom-10 right-10 opacity-20 text-6xl">🃏</div>
        <div className="absolute top-1/2 right-20 opacity-20 text-5xl">♟️</div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          게임 나이트에 필요한 모든 것
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">모임 찾기</h3>
            <p className="text-muted-foreground">
              위치 기반 검색으로 근처의 보드게임 이벤트를 찾아보세요
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-secondary/20">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">일정 관리</h3>
            <p className="text-muted-foreground">
              모든 게임 나이트를 하나의 공유 캘린더에서 관리하세요
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-accent/20">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">연결하기</h3>
            <p className="text-muted-foreground">
              보드게임 애호가들을 만나고 게임 커뮤니티를 만드세요
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">포인트 적립</h3>
            <p className="text-muted-foreground">
              참석 기록을 추적하고 더 많은 모임에 참여하면서 포인트를 얻으세요
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="p-12 text-center bg-gradient-secondary border-none shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            주사위를 굴릴 준비가 되셨나요?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            오늘 보드메이트에 가입하고 게임 나이트를 절대 놓치지 마세요. 다음 모험이 기다리고 있습니다!
          </p>
          <Link to="/meetups">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8">
              지금 시작하기
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
