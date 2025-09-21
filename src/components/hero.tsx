import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 h-80 w-80 rounded-full bg-gradient-primary opacity-20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-accent opacity-20 blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 rounded-full bg-gradient-secondary opacity-10 blur-3xl animate-pulse [animation-delay:4s]" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8 animate-fade-in">
            ✨ Trusted by 80+ Restaurants Worldwide
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-heading font-bold tracking-tight sm:text-6xl md:text-7xl animate-slide-up">
            <span className="gradient-text-hero">
              Designing Restaurants
            </span>
            <br />
            <span className="text-foreground">
              That Taste Great —
            </span>
            <br />
            <span className="gradient-text-primary">
              And Run Better
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl animate-fade-in [animation-delay:0.2s]">
            Concepts, menus, operations and teams built to delight guests and grow profit. 
            We partner with restaurants & hotels to design experiences that scale.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in [animation-delay:0.4s]">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 transform hover:scale-105 group px-8 py-4 text-lg font-semibold"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 px-8 py-4 text-lg font-medium group"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Watch Our  Overview
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in [animation-delay:0.6s]">
            <p className="text-sm font-medium text-muted-foreground mb-6">
              Trusted by leading restaurant brands
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for client logos - will be replaced with actual logos */}
              {Array.from({ length: 1 }).map((_, i) => (
                <div 
                  key={i} 
                  className="h-8 w-24 bg-muted rounded-md flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {/* Brand {i + 1} */}
                  Our Power Brands Are Loading...Check Back Soon!
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}