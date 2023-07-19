const scale = 10 // 0-> 1 (1 unit) = 10px // need the scale it so that the illustation is easier to look at

const canvas = document.querySelector("#canvas");
const rangeInput = document.querySelector('#rangeInput')
const rangeValueDiv = document.querySelector('#rangeValue')

const CANVAS_DIMENSIONS = { height: canvas.height, width: canvas.width };

const ctx = canvas.getContext("2d");

const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
    42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
    79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91,
]
    .map(item => item * scale)


const onInputChangeHandler = (value) => {
    rangeValueDiv.innerText = value;

    /* here we are passing the 'value' to "drawRecaman" function so that it draws arc till the value of slider only */
    drawRecaman(value);
}

rangeInput.addEventListener('input', e => onInputChangeHandler(e.target.value));



function drawRecaman(value) {

    /* here we are clearing our canvas everytime this function is called so that unwanted arcs get removed 
        and we get our pattern according to our range input */
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* drawing center line */
    ctx.beginPath();
    ctx.moveTo(0, 340); // Move pen to center of y-axis
    ctx.lineTo(1200, 340); // draws line from 0x to 1200x keeping y constant at 340
    ctx.stroke();

    ctx.beginPath();
    let directionOfArc = true; // setting an initial value for direction of arc

    for (let i = 1; i <= value; i++) {

        let sequenceValue = sequence[i]; // actual value of "Recaman sequence" from array 'sequence'

        /* keeping previous value in "Recaman Sequence" from array 'sequence' to calculate 'center' and 'radius' */
        let prevSequenceValue = sequence[i - 1];

        /* center is named "centerX" because we only need to calculate value for x-axis. 
            Value of y-axis remains constant at 340 */
        let centerX = (sequenceValue + prevSequenceValue) / 2;
        let radius = (sequenceValue - prevSequenceValue) / 2;

        /* when we take a backward step, the value of radius becomes negative as 'prevSequenceValue' gets bigger 
            than 'sequenceValue', so here we are making it positive */
        if (radius < 0) {
            radius *= (-1);
        }

        /* here we are toggling the direction of arc so that we can receive desired pattern */
        if (directionOfArc == false) {
            directionOfArc = true;
        }
        else if (directionOfArc == true) {
            directionOfArc = false;
        }

        /* moving pen to the starting point of arc so that it does not overwrites center line again and again*/
        ctx.moveTo(centerX + radius, 340);

        ctx.arc(centerX, 340, radius, 0, Math.PI, directionOfArc);

    }

    /* we have taken 'ctx.stroke' out of the for-loop so that it does not overwrites arcs over and over again */
    ctx.stroke();
}
