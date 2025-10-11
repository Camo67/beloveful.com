import { Instagram, Facebook, ExternalLink, Mail } from "lucide-react";

interface SocialIconsProps {
  className?: string;
  iconSize?: number;
  variant?: "auto" | "white";
}

export function SocialIcons({ className = "", iconSize = 20, variant = "auto" }: SocialIconsProps) {
  const socialLinks = [
    {
      name: "Newsletter",
      url: "https://lb.benchmarkemail.com//listbuilder/signupnew?IkfHTmyPVq92wBnn4lX%252FTf5pwVnAjsSIeL8KRSOgMpXtO5iNRn8gS049TyW7spdJ",
      icon: Mail,
      label: "Join Newsletter"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/beloveful/#",
      icon: Instagram,
      label: "Follow on Instagram"
    },
    {
      name: "Facebook", 
      url: "https://www.facebook.com/tony.menias#",
      icon: Facebook,
      label: "Follow on Facebook"
    },
    {
      name: "Linktree",
      url: "https://linktr.ee/beloveful?lt_utm_source=lt_share_link#74152480",
      icon: ExternalLink,
      label: "View Linktree"
    }
  ];

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={variant === "white" ? "text-white transition-opacity duration-300 hover:opacity-60" : "text-black dark:text-white transition-opacity duration-300 hover:opacity-60"}
            aria-label={social.label}
            title={social.label}
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
    </div>
  );
}