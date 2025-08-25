
import RawTextResponse from './RawTextResponse';

const APP_ADS_CONTENT = `google.com, pub-8658337038682012, DIRECT, f08c47fec0942fa0`;

const AppAdsText = () => {
  return (
    <RawTextResponse 
      content={APP_ADS_CONTENT}
      contentType="text/plain"
    />
  );
};

export default AppAdsText;
