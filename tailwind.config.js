/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#3294F8',
        base: {
          title: '#E7EDF4',
          subtitle: '#E7EDF4',
          text: '#AFC2D4',
          span: '#7B96B2',
          label: '#3A536B',
          border: '#1C2F41',
          post: '#112131',
          profile: '#0B1B2B',
          background: '#071422',
          input: '#040F1A',
        },
      },
      fontFamily: {
        default: 'Nunito',
      },
      lineHeight: {
        default: '160%',
      },
      backgroundImage: {
        'header-cover': 'url(cover.svg)',
      },
      aspectRatio: {
        'cover-img': '1440 / 296',
      },
    },
  },
  plugins: [],
}
