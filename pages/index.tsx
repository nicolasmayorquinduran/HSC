import {useState,} from 'react'
import { getHierarchyChanelsFromRGBcompose } from "../core/functions";
import {ChangeEvent} from 'react'


type canalDominante = {
    [indice in indicesCanalDominanteEnum]:canalInterface | {indice:0}
}


type canales = {
    [tipoCanal in canalesEnum]:canalInterface
}

type jerarquias = {
    [tipoJerarquia in jerarquiasEnum]:canalInterface | canalDominante | null
}

enum indicesCanalDominanteEnum {
    x = 'x',
    y = 'y'
}

enum canalesEnum {
    R = 'R',
    G = 'G',
    B = 'B'
}

enum jerarquiasEnum {
    d ='d',
    m = 'm',
    n = 'n',
    i = 'i'
}

interface canalInterface {
    id:canalesEnum,
    claridadTonal:number,
    alcanceTonal:number,
    indice: 1 | 3 | 5
    niveles:number
}

type canalParamsTuple = [canalInterface[keyof canalInterface]];

// const crearCanal = (canal: canalParamsTuple):canalInterface =>{
//     return canal.reduce((acc, el) => ({...acc, [el]:el}), {} as canalInterface)
// }

// const ejemploCanales: canales = {
//     [canalesEnum.R]: crearCanal([canalesEnum.R,1,1,1,1]),
//     [canalesEnum.G]: crearCanal([1,1,1,1,1]),
//     [canalesEnum.B]: crearCanal([1,1,1,1,1])
// }
// console.log(ejemploCanales);

const canalDominanteEjemplo: canalDominante = {
    x:{
        id:canalesEnum.B,
        claridadTonal:0,
        alcanceTonal:1,
        indice:1,
        niveles:255
    },
    y:{
        indice:0,
    }
}



function Home() {
    console.log(canalDominanteEjemplo);
    
    const u = 255

    const [rgbCompose, setRgbCompose] = useState({
        r:128,
        g:128,
        b:128
    })

    const [hierarchyChannels, setHierarchyChannels] = useState({
        r:'i',
        g:'i',
        b:'i'
    })

    const rgbRange = (e:ChangeEvent<HTMLInputElement>, channel:string) =>{
        Number(e.target.value) > u && (e.target.value = '' + u)
        setRgbCompose({...rgbCompose, [channel]: Number(e.target.value)})
        let copyCompose = {...rgbCompose}
        copyCompose[channel] = Number(e.target.value)
        const {r,g,b} = copyCompose
        setHierarchyChannels(getHierarchyChanelsFromRGBcompose(r,g,b))
        return hierarchyChannels
    }

    return ( 
        <div className='p-8'>
            <div className='flex gap-4'>
            {
                Object.keys(rgbCompose).map((channel:string, index:number)=>(
                    <div key={index}>
                        <h3 >
                            { channel.toUpperCase()}
                        </h3>
                        <input type="range" max={u} value={rgbCompose[channel]}  onChange={(e: ChangeEvent<HTMLInputElement>)=> rgbRange(e, channel)}/>
                        <div className='flex gap-4'>
                            <p >{ hierarchyChannels[channel] ? hierarchyChannels[channel].toUpperCase() + ' =' : ''}</p>
                            <input type="number" max={u} value={rgbCompose[channel]} onChange={(e: ChangeEvent<HTMLInputElement>)=> rgbRange(e, channel)}/>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
     );
}

export default Home;