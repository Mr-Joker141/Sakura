import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class EditReport extends Component {

    constructor(props){
        super(props);
        this.state={
            name:"",
            nic:"",
            age:"",
            sex:"",
            type:"",
            result:"",
            date:"",
            status:""
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{

        e.preventDefault();
        const id = this.props.match.params.id;

        const {name,nic,age,sex,type,result,date,status} = this.state;

        const data = {
            name:name,
            nic:nic,
            age:age,
            sex:sex,
            type:type,
            result:result,
            date:date,
            status:status
        }

        console.log(data);

        axios.put(`/lab/update/${id}`,data).then((res) =>{
            if(res.data.success){
                //alert("Report Updated Successfully !!")

               Swal.fire(
                  'Updated!',
                  'Report Updated Successfully !!',
                  'success'
                )


                this.setState(
                    {
                        name:"",
                         nic:"",
                         age:"",
                         sex:"",
                        type:"",
                         result:"",
                         date:"",
                        status:""
                    }
                )
            }
        })

    }


    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/lab/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
            name:res.data.lab.name,
            nic:res.data.lab.nic,
            age:res.data.lab.age,
            sex:res.data.lab.sex,
            type:res.data.lab.type,
            result:res.data.lab.result,
            date:res.data.lab.date,
            status:res.data.lab.status
                });

                console.log(this.state.lab);
                
            }
        });
    }
    
    render() {
        return (
            //<div></div>
            <div>

<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />


<link type="text/css" rel="stylesheet" href="../css/labstyle.css" />

            <div id="lab" class="section">
  <div class="section-center">
    <div class="container">
      <div class="row">
        <div class="lab-form">
          <div class="form-header">
            <h1>Update Report</h1>
          </div>
          <form>
         
            <form className="need-validation" noValidate>
              <form className="need-validation" noValidate>
  <div class="mb-3">
    <label for="name" class="form-label">Patient Name</label>
    <input type="text" class="form-control" name="name"
     value={this.state.name} onChange={this.handleInputChange} 

    /> 
  </div>
  <div class="mb-3">
    <label for="nic" class="form-label">NIC</label>
    <input type="text" class="form-control" name="nic"
     value={this.state.nic} onChange={this.handleInputChange} 

    /> 
  </div>

  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="number" class="form-control" name="age"
     value={this.state.age} onChange={this.handleInputChange} 

    /> 
  </div>

<div>Sex</div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="sex" id="male"
  value="Male" onChange={this.handleInputChange}
  checked={this.state.sex==='Male'}
  />
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="sex" id="female" 
  value="Female" onChange={this.handleInputChange}
  checked={this.state.sex==='Female'}
  />
  <label class="form-check-label" for="female">
    Female
  </label>
</div>

  <div class="mb-3">
    <label for="type" class="form-label">Type</label>
    <input type="text" class="form-control" name="type"
     value={this.state.type} onChange={this.handleInputChange} 

    /> 
  </div>

  <div class="mb-3">
    <label for="result" class="form-label">Result</label>
    <input type="text" class="form-control" name="result"
     value={this.state.result} onChange={this.handleInputChange} 

    /> 
  </div>

  <div class="mb-3">
    <label for="date" class="form-label">Date</label>
    <input type="date" class="form-control" name="date"
     value={this.state.date} onChange={this.handleInputChange} 

    />
  </div>

  <div>Status</div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="status" id="good"
   value="Good" onChange={this.handleInputChange}
   checked={this.state.status==='Good'}
  />
  <label class="form-check-label" for="good">
    Good
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="status" id="bad" 
  value="Bad" onChange={this.handleInputChange}
  checked={this.state.status==='Bad'}
  />
  <label class="form-check-label" for="bad">
    Bad
  </label>
</div>

<div>
<button className="submit-btn" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
    <i className="far fa-check-squar"></i>
    &nbsp; Update
</button>
</div>
</form> 
</form>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>              
 </div>
        );
    }
}