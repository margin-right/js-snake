var LEFT = 50, TOP = 260, way = "d", FoodLeft = 100, FoodTop = 260, boxName = ["snake0"], Xbox = [], Ybox = [], c = 0, k, countB=0, countS=1, spd = 300, spdPos = 1, score = 0,spdB = 50;

//функция запуска игры (кнопка "играть")
function start(){
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("snake0").style.visibility = "visible";
    document.getElementById("snake0").style.left = LEFT; 
    document.getElementById("snake0").style.top = TOP+"px";
    document.getElementById("urScore").innerHTML = "Счет: 0 ";
    tick = setInterval(main, spd);
}

//функция представляющая из себя основной цикл (шаг на один блок тела)
function main(){
    document.addEventListener('keypress', (event) => {  //
        var keyName = event.key;                        // реакция на нажатие клавиши
        onkeydown = status(keyName);                    //
    });
    c = 0;
    InterH = setInterval(moveHead, spdB); //запуск анимации головы
    InterB = setInterval(moveBody,spdB);  //запуск анимации тела
}

//проверка на доступность нажатой кнопки
function status(keyName){
    if((keyName == "d" && way != "a" && way != "ф") || (keyName == "в" && way != "ф" && way != "a") || (keyName == "a" && way != "d" && way != "в") || (keyName == "ф" && way != "в" && way != "d") || (keyName == "s" && way != "w" && way != "ц") || (keyName == "ы" && way != "ц" && way != "w") || (keyName == "w" && way != "s" && way != "ы") || (keyName == "ц" && way != "ы" && way != "s") ){
    way = keyName;}
    return way;
}

//движение головы
function moveHead(){
    for (let i = 0; i < boxName.length; ++i) {                              //
        Xbox[i] = parseInt(document.getElementById("snake"+i).style.left);  // запоминание координат головы до ее перемещения на 1 шаг
        Ybox[i] = parseInt(document.getElementById("snake"+i).style.top);   //
    }
    ++c;

    if(((LEFT+10) % 30) == 0 && ((TOP+10) % 30) == 0 ){k = way} //условие разрешающие сменить направление только если голова находитя в блоке сетки уровня
    
    // движение в зависимости от нажатой ранее кнопки
    switch(k) {
        case 'd': 
            if(LEFT == 500){
                LEFT = 15
            }
            LEFT = LEFT+5;
            document.getElementById("snake0").style.left = LEFT+"px";
            break
        case 'в': 
            if(LEFT == 500){
                LEFT = 15
            }
            LEFT = LEFT+5;
            document.getElementById("snake0").style.left = LEFT+"px";
            break
        case 'a': 
            if(LEFT == 20){
                LEFT = 505
            }    
            LEFT = LEFT-5;
            document.getElementById("snake0").style.left = LEFT+"px";
            break
        case 'ф': 
            if(LEFT == 20){
                LEFT = 505
            }    
            LEFT = LEFT-5;
            document.getElementById("snake0").style.left = LEFT+"px";
            break
        case 'w': 
            if(TOP == 20){
                TOP = 505
            }    
            TOP = TOP-5;
            document.getElementById("snake0").style.top = TOP+"px";   
            break
        case 'ц': 
        if(TOP == 20){
             TOP = 505
            }    
                TOP = TOP-5;
                document.getElementById("snake0").style.top = TOP+"px";   
            break
        case 's': 
            if(TOP == 500){
                TOP = 15
            }    
            TOP = TOP+5;
            document.getElementById("snake0").style.top = TOP+"px";      
            break
        case 'ы': 
            if(TOP == 500){
                TOP = 15
            }    
            TOP = TOP+5;
            document.getElementById("snake0").style.top = TOP+"px";   
             break
          }

          //смерть (проверка залезания головы в тело)
          for(let j =1; j<boxName.length; ++j){
            if(Xbox[j] == Xbox[0] && Ybox[j] == Ybox[0]){
                clearInterval(tick);
                document.getElementById("snake0").style.left = document.getElementById("snake1").style.left;
                document.getElementById("snake0").style.top = document.getElementById("snake1").style.top;
                for(let f =0; f<boxName.length; ++f){
                    document.getElementById("snake"+f).style.backgroundColor = "black";
                }
            }
        }
        if(LEFT == FoodLeft && TOP == FoodTop){
            catcher();
        }
        if(c == 6){
            clearInterval(InterH);
        }
}

//движение тела за координатами головы (телепортация на запомнившуюся позицию)
function moveBody(){
    for (let i = 1; i < boxName.length; ++i) {
        document.getElementById(boxName[i]).style.left = Xbox[i-1]+"px";
        document.getElementById(boxName[i]).style.top = Ybox[i-1]+"px";
    }
    if(c == 6){
        clearInterval(InterB);
    }
}



//функция, выполняемая когда змея кушаец
function catcher(){
    ++score;
    countB = countB +6;
    document.getElementById("urScore").innerHTML = "Счет: " + score;
    clearInterval(tick);
    RandomFood();
    
    //добавление тела
    for(let g = countS; g < countB;g++){
    document.getElementById("playground").innerHTML = document.getElementById("playground").innerHTML + "<div id='snake"+g+"' style ='top: "+FoodTop+"px; left: "+FoodLeft+"px; background: orange; width: 30px; height: 30px; position: absolute; border-radius: 5px;'></div>";
    boxName[g] = "snake"+g;
    Xbox[g] = document.getElementById("snake"+g).style.left;
    Ybox[g] = document.getElementById("snake"+g).style.top;
    }

    //увеличение скорости в зависимости от счета (скорость увеличивается на 10% от изначальной когда счет становится кратен 20)
    if((score % 20) == 0){
        ++spdPos;
        spd = spd - 30;
        spdB = spdB - 5;
        document.getElementById("Speed").innerHTML = "Скорость: "+spdPos;
        countS = countB;
        tick = setInterval(main, spd);
    }
    else{
        document.getElementById("Speed").innerHTML = "Скорость: "+spdPos;
        countS = countB;
        tick = setInterval(main, spd);
    }
}

//рандомайзер еды
function RandomFood(){
    var x = Math.random() * 15300, y = Math.random() * 15300 ;
    FoodLeft = 20 + ((x / 30) - ((x / 30) % 30)) ;
    FoodTop = 20 + ((y / 30) - ((y / 30) % 30)) ;
    document.getElementById("food").style.left = FoodLeft + "px";
    document.getElementById("food").style.top = FoodTop + "px";
}