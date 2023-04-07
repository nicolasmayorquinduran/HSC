import {useState,} from 'react'
import { getHierarchyChanelsFromRGBcompose } from "../core/functions";
import {ChangeEvent} from 'react'


function Home() {

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