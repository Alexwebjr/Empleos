import { getEnvVariables } from './getEnvVariables';

export const fileUpload = async (file) => {
  if (!file) throw new Error('There is no file to upload!');

  const { VITE_CLOUD_URL } = getEnvVariables();

  const formData = new FormData();
  formData.append('upload_preset', 'react-empleos');
  formData.append('file', file);

  try {
    const resp = await fetch(VITE_CLOUD_URL, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('Can not upload image');

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
