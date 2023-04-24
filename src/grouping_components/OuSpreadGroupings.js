import TeamComparison from '../card_components/TeamComparison';


export default function OuSpreadGroupings(props) {


    return(
        <div>
                <header className="App-header">
                  <h1> {props.groupVal} Variance Matchups </h1>
                 </header>
                    <div className="outer_card__wrapper">
                        {props.lineDetails.map((line) => (
                            <TeamComparison
                                lineDetails = {line}
                            />))}
                        </div>
        </div>
    )
}