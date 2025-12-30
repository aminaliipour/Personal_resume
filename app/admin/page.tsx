'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states for adding/editing
  const [editingItem, setEditingItem] = useState<any>(null); // { type, data }
  const [isAdding, setIsAdding] = useState<string | null>(null); // 'experience' | 'education' | 'skills'

  useEffect(() => {
    fetch('/api/auth/check')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return fetch('/api/data');
      })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(() => router.push('/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const handleUpdate = async (type: string, id: number, updatedData: any) => {
    await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ type, action: 'update', id, data: updatedData }),
    });
    window.location.reload();
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ type, action: 'delete', id }),
    });
    window.location.reload();
  };

  const handleCreate = async (type: string, newData: any) => {
    await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify({ type, action: 'create', data: newData }),
    });
    window.location.reload();
  };

  if (loading) return <div className="p-8 text-center">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex gap-4">
            <Link href="/" className="text-blue-600 hover:underline">View Site</Link>
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800">Logout</button>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Profile Edit */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Edit Profile</h2>
          <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const updates = Object.fromEntries(formData);
              handleUpdate('profile', data.profile.id, updates);
          }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" defaultValue={data.profile.name} className="border p-2 rounded" placeholder="Name" />
              <input name="title" defaultValue={data.profile.title} className="border p-2 rounded" placeholder="Title" />
              <input name="email" defaultValue={data.profile.email} className="border p-2 rounded" placeholder="Email" />
              <input name="phone" defaultValue={data.profile.phone} className="border p-2 rounded" placeholder="Phone" />
              <input name="github" defaultValue={data.profile.github} className="border p-2 rounded" placeholder="Github" />
              <input name="address" defaultValue={data.profile.address} className="border p-2 rounded" placeholder="Address" />
              <input name="image" defaultValue={data.profile.image} className="border p-2 rounded" placeholder="Image Path" />
              <textarea name="summary" defaultValue={data.profile.summary} className="border p-2 rounded md:col-span-2 h-24" placeholder="Summary" />
              <button className="bg-blue-600 text-white py-2 rounded md:col-span-2 hover:bg-blue-700">Save Profile</button>
          </form>
        </section>

        {/* Experience Management */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                 <h2 className="text-xl font-bold">Experience</h2>
                 <button onClick={() => setIsAdding('experience')} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">+ Add New</button>
            </div>
            
            {isAdding === 'experience' && (
                <div className="mb-6 p-4 bg-gray-50 border rounded">
                     <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleCreate('experience', Object.fromEntries(formData));
                    }} className="space-y-3">
                        <input name="role" placeholder="Role" className="w-full border p-2 rounded" required />
                        <input name="company" placeholder="Company" className="w-full border p-2 rounded" required />
                        <input name="duration" placeholder="Duration" className="w-full border p-2 rounded" required />
                        <textarea name="description" placeholder="Description" className="w-full border p-2 rounded" />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add</button>
                            <button type="button" onClick={() => setIsAdding(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {data.experience.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">{item.role}</h3>
                            <p className="text-sm text-gray-600">{item.company} | {item.duration}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <button onClick={() => handleDelete('experience', item.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </div>
                ))}
            </div>
        </section>

         {/* Education Management */}
         <section className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                 <h2 className="text-xl font-bold">Education</h2>
                 <button onClick={() => setIsAdding('education')} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">+ Add New</button>
            </div>

            {isAdding === 'education' && (
                <div className="mb-6 p-4 bg-gray-50 border rounded">
                     <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleCreate('education', Object.fromEntries(formData));
                    }} className="space-y-3">
                        <input name="degree" placeholder="Degree" className="w-full border p-2 rounded" required />
                        <input name="university" placeholder="University" className="w-full border p-2 rounded" required />
                        <input name="year" placeholder="Year" className="w-full border p-2 rounded" required />
                        <textarea name="details" placeholder="Details" className="w-full border p-2 rounded" />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add</button>
                            <button type="button" onClick={() => setIsAdding(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {data.education.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">{item.degree}</h3>
                            <p className="text-sm text-gray-600">{item.university} | {item.year}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.details}</p>
                        </div>
                        <button onClick={() => handleDelete('education', item.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </div>
                ))}
            </div>
        </section>

         {/* Skills Management */}
         <section className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                 <h2 className="text-xl font-bold">Skills</h2>
                 <button onClick={() => setIsAdding('skills')} className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">+ Add New</button>
            </div>

            {isAdding === 'skills' && (
                <div className="mb-6 p-4 bg-gray-50 border rounded">
                     <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleCreate('skills', Object.fromEntries(formData));
                    }} className="space-y-3">
                        <input name="category" placeholder="Category (e.g. Web Dev)" className="w-full border p-2 rounded" required />
                        <textarea name="items" placeholder="Items (comma separated)" className="w-full border p-2 rounded" required />
                        <div className="flex gap-2">
                            <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Add</button>
                            <button type="button" onClick={() => setIsAdding(null)} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {data.skills.map((item: any) => (
                    <div key={item.id} className="border p-4 rounded flex justify-between items-start">
                        <div>
                            <h3 className="font-bold">{item.category}</h3>
                            <p className="text-sm text-gray-600">{item.items}</p>
                        </div>
                        <button onClick={() => handleDelete('skills', item.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
}
