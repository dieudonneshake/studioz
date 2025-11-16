
import { notFound } from 'next/navigation';
import { getShortById, getUploader } from '@/lib/shorts-data';
import { ShortsPlayer } from '@/components/shorts/shorts-player';
import { users } from '@/lib/data';

export default function ShortsWatchPage({ params }: { params: { id: string } }) {
  const short = getShortById(params.id);
  
  if (!short) {
    notFound();
  }

  const uploader = getUploader(short.uploaderId, users);

  if (!uploader) {
      notFound();
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black overflow-hidden">
      <div className="relative w-full h-full max-w-[400px] max-h-[800px] rounded-2xl overflow-hidden">
        <ShortsPlayer short={short} uploader={uploader} />
      </div>
    </div>
  );
}
