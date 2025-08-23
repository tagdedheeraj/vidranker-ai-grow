
import RawTextResponse from './RawTextResponse';

const APP_ADS_CONTENT = `google.com, pub-2211398170597117, DIRECT, f08c47fec0942fa0`;

const AppAdsText = () => {
  return (
    <RawTextResponse 
      content={APP_ADS_CONTENT}
      contentType="text/plain"
    />
  );
};

export default AppAdsText;
