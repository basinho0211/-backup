// //1) select the element you want to modify!

// let header=document.getElementById('header');
// console.log(header);

// //2) modify!
// //modifying text

// header.textContent='this is a hacker website';

// header.innerHTML=header.innerHTML+'<p>hahahahahaha</p>'

// //modify color
// // header.style.color='pink'

// let q1={
//     title: 'What are the birds in Subnautica called?',
//     alt: [
        
//         'Winglets',
//         'Mantabirds',
//         'Skyrays',
//         'Flying Fishes',
//     ],
//     correctAnswer: 2 
// }
let questions=[
    {
    title: 'What are the birds in Subnautica called?',
    alt: [
            
            'Winglets',
            'Mantabirds',
            'Skyrays',
            'Flying Fishes',
        ],
    correctAnswer: 2,
    incorrectAnswer: 2 
    },
    {
    title: 'What are the largest form of insects in Rimworld?',
    alt: [
        
        'Big Boys',
        'Megawasp',
        'Megascarab',
        'Megaspider',
    ],
    correctAnswer: 3,
    incorrectAnswer: 3  
    },
    {
    title: 'What are noncarbon-based lifeforms (example: silicon-based lifeforms) called in Space Engine?',
    alt: [
            
            'Exotic',
            'Extracellular',
            'Hypercellular',
            'Strange',
        ],
    correctAnswer: 0,
    incorrectAnswer: 0  
    },
    {
    title: 'Dogs in Kenshi?',
    alt: [
            
            'Demon Dogs',
            'Bone Dogs',
            'Flesh Dogs',
            'Cute Dogs',
        ],
    correctAnswer: 1,
    incorrectAnswer: 2  
    },
    {
    title: 'The big whale near the end of Death Stranding?',
    alt: [
            
            'Blue Whale',
            'Behemoth',
            'Leviathan',
            'Goliath Whale',
        ],
    correctAnswer: 3,
    incorrectAnswer: 2  
    },
    {
        title: 'Giant fish that looks like a shrimp in Subnautica: Below Zero?',
        alt: [
            
            'Chelicerate',
            'Shadow Leviathan',
            'Ice Worm',
            'Your Character',
        ],
        correctAnswer: 1,
        incorrectAnswer: 2  
    },
    {
    title: 'What are the largest form of livestock in Rimworld?',
    alt: [
        
        'Big Boys V2',
        'Cow',
        'Muffalo',
        'Serpintine',
    ],
    correctAnswer: 4,
    incorrectAnswer: 3  
    },
    {
    title: 'What are carbon-based lifeforms called in Space Engine?',
    alt: [
            
            'Standard',
            'Multicellular',
            'Strange',
            'Organic',
        ],
    correctAnswer: 4,
    incorrectAnswer: 3  
    },
    {
    title: 'Giant bug in Kenshi?',
    alt: [
            
            'Quetzalcoatlus',
            'Benzalcoatlus',
            'Vorzalcoatlus',
            'Cute Flies',
        ],
    correctAnswer: 2,
    incorrectAnswer: 3  
    },
    {
    title: 'Hardest Question! Baby in Death Stranding?',
    alt: [
            
            'Dog',
            'Human',
            'Cat',
            'Demon',
        ],
    correctAnswer: 2,
    incorrectAnswer: 3  
    },
    // displays when all 10 questions are answered correctly
    {
        title: 'You are done! Check your score!',
        alt: [
                
                'Happy',
                'Late',
                'Groundhog',
                'Day!',
            ],
        correctAnswer: 101,
        incorrectAnswer: 2  
        }
    
];

let app={
    start:function(){
    this.daPosition=0;
    this.score=0;
    let alt=document.querySelectorAll('.alt');
    
    //show alts
    
    alt.forEach(function(element,index) {
        
        element.addEventListener('click',function(){
            
            this.checkAnswer(index);
        
            index++;
    
        }.bind(this));
}.bind(this));
    this.showQuestion(questions[this.daPosition]);
    this.updateScores();
    },
    
    showQuestion:function(q){
    
    //1) select DOM element
    
    let header=document.getElementById('header');
   
    //2) modify
    
    header.textContent=q.title;
    
    //3) select by query
    
    let alt=document.querySelectorAll('.alt');
    
    //show alts
    
    alt.forEach(function(element,index) {
        
        element.textContent=q.alt[index];
        
        
    });

    },
    checkAnswer:function(choice){
        let daChoice=questions[this.daPosition];
    
        this.showQuestion(questions[this.daPosition])
        if(daChoice.correctAnswer==choice){
            console.log('CORRECT! YOU = SMART!');
            this.score++;
            this.showResults(false);
        }
        else {
            console.warn('WRONG! YOU = DUMB! -no offense c:');
            this.showResults(true); 
            
        }

        this.incPosition();
        this.showQuestion(questions[this.daPosition])
        this.updateScores();
        this.showResults();
    },

    incPosition:function(){
        //increase the current position
        this.daPosition++;
        //send them back to the start
        // if(this.daPosition == questions.length){

        //     this.daPosition = 0;

        // }
    },
    updateScores:function(){
        //select our score div
        let scoreDiv=document.getElementById('score');
        
        //shows a specific sentence depending on the amount of points you have
    
        if (this.score <= 2){
        scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOU SUCK!';
        }
        else if (this.score <= 4){
        scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOURE... MEH...';
        }
        else if (this.score <= 6){
            scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOURE GETTING THE HANG OF IT!';
        }
        else if (this.score <= 8){
            scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOURE DOING GOOD!';
        }
        else if (this.score <= 9){
            scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOURE AMAZING!!';
        }
        else if (this.score >= 10){
            scoreDiv.textContent='YOU GOT ' + this.score + ' POINTS! YOU ARE THE BEST! YOU NOW HAVE A PHD IN VIDEO GAME BIOLOGY!!!';
        }
    },
    showResults:function(isCorrect){
        //select results
        let resultsDiv=document.getElementById('results');
        let result
        if(isCorrect == true){
            //shows if you click something at the score page!!!
            result='Why are you still trying to answer questions?';
        }
        else{
            //what is our current question
            let daQuestion=questions[this.daPosition];
            //gets a random answer to mess you up 
            let daAnswerIndex=daQuestion.incorrectAnswer;
            //displays random answer
            let correctText=daQuestion.alt[daAnswerIndex];
            result='CORRECT ANSWER IS "' + correctText + '"';
            
        }
        
        //modify
        resultsDiv.textContent=result;

    },
    
}

app.start();

