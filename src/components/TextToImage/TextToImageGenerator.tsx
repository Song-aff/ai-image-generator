import React, { useState } from 'react';
import { Card, Row, Col, Spin, Image } from 'antd';
import TerminalInput from '../common/TerminalInput';
import RetroButton from '../common/RetroButton';
import RetroFrame from '../common/RetroFrame';
import { fetchOpenAIImageGeneration } from '../../utils/api';

const TextToImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const imageUrl = await fetchOpenAIImageGeneration(prompt);
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className="crt-effect w-full"
      bordered={false}
      title={
        <div className="flex items-center">
          <span className="font-[var(--font-retro)] text-[var(--color-accent-blue)]">
            {'> 文本到图像生成器'}
          </span>
        </div>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <TerminalInput
            value={prompt}
            onChange={setPrompt}
            title="Prompt Editor"
            placeholder={`// 在此输入您的提示...\n// 示例: 具有霓虹灯和飞行汽车的赛博朋克城市景观\n// 使用描述性语言以获得更好的结果`}
            rows={8}
          />
          <div className="flex justify-end mt-4">
            <RetroButton
              onClick={handleGenerate}
              isLoading={isGenerating}
              type="primary"
            >
              {isGenerating ? '生成中...' : '> 执行生成'}
            </RetroButton>
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <RetroFrame title="Generated Output" className="h-full">
            {isGenerating ? (
              <div className="flex items-center justify-center h-64">
                <Spin
                  tip="初始化AI模型..."
                  className="text-[var(--color-accent-blue)]"
                />
              </div>
            ) : generatedImage ? (
              <div className="flex flex-col items-center">
                <Image
                  src={generatedImage}
                  alt="Generated"
                  className="max-w-full max-h-80 object-contain mb-4"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-[var(--color-text-secondary)]">
                <p className="text-center font-[var(--font-mono)]">
                  {'> 尚未生成图像'}
                  <br />
                  {'> 输入您的提示并点击“执行生成”'}
                </p>
              </div>
            )}
          </RetroFrame>
        </Col>
      </Row>
    </Card>
  );
};

export default TextToImageGenerator;
