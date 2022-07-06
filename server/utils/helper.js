function generateRandomNumber(prevIndex, max){

    if(max > 1){
        let randomParticipantIndexes = [];

        for(i=0; i<3; i++){
            randomParticipantIndex = Math.floor( Math.random() * ((max) - 0) + 0 );
            randomParticipantIndexes.push(randomParticipantIndex);
        }

        randomParticipantIndexes = randomParticipantIndexes.filter(number => number!== prevIndex);

        return randomParticipantIndexes[0];
    }

    const index = 0;
    
    return index;
    
} 

module.exports = {
    generateRandomNumber
};