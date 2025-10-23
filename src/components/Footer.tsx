import { Cloud, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 py-8 border-t border-border/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cloud className="text-primary" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TN Weather App
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Real-time weather for Tamil Nadu & India
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Powered by</span>
              <a 
                href="https://openweathermap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-accent transition-colors"
              >
                OpenWeather API
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="text-destructive" size={16} fill="currentColor" />
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
