import {
  IoShareSocialOutline,
  IoLogoWhatsapp,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
} from "react-icons/io5";
import {
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
  FaPinterest,
  FaEnvelope,
} from "react-icons/fa";

export const getSocials = (url) => [
  {
    name: "WhatsApp",
    icon: <IoLogoWhatsapp size={40} color="#25D366" />,
    link: `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: <IoLogoFacebook size={40} color="#1877F2" />,
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  },
  {
    name: "Twitter",
    icon: <IoLogoTwitter size={40} color="#1DA1F2" />,
    link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Instagram",
    icon: <IoLogoInstagram size={40} color="#E1306C" />,
    link: `https://www.instagram.com/`,
  },
  {
    name: "TikTok",
    icon: <FaTiktok size={40} color="#010101" />,
    link: `https://www.tiktok.com/`,
  },
  {
    name: "Snapchat",
    icon: <FaSnapchatGhost size={40} color="#FFFC00" />,
    link: `https://www.snapchat.com/`,
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin size={40} color="#0A66C2" />,
    link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
  },
  {
    name: "Pinterest",
    icon: <FaPinterest size={40} color="#E60023" />,
    link: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}`,
  },
  {
    name: "Email",
    icon: <FaEnvelope size={40} color="#EA4335" />,
    link: `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`,
  },
];
