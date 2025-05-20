import React, { useState } from 'react';
import { Card, Row, Col, Spin, Image } from 'antd';
import FloppyUpload from '../common/FloppyUpload';
import RetroButton from '../common/RetroButton';
import RetroFrame from '../common/RetroFrame';
import { fetchOpenAIImageEdit } from '../../utils/api';

const ReferenceStyleTransfer: React.FC = () => {
  const [contentImage, setContentImage] = useState<File | null>(null);
  const [styleImage, setStyleImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleStyleTransfer = async () => {
    if (!contentImage || !styleImage) return;

    setIsProcessing(true);
    try {
      const result = await fetchOpenAIImageEdit(
        `将当前图像1转换为图像2的风格`,
        [contentImage, styleImage]
      );
      setResultImage(result);
    } catch (error) {
      console.error('Failed to process reference style transfer:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card
      className="crt-effect w-full"
      bordered={false}
      title={
        <div className="flex items-center">
          <span className="font-[var(--font-retro)] text-[var(--color-accent-blue)]">
            {'> 参考风格迁移'}
          </span>
        </div>
      }
    >
      <p className="text-[var(--color-text-secondary)] mb-4 font-[var(--font-mono)] text-sm">
        {'> 上传内容图像和风格参考以结合它们'}
      </p>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <RetroFrame title="Content Image" className="h-full">
            <div className="flex justify-center my-4">
              <FloppyUpload
                onImageSelected={setContentImage}
                label="上传内容"
              />
            </div>
          </RetroFrame>
        </Col>

        <Col xs={24} md={8}>
          <RetroFrame title="Style Reference" className="h-full">
            <div className="flex justify-center my-4">
              <FloppyUpload onImageSelected={setStyleImage} label="上传风格" />
            </div>
          </RetroFrame>
        </Col>

        <Col xs={24} md={8}>
          <RetroFrame title="Result" className="h-full">
            {isProcessing ? (
              <div className="flex items-center justify-center h-40">
                <Spin tip="风格迁移中..." />
              </div>
            ) : resultImage ? (
              <div className="flex justify-center">
                <Image
                  src={resultImage}
                  alt="Style transfer result"
                  className="max-w-full max-h-40 object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-[var(--color-text-secondary)]">
                <p className="text-center font-[var(--font-mono)] text-sm">
                  {'> 结果将在此处显示'}
                </p>
              </div>
            )}
          </RetroFrame>
        </Col>
      </Row>

      <div className="flex justify-center mt-6">
        <RetroButton
          onClick={handleStyleTransfer}
          isLoading={isProcessing}
          type="primary"
          className="w-full sm:w-auto"
          disabled={!contentImage || !styleImage}
        >
          {isProcessing ? '处理中...' : '> 开始风格迁移'}
        </RetroButton>
      </div>
    </Card>
  );
};

export default ReferenceStyleTransfer;
