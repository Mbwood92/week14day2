const React = require('react');

class New extends React.Component {
    render () {
        return (
            <div>
            <h1>New Entry Ship</h1><br/>
        
                <form action='/logs' method="POST">
                    Title: <input type="text" name="title" /><br />
                    Entry: < input type="textarea" name="entry"/> <br />
                    Ship is broken: <input type="checkbox" name="shipIsBroken"/> <br />
                    <input type="submit" name="" value="Submit"/>
                </form><br/>

            </div>

        )
    }
}

module.exports = New;