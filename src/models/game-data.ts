export class GameData {
    public players: string[] = [];
    public profilePics: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string | null = null;

    constructor() {
        for (let i = 1; i < 2; i++) {  //14
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('clubs_' + i);
        }
        shuffleArray(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            profilePics: this.profilePics,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        };
    }

}

function shuffleArray(array: any[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

