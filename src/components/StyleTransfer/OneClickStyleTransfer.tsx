import React, { useState } from 'react';
import { Card, Row, Col, Spin, Image } from 'antd';
import {
  Sparkles,
  Zap,
  Palette,
  Brush,
  Layers,
  Wand2,
  Cpu,
  Box,
} from 'lucide-react';
import FloppyUpload from '../common/FloppyUpload';
import RetroButton from '../common/RetroButton';
import StyleToggle from '../common/StyleToggle';
import RetroFrame from '../common/RetroFrame';
import TerminalInput from '../common/TerminalInput';

import { fetchOpenAIImageEdit } from '../../utils/api';

const styleOptions = [
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    icon: <Sparkles size={20} className="text-[var(--color-accent-pink)]" />,
  },
  {
    id: 'vaporwave',
    label: 'Vaporwave',
    icon: <Palette size={20} className="text-[var(--color-accent-blue)]" />,
  },
  {
    id: 'pixelart',
    label: 'Pixel Art',
    icon: <Box size={20} className="text-[var(--color-accent-pink)]" />,
  },
  {
    id: 'synthwave',
    label: 'Synthwave',
    icon: <Zap size={20} className="text-[var(--color-accent-blue)]" />,
  },
  {
    id: 'anime',
    label: 'Anime',
    icon: <Brush size={20} className="text-[var(--color-accent-pink)]" />,
  },
  {
    id: 'steampunk',
    label: 'Steampunk',
    icon: <Cpu size={20} className="text-[var(--color-accent-blue)]" />,
  },
  {
    id: 'matrix',
    label: 'Matrix',
    icon: <Layers size={20} className="text-[var(--color-accent-pink)]" />,
  },
  {
    id: 'ghibli',
    label: 'Ghibli',
    icon: <Wand2 size={20} className="text-[var(--color-accent-blue)]" />,
  },
];

const OneClickStyleTransfer: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>('');
  const handleStyleTransfer = async () => {
    if (!sourceImage || !selectedStyle) return;

    setIsProcessing(true);
    try {
      const result = await fetchOpenAIImageEdit(
        `将当前图像转换为 **${selectedStyle}** 风格`,
        [sourceImage]
      );
      setResultImage(result);
    } catch (error) {
      console.error('Failed to process style transfer:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleEditImage = async () => {
    if (!sourceImage || !editPrompt) return;

    setIsProcessing(true);
    try {
      const result = await fetchOpenAIImageEdit(editPrompt, [sourceImage]);
      setResultImage(result);
    } catch (error) {
      console.error('Failed to process edit image:', error);
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
            {'> 一键风格转换'}
          </span>
        </div>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <RetroFrame title="源图像" className="mb-4">
            <div className="flex justify-center my-4">
              <FloppyUpload
                onImageSelected={setSourceImage}
                label="上传源图像"
              />
            </div>
          </RetroFrame>

          <RetroFrame title="风格选择" className="mb-4">
            <p className="text-[var(--color-text-secondary)] mb-4 font-[var(--font-mono)] text-sm">
              {'> 选择一个风格应用到您的图像'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {styleOptions.map((style) => (
                <StyleToggle
                  key={style.id}
                  id={style.id}
                  label={style.label}
                  icon={style.icon}
                  isSelected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>
          </RetroFrame>

          <div className="flex justify-end mt-4">
            <RetroButton
              onClick={handleStyleTransfer}
              isLoading={isProcessing}
              type="primary"
              className="w-full sm:w-auto"
              disabled={!sourceImage || !selectedStyle}
            >
              {isProcessing ? '处理中...' : '> 应用风格'}
            </RetroButton>
          </div>

          <TerminalInput
            value={editPrompt}
            onChange={setEditPrompt}
            title="文本描述"
            subTitle="按照文本描述修改图像"
            placeholder={`// 在此输入您的提示...\n// 示例:给图中人增加一个帽子`}
            rows={8}
          />
          <div className="flex justify-end mt-4">
            <RetroButton
              onClick={handleEditImage}
              isLoading={isProcessing}
              type="primary"
            >
              {isProcessing ? '生成中...' : '> 按照描述修改'}
            </RetroButton>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <RetroFrame title="风格化输出" className="h-full">
            {isProcessing ? (
              <div className="flex items-center justify-center h-80">
                <Spin tip="应用风格转换中..." />
              </div>
            ) : resultImage ? (
              <div className="flex flex-col items-center">
                <Image
                  src={resultImage}
                  alt="风格化结果"
                  className="max-w-full max-h-80 object-contain mb-4"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-[var(--color-text-secondary)]">
                <p className="text-center font-[var(--font-mono)]">
                  {'> 尚未生成风格化图像'}
                  <br />
                  {'> 上传图像并选择风格'}
                </p>
              </div>
            )}
          </RetroFrame>
        </Col>
      </Row>
    </Card>
  );
};

export default OneClickStyleTransfer;
