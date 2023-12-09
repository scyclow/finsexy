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

export const getAgeYears = bd => {
  const ageMs = new Date() - new Date(bd)

  return ageMs / (1000 * 60 * 60 * 24 * 365.25)

}



// TODO handle different wallets
export const defaultProfileLS = profileLS('DEFAULT')

export function getUserData() {
  const profileInfo = defaultProfileLS.get()

  return {
    name: profileInfo.name,
    gender: profileInfo.gender,
    location: profileInfo.location,
    age: getAgeYears(profileInfo.birthday)
  }
}




