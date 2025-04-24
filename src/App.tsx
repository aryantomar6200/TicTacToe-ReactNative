import { SafeAreaView, StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Snackbar from 'react-native-snackbar'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icons from './components/Icons';

export default function App() {

  const [isCross, setIsCross] = useState<boolean>(false)
  const [gameWinner, setGameWinner] = useState<string>('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty',0,9))
  const [gameXwon, setGameXwon] = useState(0)
  const [gameOwon, setGameOwon] = useState(0)
  const [gameDraw, setGameDraw] = useState(0)

  const gameReload = () => {
    setGameState(new Array(9).fill('empty',0,9))
    setGameWinner('')
    setIsCross(false)
    setGameDraw(0)
    setGameXwon(0)
    setGameOwon(0)
  }


  const continuePlay = () => {
    setGameState(new Array(9).fill('empty',0,9))
    setGameWinner('')
    setIsCross(false)
  }


  const checkGameWinner = () => {
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won`);
      if (gameState[0] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[3] === gameState[4] &&
      gameState[3] === gameState[5] &&
      gameState[3] !== 'empty'
    ) {
      setGameWinner(`${gameState[3]} won`);
      if (gameState[3] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[6] === gameState[7] &&
      gameState[6] === gameState[8] &&
      gameState[6] !== 'empty'
    ) {
      setGameWinner(`${gameState[6]} won`);
      if (gameState[6] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[0] === gameState[3] &&
      gameState[0] === gameState[6] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won`);
      if (gameState[0] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[1] === gameState[4] &&
      gameState[1] === gameState[7] &&
      gameState[1] !== 'empty'
    ) {
      setGameWinner(`${gameState[1]} won`);
      if (gameState[1] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[2] === gameState[5] &&
      gameState[2] === gameState[8] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won`);
      if (gameState[2] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[0] === gameState[4] &&
      gameState[0] === gameState[8] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won`);
      if (gameState[0] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (
      gameState[2] === gameState[4] &&
      gameState[2] === gameState[6] &&
      gameState[2] !== 'empty'
    ) {
      setGameWinner(`${gameState[2]} won`);
      if (gameState[2] === 'cross') {
        setGameXwon(gameXwon + 1);
      } else {
        setGameOwon(gameOwon + 1);
      }
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draws');
      setGameDraw(gameDraw + 1);
    }
  }


  const changeItem = (itemNumber: number) => {

    if(gameWinner != ''){
      return Snackbar.show({
        text: gameWinner,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#b33939',
        textColor: '#f5f6fa'
      })
    }

    if(gameState[itemNumber] == 'empty'){
      gameState[itemNumber] = isCross ? 'cross' : 'circle'
      setIsCross(!isCross)
    }else{
      return Snackbar.show({
        text: 'Already filled',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#b33939',
        textColor: '#f5f6fa',
        
      })
    }

    checkGameWinner()
  
  }


  return (
    <SafeAreaView>
      <View style= {{backgroundColor: 'white', width: '100%', height: '100%'}}>

        <View style = {styles.headercontainer}>
          <View style = {styles.iconcontainer}>

            <Icon name='circle-o' size={29}  color= '#00cec9' />
            <Text style={[styles.iconTxt, styles.Xcolortxt]}>{gameOwon} Wins</Text>

          </View>
          <View style = {[styles.iconcontainer, {paddingLeft: 6}]}>

            <Icon name='close' size={30} color='#0097e6'/>
            <Text style={[styles.iconTxt, styles.Ocolortxt]}>{gameXwon} Wins</Text>

          </View>
          <View style = {[styles.iconcontainer, styles.drawcontainer]}>

            <Icon name='balance-scale' size={23} color='#353b48'/>
            <Text style={[styles.iconTxt, styles.drawcolortxt]}>{gameDraw} Draws</Text>

          </View>
        </View>

        {gameWinner ? (
          <View style = {styles.gamewoncontainer}>
            <Text style= {styles.gamewinnerTxt}>{gameWinner} the Game</Text>
          </View>
        ) : null
        }

        <View style = {styles.boardcontainer}>
          <FlatList 
              style = {styles.board}
              numColumns={3}
              data={gameState}
              renderItem={({item, index}) => {

                const isLastColumn = (index+1)%3 === 0 
                const isLastRow = index >= 6
                return(
                  (
                    <Pressable
                      
                      key={index}
                      style = {[styles.boardbuttons , isLastColumn && { borderRightWidth: 0 },
                        isLastRow && { borderBottomWidth: 0 }]}
                      onPress={() => changeItem(index)}
                    >
                      <Icons name={item}/>
                    </Pressable>
                  )
                )
              }}
            />

          
        </View>

        <View>
          <View  style= {styles.chancetracker}>
            <View style= {[
              styles.turn,  
              isCross ? styles.crossselected : null
              ]}>
              {isCross ? <Icon name='close' size={30} color='#ffffff' /> : <Icon name='close' size={30} color='#0097e6' />}
            </View>
            
            <View  style= {[styles.turn, !isCross ? styles.circleselected : null]}>
              {!isCross ? <Icon name='circle-o' size={29}  color= '#ffffff'/>: <Icon name='circle-o' size={29}  color= '#00cec9'/>}
            </View>
            
          </View>
        </View>

        <View style = {styles.Btncontainer}>
          <Pressable
            onPress={continuePlay}
            style = {styles.continueBtn}
          >
            <Text style = {styles.BtnTxt1}>Continue Play...</Text>
          </Pressable>

          <Pressable
            style = {styles.ResetBtn}
            onPress={gameReload}
          >
            <Text style = {styles.BtnTxt2}>Reset Game</Text>
          </Pressable>
        </View>


      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  headercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 70,
  },
  iconcontainer: {
    alignItems: 'center',
    gap: 4,
  },
  iconTxt: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  Xcolortxt: {
    color: '#00cec9',
  },
  Ocolortxt: {
    color: '#0097e6',
    marginBottom: 2,
  },
  drawcolortxt: {
    color: '#353b48',
  },

  drawcontainer: {
    marginTop: 7,
    alignItems: 'center'
  },


  gamewoncontainer: {
    backgroundColor: '#353b48',
    marginTop: 35,
    height: 65,
    width: 300,
    alignSelf: 'center',
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  gamewinnerTxt: {
    fontSize: 20,
    fontWeight: 600,
    color: '#fff'
  },



  boardcontainer:{
    marginTop: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },

  board: {
   padding: 40,
   marginTop: 20

  },

  boardbuttons: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderRightWidth:1,
    borderRightColor: '#dcdde1',
    borderBottomWidth: 1,
    borderBottomColor: '#dcdde1',
    

  },

  chancetracker: {
    marginTop: 30,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#eee',    // pill background
    overflow: 'hidden',
    alignSelf: 'center'
  },

  turn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossselected: {
    backgroundColor: '#0097e6',
    borderRadius: 50
  },
  circleselected: {
    backgroundColor: '#00cec9',
    borderRadius: 50
  },

  Btncontainer: {
    
    marginTop: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 15,
    padding: 20
  },

  continueBtn:{
    backgroundColor: '#353b48',
    height: 60,
    width: 150,
    paddingHorizontal: 21,
    paddingVertical: 17,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ResetBtn: {
    backgroundColor: '#f1f2f6',
    height: 60,
    width: 150,
    paddingHorizontal: 21,
    paddingVertical: 17,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  BtnTxt1: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 600
  },

  BtnTxt2: {
    fontSize: 17,
    color: '#353b48',
    fontWeight: 800
  }
  

})