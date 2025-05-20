import React, { useState } from 'react';
import { Upload, message, Image } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { UploadCloud } from 'lucide-react';

interface FloppyUploadProps {
  onImageSelected: (image: File | null) => void;
  label?: string;
}

const FloppyUpload: React.FC<FloppyUploadProps> = ({
  onImageSelected,
  label = 'Upload Image',
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }

    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('Image must be smaller than 10MB!');
    }

    return false;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status !== 'uploading') {
      const reader = new FileReader();
      reader.readAsDataURL(info.file as unknown as File);
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setImageUrl(imageDataUrl);
        onImageSelected(info.file as unknown as File);
      };
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Upload
        name="avatar"
        listType="picture-card"
        className="floppy-upload-wrapper"
        // showUploadList={true}
        beforeUpload={beforeUpload}
        maxCount={1}
        onRemove={() => {
          setImageUrl(null);
          onImageSelected(null);
        }}
        onPreview={() => {
          setPreviewOpen(true);
        }}
        onChange={handleChange}
      >
        {imageUrl ? null : (
          <div className="floppy-upload flex flex-col items-center justify-center ">
            <>
              <UploadCloud
                size={32}
                className="text-[var(--color-accent-blue)] mb-2"
              />
              <span className="text-[var(--color-text-primary)] text-sm font-[var(--font-mono)]">
                {label}
              </span>
            </>
          </div>
        )}
      </Upload>
      {imageUrl && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={imageUrl}
        />
      )}
    </div>
  );
};

export default FloppyUpload;
