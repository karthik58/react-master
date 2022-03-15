import logo from './logo.svg';
import './App.css';

import { Component } from 'react';

import CardList from './components/card-list/card-list.component'
import SearchBox from './components/searchbox/search-box.component';

class App extends Component {

  constructor(){
    super();
    this.state = {
      monsters: [],
      searchFiled: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response)=> response.json())
    .then((users)=> this.setState(()=>{
      return {monsters: users}
    }
    ))
  }

  onSearchChange = (event)=>{
    const searchFiled = event.target.value.toLocaleLowerCase();

    this.setState(
      ()=>{
        return { searchFiled }
      }
    )

  }

  render() {
    //console.log('appjs render')
    const {monsters, searchFiled} = this.state;
    const { onSearchChange } = this;

    const filterMonster = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchFiled);
    });

    return (
      <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
       <SearchBox  onChangeHandler={onSearchChange} placeholder='search monsters' className='monsters-search-box'/>
       <CardList monsters={filterMonster} />
      </div>
    );
  }


}

export default App;
