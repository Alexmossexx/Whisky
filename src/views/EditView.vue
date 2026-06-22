<script setup>
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store'
import { plants, regionPlants } from '../data/menu'

const route = useRoute()
const router = useRouter()
const original = store.get(route.params.id)

if (!original) router.replace('/admin')

const form = reactive({ ...original, plants: [...(original?.plants || [])] })
const regions = Object.keys(regionPlants)
const allPlants = Object.entries(plants).map(([k, v]) => ({ key: k, ...v }))

function togglePlant(key) {
  const i = form.plants.indexOf(key)
  if (i >= 0) form.plants.splice(i, 1)
  else form.plants.push(key)
}
function save() {
  store.update(original.id, {
    name: form.name,
    cn: form.cn,
    region: form.region,
    cask: form.cask,
    age: form.age,
    abv: form.abv,
    cup: Number(form.cup),
    bottle: Number(form.bottle),
    plants: form.plants
  })
  router.back()
}
function del() {
  store.remove(original.id)
  router.replace('/admin')
}
</script>

<template>
  <div class="page" v-if="original">
    <button class="link-back font-fell" @click="router.back()">← 取消</button>
    <h1 class="title font-title">编辑酒款</h1>

    <div class="field">
      <label class="font-fell">酒款名称 · NAME</label>
      <input v-model="form.name" class="inp font-title" />
    </div>
    <div class="field">
      <label class="font-fell">中文名 · CN</label>
      <input v-model="form.cn" class="inp" />
    </div>

    <div class="two">
      <div class="field">
        <label class="font-fell">杯卖价 ¥/杯</label>
        <input v-model="form.cup" type="number" class="inp price" />
      </div>
      <div class="field">
        <label class="font-fell">瓶卖价 ¥/瓶</label>
        <input v-model="form.bottle" type="number" class="inp price" />
      </div>
    </div>

    <div class="two">
      <div class="field">
        <label class="font-fell">年份 AGE</label>
        <input v-model="form.age" class="inp" />
      </div>
      <div class="field">
        <label class="font-fell">酒精度 ABV%</label>
        <input v-model="form.abv" class="inp" />
      </div>
    </div>

    <div class="field">
      <label class="font-fell">桶型 · CASK</label>
      <input v-model="form.cask" class="inp" />
    </div>

    <div class="field">
      <label class="font-fell">产区 · REGION</label>
      <div class="regions">
        <button
          v-for="r in regions"
          :key="r"
          class="rg"
          :class="{ on: form.region === r }"
          @click="form.region = r"
        >
          {{ r }}
        </button>
      </div>
    </div>

    <div class="field">
      <label class="font-fell">植物元素 · BOTANICAL（留空=按产区自动）</label>
      <div class="plants">
        <button
          v-for="p in allPlants"
          :key="p.key"
          class="pl"
          :class="{ on: form.plants.includes(p.key) }"
          @click="togglePlant(p.key)"
        >
          <span class="pl-cn">{{ p.cn }}</span>
          <span class="pl-latin font-latin">{{ p.latin }}</span>
        </button>
      </div>
    </div>

    <div class="acts">
      <button class="btn moss" @click="save">保存酒款</button>
      <button class="btn-ghost del" @click="del">删除</button>
    </div>
  </div>
</template>

<style scoped>
.link-back {
  background: none;
  border: none;
  color: var(--oak);
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
}
.title {
  font-size: 28px;
  color: var(--oak);
  margin: 0 0 18px;
}
.field { margin-bottom: 16px; }
.field > label {
  display: block;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--slate);
  margin-bottom: 5px;
}
.inp {
  width: 100%;
  background: rgba(255, 252, 240, 0.7);
  border: none;
  border-bottom: 1px solid var(--oak);
  color: var(--ink);
  font-family: 'EB Garamond', serif;
  font-size: 16px;
  padding: 8px 4px;
  outline: none;
}
.inp:focus { border-bottom-color: var(--moss); }
.inp.price { color: #9a6f2e; }
.inp.font-title { font-size: 19px; }
.two {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.regions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.rg {
  border: 1px solid var(--oak);
  background: none;
  color: var(--oak);
  border-radius: 2px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  font-family: 'EB Garamond', serif;
}
.rg.on {
  background: var(--oak);
  color: var(--parchment);
}
.plants {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.pl {
  border: 1px solid var(--dried);
  background: none;
  border-radius: 2px;
  padding: 7px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.pl.on {
  border-color: var(--moss);
  background: rgba(74, 107, 58, 0.1);
}
.pl-cn { font-size: 13px; color: var(--ink); }
.pl-latin { font-size: 12px; color: var(--moss); }
.acts {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}
.acts .btn { flex: 1; }
.del { color: var(--seal-red); border-color: var(--seal-red); }
</style>
