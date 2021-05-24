
    var pos = 0;
    const pacArray = [
        'images/PacMan1.png', 'images/PacMan2.png',
        'images/PacMan3.png', 'images/PacMan4.png'
    ];
    var direction = 0;
    const pacMen = [];

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan
    function makePac() {
        // returns an object with values scaled {x: 33, y: 21}
        let imgNum = Math.round(Math.random());

        let velocity = setToRandom(10);
        let position = setToRandom(500);


        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';
        newimg.src = pacArray[imgNum];
        newimg.width = 100;
        newimg.style.left = position.x;
        newimg.style.top = position.y + 100;
        game.appendChild(newimg);
        // new style of creating an object
        return {
            position,
            velocity,
            newimg,
            imgNum
        }
    }

    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;

        })
        setTimeout(update, 20);
    }

    function pacPac() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {


            if (item.imgNum === 0) {
              item.imgNum = 1;
              item.newimg.src = pacArray[1];
            }
            else if (item.imgNum == 1){
              item.imgNum = 0;
              item.newimg.src = pacArray[0];
            }
            else if (item.imgNum === 2) {
              item.imgNum = 3;
              item.newimg.src = pacArray[3];
            }
            else {
              item.imgNum = 2;
              item.newimg.src = pacArray[2];
            }

        })
        setTimeout(pacPac, 300);
    }


    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width >= window.innerWidth) {

            if (item.imgNum === 0) {
              item.imgNum = 3;
              item.newimg.src = pacArray[3];
            }
            else {
              item.imgNum = 2;
              item.newimg.src = pacArray[2];
            }

          item.velocity.x = -item.velocity.x;

        }
        if (item.position.x + item.velocity.x <= 0) {

              if (item.imgNum === 2) {
                item.imgNum = 1;
                item.newimg.src = pacArray[1];
              }
              else  {
                item.imgNum = 0;
                item.newimg.src = pacArray[0];
              }

            item.velocity.x = -item.velocity.x;
        }
        if (item.position.y + item.velocity.y + item.newimg.height >= window.innerHeight ||
            item.position.y + item.velocity.y <= 0) {
              item.velocity.y = -item.velocity.y;
            }
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }
