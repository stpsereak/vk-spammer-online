import random from './random'

// Делает рандомизацию строки по синтаксису 'Привет, [[value1 | value2 | value3]]'
function randomization (text: string): string {
  let result = ''

  for (let i = 0; i < text.length; i++) {
    let paramsStr = ''

    if (text[i] === '[' && text[i + 1] === '[') {
      i++
      while (i < text.length - 1 && text[i] !== ']' && text[i + 1] !== ']') {
        i++
        paramsStr += text[i]
      }
      i += 2
    } else {
      result += text[i]
    }

    const paramsArr = paramsStr.split('|').map(str => str.trim())
    paramsStr = ''
    const randomItem = paramsArr[random(0, paramsArr.length - 1)]
    result += randomItem
  }

  return result
}

export default randomization
