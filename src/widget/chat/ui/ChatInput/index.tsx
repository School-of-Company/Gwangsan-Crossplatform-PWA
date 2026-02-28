import { memo } from 'react';
import { useChatInput } from '../../model/useChatInput';
import { ImagePreview } from '../ImagePreview';

interface ChatInputProps {
  onSendMessage: (content: string | null, imageIds: number[]) => void;
  disabled?: boolean;
}

const ChatInputComponent = ({ onSendMessage, disabled }: ChatInputProps) => {
  const chatInput = useChatInput({
    onSendMessage,
    disabled,
  });

  const isInputDisabled = disabled || chatInput.isSending || chatInput.isUploading;
  const canSelectImage =
    !disabled &&
    !chatInput.isSending &&
    !chatInput.isUploading &&
    chatInput.selectedImages.length < 5;

  return (
    <div className="bg-white">
      <ImagePreview images={chatInput.selectedImages} onRemoveImage={chatInput.removeImage} />

      {/* 숨겨진 파일 input */}
      <input
        ref={chatInput.fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={chatInput.handleFileChange}
      />

      <div className="flex flex-row items-center border-t border-gray-200 px-4 py-4">
        <div className="mr-3 flex min-h-[48px] flex-1 flex-row items-center rounded-full bg-gray-100">
          <input
            value={chatInput.textMessage}
            onChange={(e) => chatInput.updateMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                chatInput.handleSendMessage();
              }
            }}
            placeholder="채팅을 입력해주세요"
            className="min-h-[48px] flex-1 bg-transparent px-4 py-3 text-base text-gray-900 outline-none placeholder:text-gray-400"
            disabled={isInputDisabled}
          />
          <button
            className="mr-3 p-2"
            onClick={chatInput.handleImagePicker}
            disabled={!canSelectImage}>
            {chatInput.isUploading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#8F9094] border-t-transparent" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                  stroke={canSelectImage ? '#8F9094' : '#D1D5DB'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="13" r="4" stroke={canSelectImage ? '#8F9094' : '#D1D5DB'} strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={chatInput.handleSendMessage}
          disabled={!chatInput.canSend}
          className={`h-12 w-12 flex items-center justify-center rounded-full ${
            chatInput.canSend ? 'bg-orange-400' : 'bg-gray-300'
          }`}>
          {chatInput.isSending ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export const ChatInput = memo(ChatInputComponent);
