import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MapPin, Users, Check, X, HelpCircle } from "lucide-react";
import { calendarEvents } from "@/data/dummy";

export default function Calendar() {
  const [events, setEvents] = useState(calendarEvents);

  const updateAttendance = (eventId: string, status: "going" | "not-going" | "maybe") => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const existingAttendee = event.attendees.find(a => a.userId === "1");
        if (existingAttendee) {
          return {
            ...event,
            attendees: event.attendees.map(a =>
              a.userId === "1" ? { ...a, status } : a
            ),
          };
        } else {
          return {
            ...event,
            attendees: [...event.attendees, { userId: "1", status }],
          };
        }
      }
      return event;
    }));
  };

  const getStatusColor = (status: "going" | "not-going" | "maybe") => {
    switch (status) {
      case "going":
        return "bg-secondary text-secondary-foreground";
      case "not-going":
        return "bg-destructive text-destructive-foreground";
      case "maybe":
        return "bg-accent text-accent-foreground";
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24 bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">이벤트 캘린더</h1>
          <p className="text-muted-foreground text-lg">게임 나이트 일정을 관리하세요</p>
        </div>

        {/* Calendar View - Simplified List View */}
        <div className="space-y-6">
          {events.map(event => {
            const userAttendance = event.attendees.find(a => a.userId === "1");
            const currentStatus = userAttendance?.status;

            return (
              <Card key={event.id} className="p-6 hover:shadow-card transition-smooth border-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-primary flex flex-col items-center justify-center text-white flex-shrink-0">
                        <span className="text-2xl font-bold">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="text-xs">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-secondary" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-accent" />
                            <span>{event.attendees.length}명 참석</span>
                          </div>
                        </div>
                        <Badge className="mt-3">{event.gameType}</Badge>
                      </div>
                    </div>

                    {/* Attendance Status */}
                    {currentStatus && (
                      <div className="mt-4">
                        <Badge className={getStatusColor(currentStatus)}>
                          내 상태: {currentStatus === "going" ? "✅ 참석" : currentStatus === "not-going" ? "❌ 불참" : "❓ 미정"}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* RSVP Buttons */}
                  <div className="flex md:flex-col gap-2">
                    <Button
                      variant={currentStatus === "going" ? "default" : "outline"}
                      className="flex-1 md:w-32"
                      onClick={() => updateAttendance(event.id, "going")}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      참석
                    </Button>
                    <Button
                      variant={currentStatus === "maybe" ? "default" : "outline"}
                      className="flex-1 md:w-32"
                      onClick={() => updateAttendance(event.id, "maybe")}
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      미정
                    </Button>
                    <Button
                      variant={currentStatus === "not-going" ? "destructive" : "outline"}
                      className="flex-1 md:w-32"
                      onClick={() => updateAttendance(event.id, "not-going")}
                    >
                      <X className="w-4 h-4 mr-2" />
                      불참
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {events.length === 0 && (
          <Card className="p-12 text-center">
            <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-2xl text-muted-foreground mb-2">다가오는 이벤트가 없습니다</p>
            <p className="text-muted-foreground">모임 페이지에서 게임 나이트에 참여해보세요!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
