import React, { Component } from 'react'
import axios from 'axios';
const UserContext = React.createContext();
// Provider, Consumer
const reducer = (state, action) => {
  switch(action.type) {
    case "DELETE_USER":
      return {
        // Making the update in state with ... operator
        ...state,
        // Users update
        users:  state.users.filter(user => action.payload !== user.id)
      }
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case "UPDATE_USER":
    return {
      ...state,
      users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
    }  
  
      
    default: return state
  }
}

export class UserProvider extends Component {
    state = {
        users: [
          
        ],
        dispatch : action => {
          this.setState(state => reducer(state, action))
        }
    }
    // json-server ile yaptığımız get requestteki dataları alıp 
    // setState ile usersı güncelliyoruz
    componentDidMount = async () => {
      const response = await axios.get("http://localhost:3004/users");
      this.setState({
        users: response.data
      })
    }
    
    render() {
        return (
        <UserContext.Provider value = {this.state}>
            {/*App componentını simgeler*/this.props.children}
        </UserContext.Provider>
        )
    }
}

const UserConsumer = UserContext.Consumer;

export default UserConsumer;