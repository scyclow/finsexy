import {ls} from '../$.js'
const profileLS = addr => ({
  get() {
    return ls.get('__PROFILE_DATA_' + addr) || {}
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
  return mapping[getUserData().gender || 'nb']
}

export function interestedSwitch(mapping) {
  return mapping[getUserData().interested || 'nb']
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
    name: profileInfo.name,
    gender: profileInfo.gender,
    location: profileInfo.location,
    age: getAgeYears(profileInfo.birthday),
    interested: profileInfo.interested,
    fantasy: profileInfo.fantasy,
  }

  if (key) return info[key]

  return info
}


