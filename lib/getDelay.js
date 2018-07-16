'use strict'

module.exports = {
  getResult,
  getResultList
}

async function getResult() {
  return await _fakeDelay()
}

async function getResultList() {
  return await _fakeDelay([
    { noshow: 'value', id: 1, name: 'Happy' },
    { noshow: 'value', id: 2, name: 'Lucky' },
    { noshow: 'value', id: 3, name: 'Wealthy' }
  ])
}

async function _fakeDelay(resolveValue = 'timeout') {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ results: resolveValue })
    }, 1500)
  })
}