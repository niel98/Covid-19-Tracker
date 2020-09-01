import React from 'react';

import Cards from './components/Cards/Cards'
import Charts from './components/Charts/Charts'
import CountryPicker from './components/CountryPicker/CountryPicker'
import { getData } from './api/index'
import CovidImage from './images/images.png'

import styles from './App.module.css'

export default class App extends React.Component {

  state = {
    data: {},
    country: ''
  }

  async componentDidMount() {
    const fetchedData = await getData()
    this.setState({
      data: fetchedData
    })
  }

  handleCountryChange = async (country) => {
    const fetchedData = await getData(country)
    console.log(fetchedData)
    this.setState({
      data: fetchedData,
      country: country
    })
  }
  render() {
    const { data, country } = this.state
    return (
      <div className={styles.container}>
        <img
          className={styles.images}
          src={CovidImage}
          alt='covid-19 Tracker'
        />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Charts data={data} country={country} />
      </div>
    );
  }

}
