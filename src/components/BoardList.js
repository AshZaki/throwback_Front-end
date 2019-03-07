import React, {Component, Fragment} from 'react';
import Board from './Board'

class BoardList extends Component {
    render(){
        console.log(this.props)
        return (
            <div className="flexedList">
                {this.props.allBoard.map(board => 
                     <Board
                        board={board}
                        key={board.id} 
                        handleDeleteBoard={this.props.handleDeleteBoard}
                        editBoard={this.props.editBoard}
                        currentUser={this.props.currentUser}
                     />
                )}
               
            </div>
        
        )
    }
}

export default BoardList;