import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Briefcase, GraduationCap, Code } from 'lucide-react';

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getData() {
  // In a real production deployment, this should use an absolute URL or direct DB call if server component
  // Since we are in Next.js App Router, we can call DB directly in Server Components
  const { db } = await import('@/lib/db');
  
  const profile = db.prepare('SELECT * FROM profile LIMIT 1').get() as any;
  const experience = db.prepare('SELECT * FROM experience').all() as any[];
  const education = db.prepare('SELECT * FROM education').all() as any[];
  const skills = db.prepare('SELECT * FROM skills').all() as any[];

  // If profile is empty, return default values
  if (!profile) {
    return {
      profile: {
        name: 'Your Name',
        title: 'Your Title',
        email: '',
        phone: '',
        github: '',
        address: '',
        summary: 'Add your summary here',
        image: null
      },
      experience: [],
      education: [],
      skills: []
    };
  }

  return { profile, experience: experience || [], education: education || [], skills: skills || [] };
}

export default async function Home() {
  const { profile, experience, education, skills } = await getData() as any;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-20">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center gap-10 justify-center text-center md:text-left animate-in fade-in duration-700">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
            {profile.image && (
              <Image 
                src={profile.image} 
                alt={profile.name} 
                fill 
                className="object-cover"
                priority
              />
            )}
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{profile.name}</h1>
            <h2 className="text-xl md:text-2xl text-blue-600 font-medium mb-6">{profile.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">{profile.summary}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
               {/* Quick Skills Pills */}
               <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">AI/ML</span>
               <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Web Scraping</span>
               <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">Full Stack</span>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-600 rounded-lg text-white">
              <Briefcase size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
          </div>
          <div className="space-y-8 border-l-2 border-gray-200 ml-4 pl-8 relative">
            {experience.map((exp: any) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot */}
                <span className="absolute -left-[41px] top-1 w-5 h-5 bg-white border-4 border-blue-600 rounded-full group-hover:scale-125 transition"></span>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap">{exp.duration}</span>
                  </div>
                  <h4 className="text-lg text-gray-700 font-medium mb-3">{exp.company}</h4>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="scroll-mt-24">
           <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-green-600 rounded-lg text-white">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu: any) => (
              <div key={edu.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h3>
                <div className="text-blue-600 font-medium mb-2">{edu.university}</div>
                <div className="text-sm text-gray-500 mb-3">{edu.year}</div>
                {edu.details && <p className="text-gray-600 text-sm italic border-t pt-3 mt-1">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-purple-600 rounded-lg text-white">
              <Code size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Technical Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill: any) => (
              <div key={skill.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">{skill.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.split(',').map((item: string, idx: number) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-md hover:bg-gray-200 transition">
                      {item.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
