import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from '../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class User extends Component {
  state = {
    isVisible: false
  }

  onClickEvent = (event) => {
    this.setState({
      isVisible: !this.state.isVisible // if it is false -> true, if it is true -> false
    })
  }

  onDeleteUser = async (dispatch, event) => {
    const {id} = this.props;
    // Delete Request -> db.json
    await axios.delete(`http://localhost:3004/users/${id}`);
    // Consumer Dispatch -> component
    dispatch({type: "DELETE_USER", payload: id});
  }

  componentWillUnmount = () => {
    console.log("componentWillUnmount")
  }
  
  
  render() {
    // Destructing
    const {id, name, department, salary} = this.props;
    const {isVisible} = this.state;
    return (
      <UserConsumer>
        {
          value => {
            const {dispatch} = value;
            return (
              <div className = "col-md-8 mb-4">
                <div className = "card" style = { isVisible ? {backgroundColor : "#62848d", color: "white"} : null}>
                  <div className = "card-header d-flex justify-content-between">
                    <h4 className = "d-inline" style = {{cursor: "pointer"}} onClick = {this.onClickEvent}>{name}</h4>
                    <i className = "far fa-trash-alt" onClick = {this.onDeleteUser.bind(this, dispatch)} style = {{cursor: "pointer"}}></i>
                  </div>
                  {
                    isVisible ? <div className = "card-body">
                      <p className = "card-text">Salary : {salary}</p>
                      <p className = "card-text">Department : {department}</p> 
                      <Link to = {`edit/${id}`} className = "btn btn-dark btn-block">Update User</Link>

                      </div> : null
                  }
                  
                </div>
              </div>
            )
          }
        }
      </UserConsumer>
    )
    
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

User.defaultProps = {
  name: "Bilgi Yok",
  department: "Bilgi Yok",
  salary: "Bilgi Yok",
}