const prev = document.querySelector ('.prev')
const nextt = document.querySelector('.next')
const display = document.querySelector('.display')

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
            <h2>${e.name.toUpperCase()}</h2>
            </div>
        `
    }, '')

    const pokeImages = display.querySelectorAll('.pokemonImage')
    pokeImages.forEach((eachImg,i) => {
        fetch(current[i].url).then(r => r.json()).then((imgData) => {
           
          
            eachImg.innerHTML = `
            <img class= "eachImage" src=${imgData.sprites.front_default}>
            `
            const dataKeys = Object.keys(imgData).filter((e,i) => {   
                return Number.isInteger(imgData[e])
            })

            const spritKeys = Object.keys(imgData.sprites)

            eachImg.onclick = () => {

                
                display.innerHTML = `
                
                <div class="pokeProfile">
                <button class="backButton">Go Back</button>
                <br><br><br><br><br>
                <img class = "eachImage" src=${imgData.sprites.front_default}>
                <br>
                <h1>${current[i].name.toUpperCase()}</h1>
                <hr>
                <div class = "info">
                </div>
                <br><br>
                <div class= "images"></div>
                <br><br><br>
                <button class="backButton">Go Back</button>
                </div>
                ` 
                
                const info = display.querySelectorAll('.info')
                info.forEach((f, index) => {
                    f.innerHTML = dataKeys.reduce((acc,key, index) => {
                        
                        let cleankey = key.replace(/_/g, " ");
                        return acc + `
                        <div class="informations">
                        <h2> ${cleankey}: ${imgData[key]} </h2>
                        </div>
                        `
                    }, " ")
                })

                display.querySelectorAll('.backButton').forEach((backButton) =>{
                    backButton.onclick = () => {
                    render(currentPage)
                    }
                })


                const images = display.querySelectorAll('.images')
                images.forEach((g,index) => {

                    g.innerHTML = spritKeys.reduce((acc, key, index) => {
                        
                        if(imgData.sprites[key]){
                            
                            let cleanKey = key.replace(/_/g, " ");
                            return acc +  `
                             <div class = "pokeSprites">
                             <img class = "eachImage" src = ${imgData.sprites[key]}>
                              <h1>${cleanKey}</h1>
                             </div>
                              `
                        }
                        return acc
                        
                      
                    }, '')
                   
                })

            }
            
            

        })

        
    })
}

fetch('https://pokeapi.co/api/v2/pokemon/').then(r => r.json()).then(render)
