import * as cssnano from 'cssnano';
import * as autoprefixer from 'autoprefixer';

export default {
  plugins: [
    autoprefixer,
    cssnano({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
