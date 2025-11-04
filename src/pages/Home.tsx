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
            Welcome to BoardMate
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover board game meetups, connect with players, and level up your game nights!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/meetups">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-soft text-lg px-8">
                Find Meetups
              </Button>
            </Link>
            <Link to="/calendar">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                View Calendar
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
          Everything you need for game nights
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Meetups</h3>
            <p className="text-muted-foreground">
              Discover board game events near you with location-based search
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-secondary/20">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Manage Schedule</h3>
            <p className="text-muted-foreground">
              Keep track of all your game nights in one shared calendar
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-accent/20">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-muted-foreground">
              Meet fellow board game enthusiasts and build your gaming community
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-card transition-smooth border-2 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Earn Points</h3>
            <p className="text-muted-foreground">
              Track attendance and earn points as you participate in more meetups
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="p-12 text-center bg-gradient-secondary border-none shadow-soft">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to roll the dice?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join BoardMate today and never miss another game night. Your next adventure awaits!
          </p>
          <Link to="/meetups">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8">
              Get Started Now
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
