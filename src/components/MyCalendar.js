import React, { Component, Fragment } from 'react';
import InfiniteCalendar, {Calendar, withRange} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { Box, Column,  } from 'gestalt';
import 'gestalt/dist/gestalt.css';

const today = new Date();
const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

class MyCalendar extends Component {

    state = {
        selectedDates: {
            start: today,
            end: today
        }
    }

    onCalendarSelect = (e) => {
        if (e.eventType === 3) {
            // console.log(e)
            // this.setState({ selectedDates: {
            //     start: e.start,
            //     end: e.end,
            //     } 
            //  });
            this.props.datesPicker({
                start: e.start,
                end: e.end,
            })
        }
    }

    
    
    render() {
        let startCalendar;

        startCalendar =
            <InfiniteCalendar
                Component={withRange(Calendar)}
                width={700}
                height={500}
                selected={this.state.selectedDates}
                onSelect={this.onCalendarSelect}
            />

        return (
            <Fragment>
                <Box display="flex" direction="row" paddingY={2}>
                   {startCalendar}
                </Box>
            </Fragment>
        )
    }
}

export default MyCalendar;