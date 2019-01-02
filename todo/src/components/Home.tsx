import React, { Component } from 'react';
import itemsData from '../items.json';

interface Items {
    items: {
    "id": string,
    "name": string,
    "isComplete": boolean
    }[]
    
}
class Home  extends Component<{}, Items> {
  
  constructor (props: any) {
    super(props);
    this.state = {
      items: itemsData.items
    };
    
  }

    render() {
      return (
          <section className="itemsSection">
            <span>Add a list</span>
            <div className="ItemsContainer">
                <ul className="itemsList">
                {
                    this.state.items.map( (item) => {
                        return <li>{item.name}<span>x</span></li>
                    })
                } 
                </ul>
            </div>
          </section>
        
      );
    }
  }
  
  export default Home;