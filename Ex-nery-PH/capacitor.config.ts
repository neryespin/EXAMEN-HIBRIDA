import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.publicacionesdepeoresnada',
  appName: 'publicacionesdepeoresnada',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },

  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
