import React, { Component } from 'react';
import axios from 'axios';

export default class PostDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/post/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          post: res.data.post,
        });
        console.log(this.state.post);
      }
    });
  }
  render() {
    const {
      equipmentName,
      supplyCompany,
      stock,
      priceIndollars,
      ageInyears,
      description,
      employeeNIC,
    } = this.state.post;
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>{equipmentName}</h4>
        <hr />
        <d1 className='row'>
          <dt className='col-sm-4'>Supply Comapny</dt>
          <dd className='col-sm-10'>{supplyCompany}</dd>

          <dt className='col-sm-4'>Stock</dt>
          <dd className='col-sm-10'>{stock}</dd>

          <dt className='col-sm-4'>Price In dollars</dt>
          <dd className='col-sm-10'>{priceIndollars}</dd>

          <dt className='col-sm-4'>Age in years</dt>
          <dd className='col-sm-10'>{ageInyears}</dd>

          <dt className='col-sm-4'>Description</dt>
          <dd className='col-sm-10'>{description}</dd>

          <dt className='col-sm-4'>Description</dt>
          <dd className='col-sm-10'>{employeeNIC}</dd>
        </d1>
      </div>
    );
  }
}
