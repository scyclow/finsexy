import {ls} from '../$.js'
import {provider} from '../eth.js'


export const tributeLS = {
  get(addr, k) {
    const s = (ls.get(`__TRIBUTE_OFFSETS_${addr}`) || {})

    return (k ? s[k] : s) || 0
  },

  set(addr, k, v) {
    const props = this.get(addr) || {}
    props[k] = v
    ls.set(`__TRIBUTE_OFFSETS_${addr}`, JSON.stringify(props))
  },


  async resetTributeAdjustment(dom) {
    const addr = await provider.isConnected()
    const adj = await this.getTribute(dom)
    this.set(addr, dom, adj.toString())
    return adj
  },


  async resetAllTributeAdjustment(cb) {
    const addr = await provider.isConnected()

    const allTributes = await this.getTributes()

    if (cb) cb(allTributes)

    for (let dom of Object.keys(allTributes)) {
      this.set(addr, dom, allTributes[dom].toString())
    }
  },


  async getTributes() {
    const addr = await provider.isConnected()
    const domContracts = await provider.domContracts()

    const allTributes = {}

    for (let dom of Object.keys(domContracts)) {
      allTributes[dom] = (await domContracts[dom].tributes(addr))
    }

    return allTributes
  },

  async getTribute(dom) {
    const addr = await provider.isConnected()
    const domContracts = await provider.domContracts()
    return (await domContracts[dom].tributes(addr))
  },





  async getAdjustedTribute(dom) {
    const addr = await provider.isConnected()
    const domContracts = await provider.domContracts()
    return (await domContracts[dom].tributes(addr)).sub(this.get(addr, dom) || '0')
  },

  async getAdjustedTributes() {
    const addr = await provider.isConnected()
    const domContracts = await provider.domContracts()

    const allTributes = this.get(addr)

    for (let dom of Object.keys(domContracts)) {
      allTributes[dom] = (await domContracts[dom].tributes(addr)).sub(allTributes[dom] || '0')
    }

    return allTributes
  },


  async getAdjustedTributesETH() {
    const allTributes = await this.getAdjustedTributes()

    for (let dom of Object.keys(allTributes)) {
      allTributes[dom] = fromWei(allTributes[dom])
    }

    return allTributes
  },

  async getAdjustedTributeETH(dom) {
    const addr = await provider.isConnected()
    const domContracts = await provider.domContracts()

    return fromWei((await domContracts[dom].tributes(addr)).sub(this.get(addr, dom) || '0'))
  },


  async adjustTributeValue(ctx, amount) {
    const adjusted = ctx.global.premium * amount - await this.getAdjustedTributeETH(ctx.chatName)
    return Math.round(adjusted * 10000) / 10000
  }
}