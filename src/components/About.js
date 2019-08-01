import React from 'react'
import { Header, Segment, Container } from 'semantic-ui-react'
import Nav from './Nav'

const About = () => {

  return(
    <div>
      <Nav />
      <div className='home vh100' id='about'>
        <div id='inner-about'>
          <Segment color='teal' raised padded='very'>
            <Header as='h2' textAlign='center' style={{
              fontSize: '400%', textShadow: '5px 5px 5px grey'
            }}>
              On It!
            </Header>
            <Container>
            <Header as='h4' textAlign='center' style={{ fontSize: '120%'}}>
              "On It!" was created as a simple project and task management app, which allows users to:
            </Header>
            <p>
            <ul>
              <li>
                Create private boards to organize personal projects and/or join teams to work on group projects together.
              </li>
              <li>
                Create, edit, or delete Boards, which consist of Projects that further consist of Tasks.
              </li>
              <li>
                Change the order that Tasks are listed in a Project and/or move the Task to a different Project.
              </li>
              <li>
                Leave comments on Projects to ask questions, have discussions, or leave reminders/notes.
              </li>
              <li>
                Join a team if they are invited by someone on that team. Once a member, they have the option to leave.
              </li>
              </ul>
            </p>
            <hr/>
            <p>
              The frontend was developed on React 16.8.1 and Redux 4.0.1, and also utilizes React-DOM, React-Router-DOM, and Redux-Thunk. Semantic-UI-React was used extensively throughout the app as well. React-Beautiful-DnD was incorporated to add drag and drop functionality.
            </p>
            <p>
              The backend was developed on Ruby 2.5.1 and Rails 5.2.1, and uses Active Model Serializers and a PostgreSQL Database. For basic auth, BCrypt and JWT were used as well.
            </p>
            <hr/>
            <p>
              Credits to the following artists on Unsplash for the background images that were used: Paul Earle, 贝莉儿 NG, Nitish Meena, Josefa Holland-Merten, Robert Bye, Jay Mantri, Blair Fraser, Jeremy Ricketts, Dominik Schröder, Anthony DELANOIX, Modestas Urbonas, Namphuong Van, Blake Richard Verdoorn, Nick Scheerbart, Ivan Slade, Clem Onojeghuo, Noah Baslé, Cameron Kirby, Sebastien Gabriel, Elliott Engelmann, Paul Jarvis, Jonathan Bean, and NASA.
              <br/>
              Hand Icon made by <a href="https://www.freepik.com/" title="Freepik"> Freepik </a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com </a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0"> CC 3.0 BY </a>
            </p>
            <hr/>
            <div>
              <p>
                Please reach out if you find any bugs or issues, or if you have any general feedback or recommendations!
              </p>

              <p>
                The frontend repo can be found here: <a href='https://github.com/mkim4247/On-It-Frontend'> Frontend Repo </a>
              </p>

              <p>
                The backend repo can be found here: <a href='https://github.com/mkim4247/On-It-Backend'> Backend Repo </a>
              </p>

              <p>
                YouTube Demo of the app: <a href='https://www.youtube.com/watch?v=1ENl7yk6aeY'> Demo </a>
              </p>
            </div>
            </Container>
          </Segment>
        </div>
      </div>
    </div>
  )
}

export default About
