import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import { PropsWithChildren } from 'react';

type Iconprops = PropsWithChildren<{
  name: string;
}>


const Icons = ({name}: Iconprops) => {
  
  switch(name) {
    case 'circle':
      return <Icon name="circle-o" size={58} color="#00cec9" />
      break;

    case 'cross':
      return <Icon name="close" size={58} color="#0097e6" />
      break;

      default:
        return null
      
  }
}

const styles = StyleSheet.create({})

export default Icons