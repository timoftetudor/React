import React from 'react';
import App from '../App';

let data = [
    { make: "Volkswagen", models: ["Golf", "Passat", "Polo", "Tiguan"] },
    { make: "Skoda", models: ["Fabia", "Octavia", "Superb"] },
    { make: "Audi", models: ["A1", "A3", "A5", "Q3", "Q5"] }
];

const ModelLink = ({ models, make, handleMake, handleChecked, isDisplay, checked }) => {

    const modelList = isDisplay ? models.map((m, i) => <div key={i}>{m}</div>) : "";

    return (
        <div className="makeModel">
            <h3 to="/" className="make" name={make} onClick={handleMake}>{make}</h3>
            <div className="models" >
                {modelList}
                { isDisplay ? <input type="checkbox" onClick={handleChecked} defaultChecked={checked}></input> : null }
            </div>
        </div>
    )
}

export default class makeModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMake: null,
            isChecked: false
        }
        this.handleChecked = this.handleChecked.bind(this);
    }

    handleMake(event, name) {
        event.preventDefault();

        const nextMake = this.state.selectedMake !== name ? name : null;

        this.setState({ selectedMake: nextMake });
    }

    handleChecked(event) {
        event.preventDefault();
        this.setState({ isChecked: !this.state.isChecked });
        console.log(this.state);
    }

    render() {
        const { selectedMake } = this.state;
        return (
            <div>
                <App />
                {data.map((car, i) => {
                    return (
                        <div className="CarMake">
                            <input type="checkbox" onChange={ this.handleChecked }></input>
                            <ModelLink key={i}
                                models={car.models}
                                make={car.make}
                                isDisplay={car.make === selectedMake}
                                handleMake={(e) => this.handleMake(e, car.make)}
                                handleChecked={(e) => this.handleChecked(e)}
                                checked={this.state.isChecked}
                            />
                        </div>
                    )
                })}
            </div>
        );
    }
}