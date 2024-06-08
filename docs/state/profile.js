import {ls} from '../$.js'
import {provider} from '../eth.js'

const profileLS = addr => ({
  get(k) {
    return k
      ? (ls.get('__PROFILE_DATA_' + addr) || {})[k]
      : ls.get('__PROFILE_DATA_' + addr) || {}
  },

  set(k, v) {
    const props = this.get() || {}
    props[k] = v
    ls.set('__PROFILE_DATA_' + addr, JSON.stringify(props))
  },

  setAll(props) {
    ls.set('__PROFILE_DATA_' + addr, JSON.stringify(props))

  }
})

export function genderSwitch(mapping) {
  return mapping[getUserData('gender')] || ''
}

export const getAgeYears = bd => {
  const ageMs = new Date() - new Date(bd)

  return ageMs / (1000 * 60 * 60 * 24 * 365.25)

}



// TODO handle different wallets
export const defaultProfileLS = profileLS('DEFAULT')

export function getUserData(key) {
  const profileInfo = defaultProfileLS.get()

  const info = {
    password: profileInfo.pass || '',
    name: profileInfo.name || provider.ens || '${PAYPIG_NAME}',
    gender: profileInfo.gender || 'nb',
    location: profileInfo.location || 'null',
    birthday: profileInfo.birthday || '1970-1-1',
    age: getAgeYears(profileInfo.birthday || '1970-1-1'),
    interested: profileInfo.interested || 'all',
    fantasy: profileInfo.fantasy || 'undefined',
    tos: profileInfo.tos || false,
  }

  if (key) return info[key]

  return info
}




export const setColor = (c, v) => {
  const r = document.querySelector(':root')
  r.style.setProperty(`--${c}-color`, v)
}

export const saveColor = (c, v) => {
  const overrides = defaultProfileLS.get('colorOverrides') || {}
  overrides[c] = v
  setColor(c, v)
  defaultProfileLS.set('colorOverrides', overrides)
}

export const getColorOverride = c => (defaultProfileLS.get('colorOverrides') || {})[c]

const initialOverrides = defaultProfileLS.get('colorOverrides') || {}

Object.keys(initialOverrides).forEach(c => setColor(c, initialOverrides[c]))