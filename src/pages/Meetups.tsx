import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar, Users, Clock, Search, Plus } from "lucide-react";
import { meetups, currentUser } from "@/data/dummy";
import { cn } from "@/lib/utils";

export default function Meetups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [joinedMeetups, setJoinedMeetups] = useState<string[]>(
    meetups.filter(m => m.participants.includes(currentUser.id)).map(m => m.id)
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newMeetup, setNewMeetup] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    gameType: "Strategy",
    description: ""
  });

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

  const handleCreateMeetup = () => {
    console.log("Creating meetup:", newMeetup);
    setIsCreateModalOpen(false);
    setNewMeetup({
      title: "",
      date: "",
      time: "",
      location: "",
      maxParticipants: "",
      gameType: "Strategy",
      description: ""
    });
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

        {/* Map Preview */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative h-64 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-primary opacity-50" />
              <p className="text-muted-foreground">Map Preview</p>
              <p className="text-sm text-muted-foreground mt-1">Google Maps / Kakao Map Integration</p>
            </div>
          </div>
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

                  <div className="flex gap-2">
                    <Button
                      className={cn("flex-1", isJoined && "bg-secondary hover:bg-secondary/90")}
                      onClick={() => handleJoin(meetup.id)}
                      disabled={!isJoined && isFull}
                    >
                      {isJoined ? "Leave" : isFull ? "Full" : "Join"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
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
            <DialogTitle className="text-2xl">Create New Meetup</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new board game meetup
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newMeetup.title}
                onChange={(e) => setNewMeetup({ ...newMeetup, title: e.target.value })}
                placeholder="e.g., Catan Tournament Night"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeetup.date}
                  onChange={(e) => setNewMeetup({ ...newMeetup, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMeetup.time}
                  onChange={(e) => setNewMeetup({ ...newMeetup, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newMeetup.location}
                onChange={(e) => setNewMeetup({ ...newMeetup, location: e.target.value })}
                placeholder="e.g., Downtown Board Game Café"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={newMeetup.maxParticipants}
                  onChange={(e) => setNewMeetup({ ...newMeetup, maxParticipants: e.target.value })}
                  placeholder="e.g., 12"
                />
              </div>
              <div>
                <Label htmlFor="gameType">Game Type</Label>
                <select
                  id="gameType"
                  value={newMeetup.gameType}
                  onChange={(e) => setNewMeetup({ ...newMeetup, gameType: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Strategy">Strategy</option>
                  <option value="Party">Party</option>
                  <option value="RPG">RPG</option>
                  <option value="Family">Family</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newMeetup.description}
                onChange={(e) => setNewMeetup({ ...newMeetup, description: e.target.value })}
                placeholder="Describe your meetup..."
                rows={4}
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMeetup}>
              Create Meetup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
