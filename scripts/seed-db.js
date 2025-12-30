const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

// Use the same path as lib/db.ts
const dbPath = path.join(process.cwd(), 'portfolio.db');

try {
  const db = new Database(dbPath);

  // Check if database already has data
  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get();
  
  if (profileCount.count > 0) {
    console.log('Database already has data, skipping seed.');
    db.close();
    process.exit(0);
  }

  console.log('Seeding database...');

  // Clear existing data (should be empty, but just in case)
  db.exec('DELETE FROM users');
  db.exec('DELETE FROM profile');
  db.exec('DELETE FROM experience');
  db.exec('DELETE FROM education');
  db.exec('DELETE FROM skills');

// 1. Admin User
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('admin123', salt); // Default password
db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hash);

// 2. Profile
const profile = {
    name: 'AMIN ALIPOUR',
    title: 'AI Programmer & Senior Web Scraping Engineer',
    email: 'aminemalipour@gmail.com',
    phone: '+98 998 146 1377',
    github: 'github.com/aminaliipour',
    address: 'No. 79, Salamat Alley (Dead End), Langarod, Iran',
    summary: 'Master of Software Engineering student designing a Smart Assistant for Doctors. Experienced in AI, Web Scraping, and Full Stack Development.',
    image: '/images/profile.png'
};

db.prepare(`
    INSERT INTO profile (name, title, email, phone, github, address, summary, image)
    VALUES (@name, @title, @email, @phone, @github, @address, @summary, @image)
`).run(profile);

// 3. Experience
const experiences = [
    {
        role: 'AI Programmer & Senior Web Scraping Engineer',
        company: 'Fashion Startup - Aryorithm Team, Lahijan, Iran',
        duration: 'Jan 2023 – Jan 2024',
        description: 'Worked on developing artificial intelligence models and advanced web scraping solutions for the fashion industry, contributing to data-driven insights and automated data collection systems.'
    },
    {
        role: 'Software Engineer & IT Technician',
        company: 'HiArchitect, Lahijan, Iran',
        duration: 'Jan 2025 – Present',
        description: 'Working on software development, IT infrastructure support, and maintaining company’s digital presence.'
    }
];

const insertExp = db.prepare('INSERT INTO experience (role, company, duration, description) VALUES (@role, @company, @duration, @description)');
experiences.forEach(exp => insertExp.run(exp));

// 4. Education
const education = [
    {
        degree: 'Master of Software Engineering',
        university: 'Guilan University',
        year: '2023 - Present',
        details: 'Thesis: Design and Development of a Smart Assistant for Doctors. Keywords: AI, Speech-to-Text, Healthcare, NLP.'
    },
    {
        degree: 'Bachelor of Software Engineering',
        university: 'Urmia University',
        year: '2017 - 2022',
        details: ''
    }
];

const insertEdu = db.prepare('INSERT INTO education (degree, university, year, details) VALUES (@degree, @university, @year, @details)');
education.forEach(edu => insertEdu.run(edu));

// 5. Skills
const skills = [
    { category: 'AI & Machine Learning', items: 'NLP, Deep Learning, Computer Vision, Speech-to-Text, Prompt Engineering' },
    { category: 'Web Development', items: 'HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap, Tailwind CSS, Node.js, Django, ASP.Net Core, PHP' },
    { category: 'Programming Languages', items: 'Python, JavaScript, C, C++, Java, Go, C#, SQL' },
    { category: 'Databases', items: 'SQL Server, MySQL, PostgreSQL, MongoDB, Redis' },
    { category: 'Tools & DevOps', items: 'Git/GitHub, Linux, Docker, AWS, Azure' }
];

const insertSkill = db.prepare('INSERT INTO skills (category, items) VALUES (@category, @items)');
skills.forEach(skill => insertSkill.run(skill));

console.log('Database seeded successfully.');
db.close();
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
