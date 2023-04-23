import TeamComparison from './TeamComparison';
import Divider from '@mui/material/Divider';
import Carousel from 'react-material-ui-carousel'; // see:https://github.com/Learus/react-material-ui-carousel/blob/master/README.md
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import {useState, useEffect} from 'react';


export default function ConfGroupings(props) {

      const [emptyDetails, setEmptyDetails] = useState(false)

      useEffect( () => {
      console.log(`${props.groupVal} line details length: ${props.lineDetails.length}`)
      if (props.lineDetails.length == 0) {
      setEmptyDetails(true)
        }
      }, [props])

      console.log("running match Pairing")
      const sliderItems: number = props.lineDetails.length > 4 ? 4 : props.lineDetails.length;
      const matchups: Array<any> = [];

      for (let i = 0; i < props.lineDetails.length; i += sliderItems) {
        if (i % sliderItems === 0) {
        console.log(`item ${i} out of ${props.lineDetails.length}`)
          matchups.push(
             <Grid container
                      spacing={2}
                      direction="row"
                      style={{
                        justifyContent: 'center',
                        minHeight: 600,
                        maxHeight: 700
                       }}
                        >
                {props.lineDetails.slice(i, i + sliderItems).map((line) => {
                  return(<Grid item xs={3.5}>
                            <TeamComparison lineDetails = {line} />
                        </Grid>);
                })}
              </Grid>
          );
            }
          }

    return(
        <div>
            {!emptyDetails &&
             <div className="conferenceGroup">
                <header className="App-header">
                 <Divider variant='middle' orientation="horizontal" flexItem sx={{color: 'grey.200', bgcolor: '#336699'}}>
                    <h1> {props.groupVal} Conference Matchups </h1>
                 </Divider>
                 </header>
                        <Carousel
                            autoPlay
                            navButtonsAlwaysVisible
                            interval={8000}
                            duration={1000}
                            cycleNavigation={true}
                            >
                              {matchups}
                        </Carousel>
             </div>
             }
        </div>
    )
}