import React, {Component, Fragment} from 'react';
import Board from './Board'

class BoardList extends Component {
    render(){
        return (
            <Fragment>
                {this.props.allBoard.map(board => 
                     <Board
                        board={board}
                        key={board.id} 
                        handleDeleteBoard={this.props.handleDeleteBoard}
                     />
                )}
               
            </Fragment>
        
        )
    }
}

export default BoardList;