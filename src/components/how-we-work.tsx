import { Search, Lightbulb, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "We analyze your current operations, market position, and growth opportunities through comprehensive audits and stakeholder interviews.",
    features: ["Market Research", "Operational Audit", "Competitive Analysis", "Customer Insights"]
  },
  {
    icon: Lightbulb,
    title: "Prototype",
    description: "We design tailored solutions and test concepts with rapid prototyping to ensure maximum impact and feasibility.",
    features: ["Solution Design", "Rapid Testing", "Concept Validation", "Stakeholder Buy-in"]
  },
  {
    icon: TrendingUp,
    title: "Scale",
    description: "We implement proven strategies with ongoing support to ensure sustainable growth and long-term success.",
    features: ["Implementation", "Training & Support", "Performance Monitoring", "Continuous Optimization"]
  }
]

export function HowWeWork() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6">
            Our Process
          </div>
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            How We Transform
            <span className="gradient-text-accent block">Your Restaurant Business</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Our proven three-step methodology ensures every project delivers measurable results 
            and sustainable growth for your restaurant business.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid gap-12 md:gap-16 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            
            return (
              <div 
                key={step.title}
                className="relative group"
              >
                {/* Connection Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[calc(100%-2rem)] w-16 h-px bg-gradient-to-r from-accent to-accent/20 z-10" />
                )}

                {/* Step Card */}
                <div className="text-center">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-accent text-accent-foreground font-heading font-bold text-lg mb-6 shadow-glow">
                    <span className="relative z-10">{index + 1}</span>
                    <Icon className="absolute inset-0 m-auto h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8">
                    <div className="w-px h-8 bg-gradient-to-b from-accent to-accent/20" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-heading font-bold gradient-text-accent mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold gradient-text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold gradient-text-secondary mb-2">40%</div>
            <div className="text-sm text-muted-foreground">Avg Revenue Increase</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold gradient-text-hero mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}