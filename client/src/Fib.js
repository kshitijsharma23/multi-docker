import React from 'react';
import axios from 'axios';

class Fib extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seenIndices: [],
            values: {},
            index: ''
        };
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndices();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndices() {
        const seenIndices = await axios.get('/api/values/all');
        this.setState({ seenIndices: seenIndices.data });
    }

    renderSeenIndices() {
        return this.state.seenIndices.map(({ number }) => number).join(', ');
    }

    renderValues() {
        return Object.keys(this.state.values).map((key) => (
            <div key={key}>For index {key}, I calculated {this.state.values[key]}</div>
        ));
    }

    handleInput = (event) => {
        this.setState({ index: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({ index: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter the index: </label>
                    <input
                        value={this.state.index}
                        onChange={this.handleInput}
                    />
                    <button type="submit">Submit</button>
                </form>
                <h3>Indices I've seen: </h3>
                {this.renderSeenIndices()}
                <h3>Calculated values: </h3>
                {this.renderValues()}
            </div>
        );
    }
}

export default Fib;
