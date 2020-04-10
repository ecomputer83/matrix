import React from "react";
import { StyleSheet, ScrollView, Dimensions, Picker, FlatList} from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import { white } from "color-name";
import {Card, Icon } from "../components";
import {prod, Article, nowTheme} from "../constants";
import ModalSelector from 'react-native-modal-selector';

const { width, height } = Dimensions.get("screen");
const ratio = width / height;
class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      DailyPrices: prod.DailyPrices,
      Articles: Article,
      depot: prod.Depots[0],
      depotX: prod.Depots.map((d, i) => {
        return { key: i, label: d.Name}
      })
    }
    
  }

  pickerDepot(index){
    prod.Depots.map( (v,i)=>{
     if( index === i ){
       this.setState({
       depot: prod.Depots[index]
      })
     }
    })

  }

  loadPrices = () => {
    return this.state.DailyPrices.map((s,i) => {
        return (<Block style={{paddingTop: 10,
          paddingBottom: 10, paddingRight: 35,
          paddingLeft: 15, margin: 5, backgroundColor: "#ffffff"}}>
          <Text
                style={{
                  color: nowTheme.COLORS.BLACK,
                  fontSize: 14,
                  fontFamily: 'HKGrotesk-Light',
                  lineHeight: 20,
                  paddingBottom:5
                }}
              >
                {s.Product}
                  </Text>
          <Text
                style={{
                  color: nowTheme.COLORS.BLACK,
                  fontSize: 18,
                  fontFamily: 'HKGrotesk-Bold',
                  lineHeight: 26,
                  paddingBottom:5
                }}
              >
                ₦{s.Price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                  </Text>
        </Block>)
    })
  }


  renderPrices = () => {
    return ( <Block>
    <ScrollView horizontal={true}>
      {this.loadPrices()}
    </ScrollView>
    </Block>)
  }
  renderArticles = () => {
    return (
      <Block>
        <Block style={{ margin: 10 }}>
        <Text style={{ fontFamily: 'HKGrotesk-SemiBold', fontSize: 14 }} color={theme.COLORS.DEFAULT}>
            NEWS HIGHLIGHTS
        </Text>
        </Block>
        <FlatList data={this.state.Articles} keyExtractor={(item, index )=> index.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
          return <Card item={item} horizontal />
        }}/></Block>
    )
  }
  componentDidMount(){
  }

  render() {
    return (<Block style={{backgroundColor: nowTheme.COLORS.WHITE}}>
      <Block row space="between" style={{padding: 10}}>
      <Block>
        <Text style={{ fontFamily: 'HKGrotesk-Light', fontSize: 14 }} color={theme.COLORS.DEFAULT}>
        TODAY'S PRICES
        </Text>
      </Block>
      <Block row>
      <ModalSelector
          data={this.state.depotX}
          initValue={this.state.depot.Name}
          selectStyle={styles.picker}
          selectTextStyle={styles.selectTextStyle}
          initValueTextStyle={styles.initvalueTextStyle}
          onChange={(itemValue) => this.pickerDepot(itemValue.key)} />
        <Icon
              name={'chevron-down'}
              family="octicon"
              size={14}
              color={nowTheme.COLORS.ICON}
            />
      </Block>
      </Block>
      {this.renderPrices()}
      {this.renderArticles()}
    </Block>);
  }
}

const styles = StyleSheet.create({
  loginbutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5,
    marginLeft: 5
  },

  registerbutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  picker: {
    borderWidth: 0,
    height: 23,
    width: 100,
    padding: 0
  },
  selectTextStyle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    color: nowTheme.COLORS.PRIMARY,
    textTransform: 'uppercase', 
  },
  initvalueTextStyle: {
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    color: nowTheme.COLORS.PRIMARY,
    textTransform: 'uppercase', 
  },
  selectBox: {
    width: 122,
    height: 23,
    color: nowTheme.COLORS.PRIMARY,
    textTransform: 'uppercase',
    fontFamily: 'HKGrotesk-Bold',
    fontSize: 14,
    lineHeight: 16,
    padding: 0
  }
});

export default Home;
