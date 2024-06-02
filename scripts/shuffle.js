const fs = require('fs')


const dom = 'heatherHot'



function shuffle(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}




const files = fs.readdirSync(`./metadata/${dom}`)

shuffle(files).forEach((filename, i) => {
  console.log(filename, i)

  fs.renameSync(`./metadata/${dom}/${filename}`, `./metadata/${dom}/${i}.png`)
})