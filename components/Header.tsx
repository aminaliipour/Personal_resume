import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-400 transition">
          Amin Alipour
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#experience" className="hover:text-blue-400 transition">Experience</Link></li>
            <li><Link href="#education" className="hover:text-blue-400 transition">Education</Link></li>
            <li><Link href="#skills" className="hover:text-blue-400 transition">Skills</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
