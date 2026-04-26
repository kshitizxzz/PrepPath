import LandingHero from '@/components/LandingHero';
import { Zap, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Active Users', value: '10,000+' },
    { label: 'Roadmaps Generated', value: '50,000+' },
    { label: 'Success Rate', value: '92%' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer @ Google',
      text: 'PrepPath helped me structure my prep and pass my Google interviews.',
    },
    {
      name: 'Alex Rodriguez',
      role: 'Senior Dev @ Meta',
      text: 'The personalized roadmap saved me weeks of aimless studying.',
    },
    {
      name: 'Jamie Kim',
      role: 'Product Engineer @ Amazon',
      text: 'Best interview prep tool I\'ve used. Highly recommend!',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <LandingHero />

      {/* Stats Section */}
      <section className="bg-dark-light border-y border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">How PrepPath Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Zap, step: '1', title: 'Answer Questions', desc: 'Tell us your target, timeline & weak areas' },
              { icon: TrendingUp, step: '2', title: 'AI Analysis', desc: 'Our Dijkstra algorithm calculates optimal path' },
              { icon: Users, step: '3', title: 'Get Roadmap', desc: 'Receive your personalized study plan' },
              { icon: Zap, step: '4', title: 'Track Progress', desc: 'Monitor completion and adjust as needed' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-dark-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">What Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="card">
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Interview?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of developers preparing smarter with PrepPath</p>
          <button className="btn-primary text-lg">Get Started Free</button>
        </div>
      </section>
    </>
  );
}
