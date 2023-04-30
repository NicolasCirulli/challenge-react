import Section from '../../components/Section/Section'
import style from './schedule.module.css'
import LeagueService from '../../services/LeagueService'
import { useEffect, useState } from 'react'
const Schedule = () => {
  const [data, setData] = useState([])
  const querys = new LeagueService()
  useEffect(()=>{
    querys.fetchData()
      .then( () => setData( querys.getMatches() ) )
      .catch( err => console.log(err) )
  },[])
  return (
      <Section title='League Schedule'>
        <table className={style.schedule__table}>
          <colgroup>
            <col span="1" className={style.col_1} />
            <col span="1" className={style.col_2} />
            <col span="1" className={style.col_3} />
            <col span="1" className={style.col_4} />
            <col span="1" className={style.col_5} />
          </colgroup>
          <thead className={style.schedule__table}>
            <tr>
              <th className={style.col__date}>Date/Time</th>
              <th className={style.col__stadium}>Stadium</th>
              <th className={`${style.col_home} ${style.flex__teams}`}>Home Team</th>
              <th></th>
              <th className={`${style.col_away} ${style.flex__teams}`}>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((match, index) => (
                <tr key={index}>
                  <td className={style.col__date}>{match.matchDate} <br/>{match.matchHour}
                  </td>
                  <td className={style.col__stadium}>{match.stadium}</td>
                  <td><div className={`${style.flex__teams} ${style.col_home}`}><img className={style.table__flag} src={`https://flagsapi.codeaid.io/${match.homeTeam}.png`} /> <span className={style.bold__text__table}>{match.homeTeam}</span> </div></td>
                  <td className={`${style.col_score} ${style.bold__text__table}`}>{match.homeTeamScore} : {match.awayTeamScore}</td>
                  <td><div className={`${style.flex__teams} ${style.col_away}`}><img className={style.table__flag} src={`https://flagsapi.codeaid.io/${match.awayTeam}.png`} /> <span className={style.bold__text__table}>{match.awayTeam}</span> </div> </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Section>
  )
}

export default Schedule