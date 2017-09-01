import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from 'material-ui/styles';
import {AppBar, Card, CardHeader, CardText, GridList, GridTile, RaisedButton} from 'material-ui';
import ReactHowler from 'react-howler';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    key: 'note1',
                    title: 'note1',
                    audio: '//localhost:3000/assets/Starbow.mp3'
                },
                {
                    key: 'note2',
                    title: 'note2',
                    audio: '//localhost:3000/assets/Kitty.mp3'
                }
            ],
            playing: false
        };
    }

    render() {
        let notes = this.state.notes;

        let play = (e) => {
            this.setState({playing: !this.state.playing});
        };

        let request = (e) => {
            axios({
                method: 'get',
                url: '//localhost:3000/audio-concat',
                params: {
                    audio: this.state.notes[0].audio
                }
            })
            .then((res) => {
                console.log(res);
            });
        };

        let load = (e) => {
            let audioFile = e.target.files[0];
            let audioUrl = URL.createObjectURL(audioFile);
            notes = notes.map((item, index, array) => {
                if (item.title === 'note1') {
                    item.audio = audioUrl.substr(audioUrl.indexOf(':') + 1);
                }
                return item;
            });
            console.log(audioUrl);
        };

        return (
            <MuiThemeProvider>
                <section>
                    <AppBar title="MixJuke" />
                    <GridList>
                        {
                            notes.map((note) => (
                                <GridTile key={note.key}>
                                    <Card>
                                        <CardHeader title={note.title} />
                                        <CardText>
                                            <RaisedButton containerElement="label" label="Browse">
                                                <input type="file" onChange={load} />
                                            </RaisedButton>
                                        </CardText>
                                    </Card>
                                </GridTile>
                            ))
                        }
                    </GridList>
                    <RaisedButton label='Request' onClick={request} primary={true} />
                    <RaisedButton label={this.state.playing === true ? "Pause" : "Play"} onClick={play} secondary={!this.state.playing} />
                    <ReactHowler id="audio" src={this.state.notes[0].audio} playing={this.state.playing} />
                </section>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);
