let element = document.createElement('div')
element.setAttribute('id', 'transform')
let style = {
    position: 'absolute',
    top: "0",
    bottom: '0',
    width: '100%',
    background: 'rgba(255,255,255,0.7)',
    'z-index': '9999',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
}
let img = document.createElement('img')
img.setAttribute('src', '/static/image/loading.png')
element.addEventListener('click',(event)=>{
    event.stopPropagation()
},true)
let timer
function transform (fn, time) {
    let deg = 0
    timer = setInterval(() => {
        deg = deg > 360 ? 60 : (deg + 30)
        fn(deg)
    }, time)
}
//console.log(timer)
const directive = {
    name: 'loading',
    method (el, binding) {
        //console.log(el,binding)
        if (binding.value) {
            img.style.width = el.clientHeight / 2 + 'px'
            img.style[ 'min-width' ] = '20px'
            img.style[ 'max-width' ] = '30px'
            element.appendChild(img)

            el.style.position = "relative"
            for (let key in style) {
                // eslint-disable-next-line no-prototype-builtins
                if (!style.hasOwnProperty(key)) continue
                element.style[ key ] = style[ key ]
            }
            transform((deg) => {
                img.style.transform = `rotate(${deg}deg)`
            }, 50)
            el.appendChild(element)
        } else {
            timer && clearInterval(timer)
            el.children.forEach(node=>{
                node.getAttribute('id') === 'transform' && el.removeChild(element)
            })
        }
    }
}
export default {
    install (app) {
        app.directive(directive.name, {
            beforeUpdate: directive.method,
            mounted: directive.method
        })
    }
}
