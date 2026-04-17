import { Result } from 'antd';
import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'BizFlow ERP'}
      subTitle={translate('BizFlow ERP Application')}
    />
  );
};

export default About;