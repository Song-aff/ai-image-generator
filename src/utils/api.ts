import { message } from 'antd';

const { apiBase, proxyKey, imageQuality, aiModel } = JSON.parse(
  localStorage.getItem('settings') ||
    JSON.stringify({
      apiBase: 'api.openai-proxy.org',
      proxyKey: '',
      imageQuality: 'low',
      aiModel: 'gpt-image-1',
    })
);

export const base64toImgUrl = (base64: string): string => {
  return `data:image/png;base64,${base64}`;
};

export const fetchOpenAIImageGeneration = async (
  prompt: string,
  model: string = aiModel
): Promise<string> => {
  const response = await fetch(`https://${apiBase}/v1/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${proxyKey}`,
    },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      quality: imageQuality,
      // size: "1536x1024",
      // background: "transparent",
    }),
  });

  if (!response.ok) {
    message.error(`Error: ${response.status} ${response.statusText}`);
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return base64toImgUrl(data.data[0].b64_json);
};

export const fetchOpenAIImageEdit = async (
  prompt: string,
  images: File[],
  model: string = aiModel
): Promise<string> => {
  const formData = new FormData();
  formData.append('model', model);
  formData.append('prompt', `Please edit the image to ${prompt}`);
  formData.append('quality', imageQuality);

  images.forEach((image) => {
    formData.append(`image[]`, image);
  });

  const response = await fetch(`https://${apiBase}/v1/images/edits`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${proxyKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    message.error(`Error: ${response.status} ${response.statusText}`);
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return base64toImgUrl(data.data[0].b64_json);
};
