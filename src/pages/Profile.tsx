import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Trophy, Calendar, Star, Settings } from "lucide-react";
import { currentUser } from "@/data/dummy";

export default function Profile() {
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
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground mb-4">
                Member since {new Date(currentUser.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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

        {/* Favorite Games */}
        <Card className="p-6 mb-8 border-2">
          <h2 className="text-2xl font-bold mb-4">Favorite Games</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.favoriteGames.map(game => (
              <Badge key={game} variant="secondary" className="text-sm px-4 py-2">
                {game}
              </Badge>
            ))}
            <Button variant="outline" size="sm" className="rounded-full">
              + Add Game
            </Button>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 border-2">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
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
                    Earned
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Level Progress */}
        <Card className="p-6 mt-8 bg-gradient-primary text-white border-none">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold">Level 5 Player</h3>
            <span className="text-lg font-semibold">450 / 500 XP</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: '90%' }}
            />
          </div>
          <p className="text-sm mt-3 text-white/90">50 XP until next level!</p>
        </Card>
      </div>
    </div>
  );
}
