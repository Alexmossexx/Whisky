/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 复古植物图谱色彩系统（PRD 2.3）
        parchment: '#F5EDD6', // 羊皮纸底
        oak: '#5C3D2E', // 深橡木棕
        moss: '#4A6B3A', // 苔藓绿
        amber: '#C4944A', // 琥珀金
        slate: '#7B8B6F', // 石板灰
        dryflower: '#B8937A', // 干花色
        ink: '#2C2416' // 墨水黑
      },
      fontFamily: {
        brand: ['"IM Fell English"', '"Cormorant Garamond"', 'serif'],
        bottle: ['"Cormorant Garamond"', 'serif'],
        botanical: ['"IM Fell DW Pica"', 'serif'],
        body: ['"EB Garamond"', '"Noto Serif SC"', 'serif']
      },
      boxShadow: {
        specimen: '0 2px 8px rgba(92,61,46,0.12)'
      }
    }
  },
  plugins: []
}
