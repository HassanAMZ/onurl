import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
  CSSResetProps,
} from '@chakra-ui/core';
import { APP_TITLE } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  return {
    title: APP_TITLE,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`,
    },
  };
};

const getCSSResetConfig: CSSResetProps['config'] = (theme, defaultConfig) => {
  const { colors } = theme;
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ...defaultConfig!,
    light: {
      bg: colors.twitter[200],
      borderColor: colors.purple[200],
      color: colors.black[800],
      placeholderColor: colors.purple[200],
    },
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <>
      <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset config={getCSSResetConfig} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;