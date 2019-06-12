import React ,{Component} from 'react';
import CardList from '../Components/CardList';
//import {robots} from './robots';
import SearchBox from '../Components/SearchBox';
import './App.css' ;
import Scroll from '../Components/Scroll';


class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    onSearchChange =(event)=>{
        this.setState({searchField: event.target.value});
        
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>{
            return response.json();//convert feedback to json
        }).then(users =>{
            this.setState({robots:users});
        });
        
    }
    render(){
        const { robots, searchField} = this.state
        const filteredRobots = robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })

        if(robots.length===0){
            return <h1>Loading...</h1>
        }
        else{
            return(
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots = {filteredRobots}/>
                    </Scroll>
                    
                </div>
                
            );
        }
        
    }

}

export default App;