import { defineStore } from 'pinia'

const LS = {
  get(key, def) {
    try {
      const v = localStorage.getItem(key)
      return v ? JSON.parse(v) : def
    } catch {
      return def
    }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  }
}

// 我的图鉴（品鉴卡）
export const useCardStore = defineStore('cards', {
  state: () => ({
    cards: LS.get('wa_cards', [])
  }),
  getters: {
    byId: (s) => (id) => s.cards.find((c) => c.id === id)
  },
  actions: {
    add(card) {
      this.cards.unshift(card)
      this.persist()
    },
    remove(id) {
      this.cards = this.cards.filter((c) => c.id !== id)
      this.persist()
    },
    persist() {
      LS.set('wa_cards', this.cards)
    }
  }
})

// 电子酒单（与图鉴同级）
export const useMenuStore = defineStore('menus', {
  state: () => ({
    menus: LS.get('wa_menus', [])
  }),
  getters: {
    byId: (s) => (id) => s.menus.find((m) => m.id === id)
  },
  actions: {
    create({ name, description }) {
      const menu = {
        id: 'menu-' + Date.now(),
        owner_id: 'me',
        name: name || '未命名酒单',
        description: description || '',
        logo_url: '',
        logo_style: '',
        logo_prompt: '',
        bottles: [],
        style_template: 'botanical',
        share_url: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      this.menus.unshift(menu)
      this.persist()
      return menu
    },
    update(id, patch) {
      const m = this.byId(id)
      if (!m) return
      Object.assign(m, patch, { updated_at: new Date().toISOString() })
      this.persist()
    },
    addBottle(id, card, cup_price = 0) {
      const m = this.byId(id)
      if (!m) return
      if (m.bottles.some((b) => b.card_id === card.id)) return
      m.bottles.push({
        card_id: card.id,
        card,
        cup_price,
        sort_order: m.bottles.length,
        status: 'active',
        region: card.region,
        note: ''
      })
      m.updated_at = new Date().toISOString()
      this.persist()
    },
    removeBottle(id, cardId) {
      const m = this.byId(id)
      if (!m) return
      m.bottles = m.bottles.filter((b) => b.card_id !== cardId)
      this.persist()
    },
    reorder(id, bottles) {
      const m = this.byId(id)
      if (!m) return
      m.bottles = bottles.map((b, i) => ({ ...b, sort_order: i }))
      this.persist()
    },
    toggleStatus(id, cardId) {
      const m = this.byId(id)
      const b = m && m.bottles.find((x) => x.card_id === cardId)
      if (b) {
        b.status = b.status === 'active' ? 'off' : 'active'
        this.persist()
      }
    },
    remove(id) {
      this.menus = this.menus.filter((m) => m.id !== id)
      this.persist()
    },
    persist() {
      LS.set('wa_menus', this.menus)
    }
  }
})

// 个人设置 + 订阅
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    profile: LS.get('wa_profile', {
      nickname: '老王',
      bio: '威士忌发烧友 · 兼职卖酒',
      logo_url: '',
      plan: 'free' // free | explore | pro | flagship
    }),
    bgmOn: false
  }),
  actions: {
    update(patch) {
      Object.assign(this.profile, patch)
      LS.set('wa_profile', this.profile)
    },
    toggleBgm() {
      this.bgmOn = !this.bgmOn
    }
  }
})
