import React, { Component } from 'react'
import posed from 'react-pose';
import UserConsumer from '../context';
import axios from 'axios';

const Animation = posed.div({
    visible: { opacity: 1, applyAtStart: { display: "block" }},
    hidden: { opacity: 0, applyAtEnd: { display: "none" } }
});

class AddUser extends Component {
    state = {
        visible: false,
        name: "",
        department: "",
        salary: "",
        error: false
    }

    changeVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    validateForm = () => {
        const { name, salary, department } = this.state;
        if (name === "" || salary === "" || department === "") {
            return false;
        }
        return true;
    }

    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    addUser = async (dispatch, e) => {
        e.preventDefault();
        const {name, department, salary} = this.state;
        // New User Object
        const newUser = {
            // json-server will provide id automatically
            
            name: name,
            department: department,
            salary: salary
        }

        // To prevent to submit the form if any field is blank
        if (!this.validateForm()) {
            this.setState({
                error: true
            })
            return;
        }

        // axios post
        const response = await axios.post("http://localhost:3004/users", newUser);
        // Registering User
        dispatch({type: "ADD_USER", payload: response.data});
        // Redirect to home page
        this.props.history.push("/");

    }

    render() {
        const {visible, name, department, salary, error} = this.state;
        return(
            <UserConsumer>
                {
                    value => {
                        const {dispatch} = value;
                        return (
                        <div className = "col-md-8 mb-4">
                            <button onClick = {this.changeVisibility} className="btn btn-dark btn-block mb-2">{visible ? "Hide Form" : "Show Form"}</button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className = "card">
                                    <div className = "card-header">
                                        <h4>Add User Form</h4>
                                    </div>
                                    <div className = "card-body">
                                        {
                                            error ? <div className = "alert alert-danger">
                                                Please check your information
                                            </div>
                                            : null
                                        }
                                        <form onSubmit={this.addUser.bind(this, dispatch)}>
                                            <div className = "form-group">
                                                <label htmlFor = "name">Name</label>
                                                <input type = "text" 
                                                    name = "name"
                                                    id = "id"
                                                    placeholder = "Enter name"
                                                    className = "form-control"
                                                    value = {name}
                                                    onChange = {this.changeInput}
                                                />
                                            </div>
                                            <div className = "form-group">
                                                <label htmlFor = "department">Department</label>
                                                <input type = "text" 
                                                    name = "department"
                                                    id = "department"
                                                    placeholder = "Enter department"
                                                    className = "form-control"
                                                    value = {department}
                                                    onChange = {this.changeInput}
                                                />
                                            </div>
                                            <div className = "form-group">
                                                <label htmlFor = "salary">Salary</label>
                                                <input type = "text" 
                                                    name = "salary"
                                                    id = "salary"
                                                    placeholder = "Enter salary"
                                                    className = "form-control"
                                                    value = {salary}
                                                    onChange = {this.changeInput}
                                                />
                                            </div>
                                            <button className = "btn btn-success btn-block" type = "submit">Add User</button>
                                        </form>
                                    </div>
                                </div>
                            </Animation>
                        </div>
                    )
                }
            }
            </UserConsumer>
        )
    }
}

export default AddUser;