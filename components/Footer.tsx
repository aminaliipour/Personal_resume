import { Mail, Phone, Github, MapPin } from 'lucide-react';

export default function Footer({ profile }: { profile: any }) {
  if (!profile) return null;
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Me</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          {profile.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition">{profile.email}</a>
            </div>
          )}
          {profile.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400" />
              <span>{profile.phone}</span>
            </div>
          )}
          {profile.github && (
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5 text-purple-400" />
              <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">{profile.github}</a>
            </div>
          )}
        </div>
        {profile.address && (
            <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{profile.address}</span>
            </div>
        )}
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Amin Alipour. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
