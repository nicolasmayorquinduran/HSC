import { hierarchyChannels } from "../interfaces"
import {k} from '../constants'

const u = 255

export const getHierarchyChanelsFromRGBcompose = (r:number,g:number,b:number):hierarchyChannels =>{

    const result:any = {}
    const channelsRefs = {r,g,b}
    const channels = [r,g,b].sort((a:number,b:number)=> a - b)
    result.r = findHierarchyCase(channels, channelsRefs, 'r')
    result.g = findHierarchyCase(channels, channelsRefs, 'g')
    result.b = findHierarchyCase(channels, channelsRefs, 'b')
    return result
}

const findHierarchyCase = (channels:number[], channelsRefs:any, channel:string):'d' | 'm' | 'n' | 'i' => {
    const maxChannel = channels[2]
    const minChannel = channels[0]

    if(maxChannel === minChannel) return 'i';
    if(channelsRefs[channel] === maxChannel) return 'd';
    if(channelsRefs[channel] === minChannel) return 'n';
    return 'm'
}

interface colorVar {
    hue:string,
    compose:string[]
}

const getColorVar = (HierarchyChannels: hierarchyChannels ):colorVar => {
    if(HierarchyChannels.r === 'i') return { hue:'i',compose:['i']};
    let channelValidator = (type:any[]) => HierarchyChannels.r === type[0] && HierarchyChannels.g === type[1] && HierarchyChannels.b === type[2]
    let channels = [
       { hue:'r',compose:['d','n','n']},
       { hue:'y',compose:['d','d','n']},
       { hue:'g',compose:['n','d','n']},
       { hue:'c',compose:['n','d','d']},
       { hue:'b',compose:['n','n','d']},
       { hue:'m',compose:['d','n','d']},
    ]
    return channels.find((channel:any) => channelValidator(channel.compose))
}

const getClarity = (HierarchyChannels:any) => {
    const colorVar = getColorVar(HierarchyChannels)
    if(HierarchyChannels.r === 'i') return HierarchyChannels.r / u;
    const {d,m,n} = HierarchyChannels
    return -m.value * k[colorVar.hue] - n.value * k[colorVar.hue] + 2 * d * k[colorVar.hue]
}


