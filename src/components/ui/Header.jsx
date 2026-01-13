import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Home",
      path: "/3d-interactive-homepage",
      icon: "Home",
      description: "3D Interactive Experience",
    },
    {
      name: "Projects",
      path: "/project-universe-gallery",
      icon: "Layers",
      description: "Project Universe Gallery",
    },
    {
      name: "Skills",
      path: "/skills-constellation-visualization",
      icon: "Zap",
      description: "Skills Constellation",
    },
    // {
    //   name: 'Lab',
    //   path: '/code-laboratory-interactive-environment',
    //   icon: 'Code',
    //   description: 'Code Laboratory'
    // },
    {
      name: "Story",
      path: "/professional-story-journey",
      icon: "User",
      description: "Professional Journey",
    },
  ];

  const secondaryItems = [
    {
      name: "Experiments",
      path: "/innovation-playground-experiments",
      icon: "Beaker",
      description: "Innovation Playground",
    },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-fast ease-natural ${
        isScrolled
          ? "bg-background/80 backdrop-blur-glass border-b border-border/50 shadow-floating"
          : "bg-transparent"
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation("/3d-interactive-homepage")}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-brand-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-fast ease-spring">
                {/* <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg> */}
                <span className="font-headline text-xl font-bold text-primary">
                  ZH
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-brand-primary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-fast blur-md"></div>
            </div>
            <div className="ml-3">
              <h1 className="font-headline font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-fast">
                Zaw Lynn Htet
              </h1>
              <p className="font-ui text-xs text-muted-foreground -mt-1">
                Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`group relative px-4 py-2 rounded-lg font-ui font-medium text-sm transition-all duration-fast ease-natural ${
                  isActivePath(item?.path)
                    ? "text-accent bg-accent/10 shadow-glow"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon
                    name={item?.icon}
                    size={16}
                    className={`transition-colors duration-fast ${
                      isActivePath(item?.path) ? "text-accent" : "text-current"
                    }`}
                  />
                  <span>{item?.name}</span>
                </div>

                {/* Active indicator */}
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
                )}

                {/* Hover tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-popover border border-border rounded-md text-xs text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-fast pointer-events-none whitespace-nowrap">
                  {item?.description}
                </div>
              </button>
            ))}

            {/* More Menu */}
            {/* <div className="relative group">
              <button className="px-4 py-2 rounded-lg font-ui font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-card/50 transition-all duration-fast ease-natural">
                <div className="flex items-center space-x-2">
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </div>
              </button>

              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast ease-natural">
                <div className="p-2">
                  {secondaryItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-fast ${
                        isActivePath(item?.path)
                          ? "text-accent bg-accent/10"
                          : "text-popover-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <div className="text-left">
                        <div className="font-medium">{item?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {item?.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div> */}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              size="sm"
              className="border-accent/30 text-accent"
              iconName="Github"
              iconPosition="left"
              iconSize={16}
            >
              GitHub
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-accent to-brand-primary hover:from-accent/90 hover:to-brand-primary/90 text-primary shadow-glow"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors duration-fast"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-glass border-t border-border/50">
            <div className="px-6 py-4 space-y-2">
              {[...navigationItems]?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-fast ${
                    isActivePath(item?.path)
                      ? "text-accent bg-accent/10 shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div>
                    <div className="font-medium">{item?.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {item?.description}
                    </div>
                  </div>
                </button>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-2 border-t border-border/30">
                <Button
                  variant="outline"
                  fullWidth
                  className="border-accent/30 text-accent hover:bg-accent/10"
                  iconName="Github"
                  iconPosition="left"
                >
                  View GitHub
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  className="bg-gradient-to-r from-accent to-brand-primary text-primary shadow-glow"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Start Collaboration
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
