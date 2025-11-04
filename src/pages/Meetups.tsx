import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Users, Clock, Search, Plus } from "lucide-react";
import { meetups, currentUser } from "@/data/dummy";
import { cn } from "@/lib/utils";

export default function Meetups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [joinedMeetups, setJoinedMeetups] = useState<string[]>(
    meetups.filter(m => m.participants.includes(currentUser.id)).map(m => m.id)
  );

  const gameTypes = ["All", "Strategy", "Party", "RPG", "Family"];

  const filteredMeetups = meetups.filter(meetup => {
    const matchesSearch = meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meetup.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || meetup.gameType === filterType;
    return matchesSearch && matchesType;
  });

  const handleJoin = (meetupId: string) => {
    if (joinedMeetups.includes(meetupId)) {
      setJoinedMeetups(prev => prev.filter(id => id !== meetupId));
    } else {
      setJoinedMeetups(prev => [...prev, meetupId]);
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Meetups</h1>
          <p className="text-muted-foreground text-lg">Find your next board game adventure</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search meetups or locations..."
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

        {/* Create Meetup Button */}
        <Button className="mb-8 w-full md:w-auto" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          Create New Meetup
        </Button>

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
                      <span>{new Date(meetup.date).toLocaleDateString()} at {meetup.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span>{meetup.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{meetup.currentParticipants}/{meetup.maxParticipants} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Hosted by {meetup.hostName}</span>
                    </div>
                  </div>

                  <Button
                    className={cn("w-full", isJoined && "bg-secondary hover:bg-secondary/90")}
                    onClick={() => handleJoin(meetup.id)}
                    disabled={!isJoined && isFull}
                  >
                    {isJoined ? "Leave Meetup" : isFull ? "Full" : "Join Meetup"}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredMeetups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground mb-4">No meetups found</p>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
