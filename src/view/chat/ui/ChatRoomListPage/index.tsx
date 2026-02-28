import { Header } from '@/shared/ui/Header';
import { Footer } from '@/shared/ui/Footer';
import { ChatRoomList } from '@/widget/chat';

export default function ChatRoomListPage() {
  return (
    <div className="flex h-full flex-col bg-white">
      <Header headerTitle="채팅" />
      <ChatRoomList />
      <Footer />
    </div>
  );
}
