import { useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/common/PageHeader';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { fileToDataUrl } from '../utils/file';

const ProfilePage = () => {
  const { user, updateCurrentUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  const handleAvatar = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const attachment = await fileToDataUrl(file);
    setAvatarUrl(attachment.url);
  };

  const saveProfile = async () => {
    const { data } = await api.put('/profile', { name, avatarUrl });
    updateCurrentUser(data.user);
    toast.success('Profile updated');
  };

  return (
    <div>
      <PageHeader title="Profile" description="Manage your name, avatar, and personal identity inside the productivity workspace." />
      <div className="glass-card max-w-3xl p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <img src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=ede9fe&color=5b21b6`} alt={name} className="h-28 w-28 rounded-[2rem] object-cover" />
          <div className="flex-1 space-y-4">
            <input className="input-primary" placeholder="Full name" value={name} onChange={(event) => setName(event.target.value)} />
            <input className="input-primary" type="file" accept="image/*" onChange={handleAvatar} />
            <p className="text-sm text-slate-500 dark:text-slate-300">Email: {user?.email}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="btn-primary" onClick={saveProfile}>Save profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
