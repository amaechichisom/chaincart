import { Facebook, Twitter, Instagram } from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex space-x-4 justify-center mt-4">
      <a href="#" className="text-neutral-500">
        <Facebook />
      </a>
      <a href="#" className="text-neutral-500">
        <Twitter />
      </a>
      <a href="#" className="text-neutral-500">
        <Instagram />
      </a>
    </div>
  );
}
