/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        // 先锋酸性设计 — 色彩系统 (PRD §2.4)
        abyss: '#0A0A0A',        // 深渊黑
        'abyss-2': '#0D0D0D',
        chrome: {
          DEFAULT: '#C9A84C',     // 液态铬金
          light: '#F5D78E',
          dark: '#8B6914'
        },
        acid: '#00FFD1',         // 酸性青光
        corrode: '#8B5CF6',      // 腐蚀紫
        ash: '#4A4A4A'           // 未选中暗灰
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        acid: '3px' // 极小圆角硬边 (PRD §2.2)
      }
    }
  },
  plugins: []
}
