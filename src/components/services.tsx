import { 
  Lightbulb, 
  ChefHat, 
  Cog, 
  Users, 
  Megaphone, 
  UserPlus 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Lightbulb,
    title: "Concept Development",
    description: "Transform your vision into a compelling restaurant concept that stands out in the market and resonates with your target audience.",
    features: ["Brand Identity Design", "Market Positioning", "Concept Validation", "Customer Journey Mapping"],
    color: "primary"
  },
  {
    icon: ChefHat,
    title: "Menu Engineering",
    description: "Optimize your menu for profitability and guest satisfaction with data-driven insights and culinary expertise.",
    features: ["Cost Analysis", "Price Optimization", "Menu Psychology", "Seasonal Planning"],
    color: "accent"
  },
  {
    icon: Cog,
    title: "Operational Efficiency",
    description: "Streamline operations to reduce costs, improve service speed, and enhance the overall dining experience.",
    features: ["Workflow Optimization", "Kitchen Design", "POS Integration", "Inventory Management"],
    color: "secondary"
  },
  {
    icon: Users,
    title: "Staff Training",
    description: "Build a skilled, motivated team that delivers exceptional service and drives customer loyalty.",
    features: ["Service Standards", "Training Programs", "Performance Metrics", "Team Building"],
    color: "primary"
  },
  {
    icon: Megaphone,
    title: "Marketing & Cost Control",
    description: "Develop effective marketing strategies while maintaining tight control over operational costs.",
    features: ["Digital Marketing", "Cost Reduction", "Customer Acquisition", "Brand Promotion"],
    color: "accent"
  },
  {
    icon: UserPlus,
    title: "Recruiting",
    description: "Find and hire the right talent to build a strong team that supports your restaurant's success.",
    features: ["Talent Sourcing", "Interview Process", "Onboarding", "Retention Strategies"],
    color: "secondary"
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            Our Core Services
          </div>
          <h2 className="text-3xl font-heading font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            Everything Your Restaurant
            <span className="gradient-text-primary block">Needs to Succeed</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From concept to execution, we provide comprehensive consulting services 
            to help your restaurant thrive in today's competitive market.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            const isEven = index % 2 === 0
            
            return (
              <Card 
                key={service.title}
                className={`group relative overflow-hidden border-2 transition-all duration-500 hover:shadow-card hover:-translate-y-2 ${
                  service.color === 'primary' ? 'hover:border-primary/20 hover:shadow-primary/10' :
                  service.color === 'accent' ? 'hover:border-accent/20 hover:shadow-accent/10' :
                  'hover:border-secondary/20 hover:shadow-secondary/10'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${
                  service.color === 'primary' ? 'bg-gradient-primary' :
                  service.color === 'accent' ? 'bg-gradient-accent' :
                  'bg-gradient-secondary'
                }`} />
                
                <CardHeader className="relative">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg mb-4 ${
                    service.color === 'primary' ? 'bg-gradient-primary' :
                    service.color === 'accent' ? 'bg-gradient-accent' :
                    'bg-gradient-secondary'
                  }`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-heading font-semibold">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className={`h-1.5 w-1.5 rounded-full mr-3 ${
                          service.color === 'primary' ? 'bg-primary' :
                          service.color === 'accent' ? 'bg-accent' :
                          'bg-secondary'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline"
                    className="w-full group-hover:border-current group-hover:bg-current/5 transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-hero text-primary-foreground hover:shadow-glow transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  )
}