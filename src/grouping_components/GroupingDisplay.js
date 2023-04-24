
import Divider from '@mui/material/Divider';
import { applyGroupings } from './GroupingUtilities'
import Carousel from 'react-material-ui-carousel'; // see:https://github.com/Learus/react-material-ui-carousel/blob/master/README.md
import {useState, useEffect} from 'react';


export default function GroupingDisplay(props) {

      const [emptyDetails, setEmptyDetails] = useState(false)
      const [matchUps, setMatchUps] = useState([])

      useEffect( () => {
      console.log(`${props.groupVal} line details: ${props.lineDetails}`)
      if (props.lineDetails.length == 0) {
      setEmptyDetails(true)
        }
      }, [props]);

      useEffect( () => {
          setMatchUps(applyGroupings(props.lineDetails))
        }, [props]);

    return(
        <div>
            {!emptyDetails &&
             <div className="groupingContainer">
                <header className="App-header">
                 <Divider variant='middle' orientation="horizontal" flexItem sx={{color: 'grey.200', bgcolor: '#336699'}}>
                    <h1> {props.groupVal} Matchups </h1>
                 </Divider>
                 </header>
                        <Carousel
                            autoPlay
                            navButtonsAlwaysVisible
                            interval={8000}
                            duration={1000}
                            cycleNavigation={true}
                            >
                              {matchUps}
                        </Carousel>
             </div>
             }
        </div>
    )
}