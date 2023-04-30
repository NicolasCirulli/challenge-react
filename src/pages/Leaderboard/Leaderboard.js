import Section from '../../components/Section/Section'
import style from './leaderboard.module.css'
import { useEffect, useState } from 'react'
import LeagueService from '../../services/LeagueService'
const Leaderboard = () => {
  const [matches, setMatches] = useState([])
  useEffect(()=>{
    const querys = new LeagueService()
    querys.fetchData()
      .then( () => setMatches( querys.getLeaderboard() ) )
      .catch( err => console.log(err) )
  },[])
  return (
    <Section title='League Standings'>
      <table className={style.table__standings}>
        <colgroup>
          <col span="1" className={style.col_1} />
          <col span="1" className={style.col_2} />
          <col span="1" className={style.col_3} />
          <col span="1" className={style.col_4} />
          <col span="1" className={style.col_5} />
        </colgroup>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>MP</th>
            <th className={style.col__desktop}>GF</th>
            <th className={style.col__desktop}>GA</th>
            <th className={style.col__mobile}>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody> 
         {
            matches.map((match, index) => (
              <tr key={index} className={style.row__standing}>
              <td><div className={style.team__cell}><img className={style.table__flag} src={`https://flagsapi.codeaid.io/${match.teamName}.png`} /> <span className={style.bold__text__table}>{match.teamName}</span> </div></td>
              <td>{match.matchesPlayed}</td>
              <td className={style.col__desktop}>{match.goalsFor}</td>
              <td className={style.col__desktop}>{match.goalsAgainst}</td>
              <td className={style.col__mobile}>{match.goalsFor - match.goalsAgainst}</td>
              <td className={style.points}>{match.points}</td>
            </tr>
            ))
         }
        </tbody>

      </table>
    </Section>
  )
}

export default Leaderboard