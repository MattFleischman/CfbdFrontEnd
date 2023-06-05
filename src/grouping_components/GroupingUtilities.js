import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TeamComparison from '../card_components/TeamComparison';

export function applyGroupings(lineDetails) {
    console.log("running matchup groupings")
    console.log(`lineDetails: ${lineDetails}`)
      const sliderItems: number = lineDetails.length > 3 ? 3 : lineDetails.length;
      const matchups: Array<any> = [];
        for (let i = 0; i < lineDetails.length; i += sliderItems) {
                    if (i % sliderItems === 0) {
                    console.log(`item ${i} out of ${lineDetails.length}`)
                      matchups.push(
                         <Grid container
                                  spacing={2.5}
                                  direction="row"
                                  style={{
                                    marginLeft: 2,
                                    justifyContent: 'center',
                                    minHeight: 450,
                                    maxHeight: 700
                                   }}
                                    >
                            {lineDetails.slice(i, i + sliderItems).map((line) => {
                              return(<Grid item xs={3.5}>
                                        <TeamComparison lineDetails = {line} />
                                    </Grid>);
                            })}
                          </Grid>
                      );
                        }
                      }
           return matchups;
        }