import {ls} from '../$.js'
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
  return mapping[getUserData('gender')]
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
    name: profileInfo.name || '${name}',
    gender: profileInfo.gender || 'nb',
    location: profileInfo.location || 'null',
    birthday: profileInfo.birthday || '1970-1-1',
    age: getAgeYears(profileInfo.birthday || '1970-1-1'),
    interested: profileInfo.interested || 'all',
    fantasy: profileInfo.fantasy || 'undefined',
  }

  if (key) return info[key]

  return info
}


