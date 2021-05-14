const m = module as any

if (typeof m?.hot !== 'undefined') {
    m.hot.accept()
}

debugger

const headline = document.createElement('h1')
headline.innerText = 'Wuhuuu!'

document.body.appendChild(headline)
