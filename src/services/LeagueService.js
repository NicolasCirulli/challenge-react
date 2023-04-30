/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW WITHOUT CHANGING THE INTERFACE OF THEM, 
 *       AND PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 * 
 */
import axios from "axios";
const league = axios.create({
    baseURL: "http://localhost:3001/api/",
})
class LeagueService {

    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */
    setMatches(matches) { 
        this.matches = matches.map( match => {
            let aux = match
            let date = new Date(match.matchDate)
            const year = date.getFullYear()
            const mounth = date.getMonth() + 1
            const day = date.getDate()
            const hour = date.getHours()
            const minutes = date.getMinutes()
            aux.matchDate = `${day}/${mounth}/${year}`
            aux.matchHour = `${hour}:${minutes}`
            return aux
        } )
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches
     }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() { 
        this.leaderborad = []
        let aux = this.matches.reduce( (acc, match) => {
            if( acc[match.homeTeam] ){
                acc[match.homeTeam].matchesPlayed += match.matchPlayed ? 1 : 0
                acc[match.homeTeam].goalsFor += match.homeTeamScore
                acc[match.homeTeam].goalsAgainst += match.awayTeamScore
                acc[match.homeTeam].points += match.homeTeamScore > match.awayTeamScore ? 3 : match.homeTeamScore === match.awayTeamScore ? 1 : 0
            }else{
                acc[match.homeTeam] = {
                    teamName: match.homeTeam,
                    matchesPlayed: match.matchPlayed ? 1 : 0,
                    goalsFor: match.homeTeamScore,
                    goalsAgainst: match.awayTeamScore,
                    points: match.homeTeamScore > match.awayTeamScore ? 3 : match.homeTeamScore === match.awayTeamScore ? 1 : 0
                }
            }
            if( acc[match.awayTeam] ){
                acc[match.awayTeam].matchesPlayed += match.matchPlayed ? 1 : 0
                acc[match.awayTeam].goalsFor += match.awayTeamScore
                acc[match.awayTeam].goalsAgainst += match.awayTeamScore
                acc[match.awayTeam].points += match.awayTeamScore > match.homeTeamScore ? 3 : match.awayTeamScore === match.homeTeamScore ? 1 : 0
            }else{
                acc[match.awayTeam] = {
                    teamName: match.awayTeam,
                    matchesPlayed: match.matchPlayed ? 1 : 0,
                    goalsFor: match.awayTeamScore,
                    goalsAgainst: match.homeTeamScore,
                    points: match.awayTeamScore > match.homeTeamScore ? 3 : match.awayTeamScore === match.homeTeamScore ? 1 : 0
                }
            }
            return acc
        }, {} )
        for( const team in aux ){
            this.leaderborad.push(aux[team])
        }
        this.leaderborad.sort( (a,b) => {
            if( a.points > b.points ){
                return -1
            }else if( a.points < b.points ){
                return 1
            }else{
                if( a.goalsFor - a.goalsAgainst > b.goalsFor - b.goalsAgainst ){
                    return -1
                }else if( a.goalsFor - a.goalsAgainst < b.goalsFor - b.goalsAgainst ){
                    return 1
                }else{
                    if( a.goalsFor > b.goalsFor ){
                        return -1
                    }else if( a.goalsFor < b.goalsFor ){
                        return 1
                    }else{
                        return 0
                    }
                }
            }
        } )
        return this.leaderborad
        
    }

    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData(  ) {
        try {
            const { data: { access_token
            } } = await league.get('v1/getAccessToken');
            const response = await league.get('v1/getAllMatches', {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            this.setMatches(response.data.matches)
        } catch (error) {
            return error
        }
    }
}

export default LeagueService;