const m = module as
    | undefined
    | {
          hot?: {
              accept: () => void
          }
      }

if (typeof m?.hot !== 'undefined') {
    m.hot.accept()
}

const headline = document.createElement('h1')
headline.innerText = 'Wuhuuu!!!!'

document.body.appendChild(headline)
