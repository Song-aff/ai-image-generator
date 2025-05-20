import React, { useState } from 'react';
import { Card, Row, Col, Spin, Image } from 'antd';
// import { Compass } from "lucide-react";
import FloppyUpload from '../common/FloppyUpload';
import RetroButton from '../common/RetroButton';
import RetroFrame from '../common/RetroFrame';
import { fetchOpenAIImageEdit } from '../../utils/api';

const ThreeViewsGenerator: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [frontView, setFrontView] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!sourceImage) return;

    setIsProcessing(true);
    try {
      const views = await fetchOpenAIImageEdit(
        '提取图中的主要人物作为原型，为其生成一个三维Q版玩偶，保留其主要特点，干净的背景，主角站立，生成三视图，正面，侧面，背面。',
        [sourceImage]
      );
      setFrontView(views);
    } catch (error) {
      console.error('Failed to generate three views:', error);
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
            {'> 三视图生成器'}
          </span>
        </div>
      }
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <RetroFrame title="Source Image" className="mb-4">
            <div className="flex justify-center my-4">
              <FloppyUpload onImageSelected={setSourceImage} label="上传对象" />
            </div>
            <div className="flex justify-center mt-4">
              <RetroButton
                onClick={handleGenerate}
                isLoading={isProcessing}
                type="primary"
                disabled={!sourceImage}
              >
                {isProcessing ? '处理中...' : '> 生成视图'}
              </RetroButton>
            </div>
          </RetroFrame>
        </Col>

        <Col xs={24} md={12}>
          {isProcessing ? (
            <RetroFrame
              title="Processing"
              className="h-64 flex items-center justify-center"
            >
              <Spin tip="生成正交视图中..." />
            </RetroFrame>
          ) : frontView ? (
            <div className="grid grid-cols-1 gap-4">
              <RetroFrame title=" View" withGrid={true}>
                <div className="monitor-frame">
                  <Image
                    src={frontView}
                    alt="视图"
                    className="w-full object-contain"
                  />
                </div>
              </RetroFrame>

              {/* <RetroFrame title="Side View (X-Y)" withGrid={true}>
                <div className="monitor-frame">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Compass
                        size={16}
                        className="text-[var(--color-accent-blue)] mr-2"
                      />
                      <span className="text-[var(--color-text-secondary)] text-xs font-[var(--font-mono)]">
                        {"> 平面 X-Y"}
                      </span>
                    </div>
                    <span className="text-[var(--color-accent-pink)] text-xs font-[var(--font-mono)]">
                      {"> 侧"}
                    </span>
                  </div>
                  <img
                    src={sideView}
                    alt="侧视图"
                    className="w-full object-contain"
                  />
                </div>
              </RetroFrame>

              <RetroFrame title="Top View (X-Z)" withGrid={true}>
                <div className="monitor-frame">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Compass
                        size={16}
                        className="text-[var(--color-accent-blue)] mr-2"
                      />
                      <span className="text-[var(--color-text-secondary)] text-xs font-[var(--font-mono)]">
                        {"> 平面 X-Z"}
                      </span>
                    </div>
                    <span className="text-[var(--color-accent-pink)] text-xs font-[var(--font-mono)]">
                      {"> 顶"}
                    </span>
                  </div>
                  <img
                    src={topView}
                    alt="顶视图"
                    className="w-full object-contain"
                  />
                </div>
              </RetroFrame>

              <div className="flex justify-end mt-2">
                <RetroButton
                  onClick={() => {
                    console.log("下载视图");
                  }}
                  type="secondary"
                >
                  下载所有视图
                </RetroButton>
              </div> */}
            </div>
          ) : (
            <RetroFrame
              title="Three Views"
              className="h-64 flex items-center justify-center"
            >
              <p className="text-[var(--color-text-secondary)] text-center font-[var(--font-mono)]">
                {'> 上传图像并点击 "生成视图"'}
                <br />
                {'> AI 将生成前、侧和顶视图'}
              </p>
            </RetroFrame>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default ThreeViewsGenerator;
