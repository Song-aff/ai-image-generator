import React from 'react';
import { Card, Form, Select, Row, Col, Divider, Input, message } from 'antd';
import RetroButton from '../components/common/RetroButton';
import RetroFrame from '../components/common/RetroFrame';

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const { apiBase, proxyKey, imageQuality, aiModel } = JSON.parse(
    localStorage.getItem('settings') ||
      JSON.stringify({
        apiBase: 'api.openai-proxy.org',
        proxyKey: '',
        imageQuality: 'low',
        aiModel: 'gpt-image-1',
      })
  );
  console.log(apiBase, proxyKey, imageQuality, aiModel);

  const handleSave = (values: unknown) => {
    console.log('设置已保存:', values);
    localStorage.setItem('settings', JSON.stringify(values));
    message.success("设置已保存");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <Card
      className="crt-effect w-full"
      bordered={false}
      title={
        <div className="flex items-center">
          <span className="font-[var(--font-retro)] text-[var(--color-accent-blue)]">
            {'> 系统设置'}
          </span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          aiModel: aiModel,
          imageQuality: imageQuality,
          apiBase: apiBase,
          proxyKey: proxyKey,
        }}
        onFinish={handleSave}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <RetroFrame title="AI 配置" className="mb-4">
              <Form.Item
                name="aiModel"
                label={
                  <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">
                    AI 模型
                  </span>
                }
              >
                <Select className="w-full">
                  <Select.Option value="gpt-image-1">gpt-image-1</Select.Option>
                  <Select.Option value="dall-e-3">DALL-E 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="imageQuality"
                label={
                  <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">
                    图片质量
                  </span>
                }
              >
                <Select className="w-full">
                  <Select.Option value="low">低（生成更快,便宜）</Select.Option>
                  <Select.Option value="medium">中等</Select.Option>
                  <Select.Option value="high">高（贵）</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="apiBase"
                label={
                  <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">
                    API Base
                  </span>
                }
              >
                <Select className="w-full">
                  <Select.Option value="api.openai-proxy.org">
                    CloseAI(api.openai-proxy.org)
                  </Select.Option>
                  <Select.Option value="api.openai.com">
                    OpenAI(api.openai.com)
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="proxyKey"
                label={
                  <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">
                    代理密钥
                  </span>
                }
              >
                <Input.Password
                  className="w-full"
                  placeholder="请输入代理密钥"
                />
              </Form.Item>

              <Divider className="border-[var(--color-accent-blue)] opacity-30" />

              {/* <Form.Item
                name="saveHistory"
                valuePropName="checked"
                label={
                  <span className="text-[var(--color-text-primary)] font-[var(--font-mono)]">
                    保存生成历史
                  </span>
                }
              >
                <Switch />
              </Form.Item> */}
            </RetroFrame>
          </Col>
        </Row>

        <div className="flex justify-end mt-4">
          <RetroButton onClick={form.submit} type="secondary">
            {'> 保存设置'}
          </RetroButton>
        </div>
      </Form>
    </Card>
  );
};

export default Settings;
