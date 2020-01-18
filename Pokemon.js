const prev = document.querySelector (".prev")
const nextt = document.querySelector(".next")
const display = document.querySelector(".display")

document.querySelector('.back').onclick = () => {
    fetch('https://pokeapi.co/api/v2/pokemon/').then(r => r.json()).then(render)
}  

let previous       
prev.onclick = () => {
    if(previous == null) return
    fetch(previous).then(r => r.json()).then(render)

}

let next
nextt.onclick = () => {
    if(next == null) return
    fetch(next).then(r => r.json()).then(render)
    
}

const render = (data) => {

    let currentPage = data
    let current = data.results
    previous = data.previous
    next = data.next
    console.log(next)
    display.innerHTML = current.reduce((acc,e) => {
        return acc + `
            <div class="eachPoke">
            <div class ='pokemonImage'>
            </div>
            <h2>${e.name}</h2>
            </div>
        `
    }, '')

    const pokeImages = display.querySelectorAll('.pokemonImage')
    pokeImages.forEach((eachImg,i) => {
        fetch(current[i].url).then(r => r.json()).then((imgData) => {
           
          
            eachImg.innerHTML = `
            <img src=${imgData.sprites.front_default}>
            `
            const dataKeys = Object.keys(imgData).filter((e,i) => {   
                return Number.isInteger(imgData[e])
            })

            const spritKeys = Object.keys(imgData.sprites)

            eachImg.onclick = () => {

                
                display.innerHTML = `
                <div class = "eachpoke">
                <h1>${current[i].name}</h1>
                <hr>
                <div class = "info">
                </div>
                <div class= "images"></div>
                <button class="backButton">Go Back</button>
                </div>
                
                `
                const info = display.querySelectorAll('.info')
                info.forEach((f, index) => {
                    f.innerHTML = dataKeys.reduce((acc,key, index) => {
                        return acc + `
                        <div class="informations">
                        <h2> ${key}: ${imgData[key]} </h2>
                        </div>
                        `
                    }, " ")
                })

                display.querySelector('.backButton').onclick = () => {
                    render(currentPage)
                }


                const images = display.querySelectorAll('.images')
                images.forEach((g,index) => {

                    g.innerHTML = spritKeys.reduce((acc, key, index) => {
                        return acc + `
                        <div class = "pokeSprites">
                        <img src = ${imgData.sprites[key]}>
                        <h1>${key}</h1>
                        </div>
                    `
                    }, '')
                   
                })

            }
            
            

        })

        
    })
}

fetch('https://pokeapi.co/api/v2/pokemon/').then(r => r.json()).then(render)
