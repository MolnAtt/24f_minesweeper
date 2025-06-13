function nullalista(m){
    let l = [];
    for(i = 0; i < m; i++){
       l.push(0);
    }
    return l;
}

function bombak_elhelyezese(lista, bombaszam){
    for (let i = 0; i < bombaszam; i++) {
        lista[i] = 1;
    }
    return lista;
}

function csere(lista, i, j){
    let temp = lista[i];
    lista[i] = lista[j];
    lista[j] = temp;
}

function veletlen_egesz(n,m){ // egy véletlen egész számot ad a [n,m] intervallumból!
    // példa: 5-12 között kell egy véletlen szám
    // 0-7 közötti véletlen számhoz adnánk 5-et
    // Math.floor(Math.random()*(7+1))+5
    return Math.floor(Math.random()*(m-n+1))+n;
}

function keveres(lista){ // fisher-yates-knuth keverési algoritmus
    for (let i = 0; i < lista.length - 1; i++) {
        let r = veletlen_egesz(i,lista.length - 1);
        csere(lista, i, r)
    }
    return lista;
}

function konzolra_kiir(bombak){
    for (let i = 0; i < bombak.length; i += 10) {
        console.log( i / 10 + ". " + bombak[0 + i] + " " + bombak[1 + i] + " " + bombak[2 + i] + " " + bombak[3 + i] + " " + bombak[4 + i] + " " + bombak[5 + i] + " " + bombak[6 + i] + " " + bombak[7 + i] + " " + bombak[8 + i] + " " + bombak[9 + i]);
    }
};


function nulla_beszurasa_ide(ide, lista){
    for (let i = lista.length; ide < i; i--) {
        lista[i] = lista[i-1];
    }
    lista[ide] = 0;
    return lista;
}



let bombak = nullalista(99); // ez azt csinálja, hogy visszaad egy 100 db nullát tartalmazó listát.
bombak = bombak_elhelyezese(bombak, 20); // a bombak listaban lerak (az első) 20 helyre 1-eseket.
let volt_mar_kattintas = false;

let kockak = document.querySelectorAll('main div');
for (const kocka of kockak) {
    kocka.addEventListener('click', kivalaszt);
}

function hanyadik(elem, lista){
    let i = 0;
    while(lista[i] != elem){
        i++;
    }
    return i;
}

function szomszedai(i){
  let lista = [];

  let elso_sor_e = i <= 10;
  let utso_sor_e = i > 90;
  let elso_oszlop_e = i % 10 == 1;
  let utso_oszlop_e = i % 10 == 0;
  
  if(!elso_sor_e){
      if(!elso_oszlop_e){
          lista.push(i - 11);
      }
      lista.push(i - 10);
      if(!utso_oszlop_e){
          lista.push(i - 9);
      }
  }
  if(!elso_oszlop_e){
      lista.push(i - 1);
  }
  if(!utso_oszlop_e){
      lista.push(i + 1);
  }
  if(!utso_sor_e){
      if(!elso_oszlop_e){
          lista.push(i + 9);
      }
      lista.push(i + 10);
      if(!utso_oszlop_e){
          lista.push(i + 11);
      }
  }
  return lista;
}

function bombak_szama(szomszedok, bombak){
    let bomba_db = 0;
    for (const szomszed of szomszedok) {
        if(bombak[szomszed] == 1){
            bomba_db++;
        }
    }
    return bomba_db;
};

function kivalaszt(event){
    let i = hanyadik(event.target, kockak);

    if(!volt_mar_kattintas){
        bombak = nulla_beszurasa_ide(i, bombak);
        bombak = keveres(bombak);
        volt_mar_kattintas = true;
        // tesztelés
        konzolra_kiir(bombak); // a konzolra áttekinthető formában kiírja a pályát.
    }

    event.target.classList.add('kattintott');
    if (bombak[i]==1){
        event.target.classList.add('akna');
        event.target.innerHTML='💣';
    } else {
        let szomszedok = szomszedai(i); // szomszedai: listat vissza, azon kockak indexeinek a listája, akik szomszedai az eredetinek.
        let bomba_db = bombak_szama(szomszedok, bombak); // adott indexek egy listája, adott a bomba 0-1-es tömb, és megszámolja, hogy a listában lévő indexek helyén hányszor van bomba
        if (bomba_db > 0){
            event.target.innerHTML = bomba_db;
            event.target.classList.add('szam' + bomba_db);
        }
    }
}

// 50-es szomszédai: [39, 40, 49, 59, 60]
// bombak = [0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, ..... ]