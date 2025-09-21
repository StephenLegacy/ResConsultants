import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container px-4 md:px-6">
        {/* Main Footer */}
        <div className="grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="font-heading text-xl font-bold text-white">G</span>
              </div>
              <span className="font-heading text-2xl font-bold gradient-text-primary">
                Gotendia Restaurant Consultants
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Transforming restaurant concepts into profitable, scalable businesses. 
              We partner with ambitious restaurateurs to create exceptional dining experiences.
            </p>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold">Stay Updated</h4>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input 
                  placeholder="Enter your email" 
                  type="email"
                  className="flex-1"
                />
                <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                "Concept Development",
                "Menu Engineering", 
                "Operational Efficiency",
                "Staff Training",
                "Marketing & Cost Control",
                "Recruiting"
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#services" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="font-heading font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Email</div>
                  <a 
                    href="mailto:hello@gotendia.com" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    hello@gotendia.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <a 
                    href="tel:+254700123456" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +254 700 123 456
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium">Office</div>
                  <div className="text-sm text-muted-foreground">
                    Nairobi, Kenya
                  </div>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Youtube, href: "#", label: "YouTube" }
                ].map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Gotendia Restaurant Consultants. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a 
                href="#privacy" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#cookies" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}