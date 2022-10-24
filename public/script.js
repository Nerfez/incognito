const pseudo = document.getElementById("form_pseudo");
const submission = document.getElementById("form_jeu");
const submission_pm = document.getElementById("form_pm");
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const outro_relier = document.getElementById("outro_relier");
const outro_finale = document.getElementById("outro_finale");
const private_message = document.getElementById("private_message");
const classement = document.getElementById("leaderboard");
const img_retour = document.getElementById("img_retour");
const img_send = document.getElementById("img_send");
const reponse_finale = document.getElementById("reponse_finale");
//Button pour voir l'historique des réponses du joueur 1
const joueur_1 = document.getElementById("joueur_1");
//Button pour voir l'historique des réponses du joueur 2
const joueur_2 = document.getElementById("joueur_2");
//Button pour voir l'historique des réponses du joueur 3
const joueur_3 = document.getElementById("joueur_3");
//Button pour voir l'historique des réponses du joueur 4
const joueur_4 = document.getElementById("joueur_4");
//Button pour voir l'historique des réponses du joueur 5
const joueur_5 = document.getElementById("joueur_5");
//TIMER
const timer = document.getElementById("timer");
let socket = undefined;
let name = "anonyme";
let pseudoJoueur = "Couscous";
let pseudoJoueurRecu = "Tajine";
let envoi_boolean = false;
let reponseLeo = [];
let reponseAdrien = [];
let reponseRobert = [];
let reponseJeanPaul = [];
let reponseMaurice = [];
let playersNameRecu = [];
let playersPointsRecu = [];
let pseudoQuiNousDM = "";

//on affiche l'historique des réponses
joueur_1.addEventListener("click", function (e) {
  socket.emit("voirReponsesJoueur", "joueur1", name);
});

joueur_2.addEventListener("click", function (e) {
  socket.emit("voirReponsesJoueur", "joueur2", name);
});

joueur_3.addEventListener("click", function (e) {
  socket.emit("voirReponsesJoueur", "joueur3", name);
});

joueur_4.addEventListener("click", function (e) {
  socket.emit("voirReponsesJoueur", "joueur4", name);
});

joueur_5.addEventListener("click", function (e) {
  socket.emit("voirReponsesJoueur", "joueur5", name);
});

img_retour.addEventListener("click", function (e) {
  //on supprime les dm du mec e.target.innerText
  private_message.classList.add("hidden");
  //on affiche le chat general
  game.classList.remove("hidden");
});

document.getElementById("img_retour2").addEventListener("click", function (e) {
  //on supprime lhistorique
  document.getElementById("historique_joueur").classList.add("hidden");
  document.getElementById("outro_relier").classList.remove("hidden");
});

reponse_finale.addEventListener("click", function (e) {
  //on supprime les dm du mec e.target.innerText
  reponse_finale.classList.add("hidden");
  let reponses = [];
  reponses[0] = document.getElementById("pseudo-select").value;
  reponses[1] = document.getElementById("pseudo-select2").value;
  reponses[2] = document.getElementById("pseudo-select3").value;
  reponses[3] = document.getElementById("pseudo-select4").value;
  reponses[4] = document.getElementById("pseudo-select5").value;
  if (envoi_boolean == false) {
    socket.emit("reponse_relier", name, reponses);
    envoi_boolean = true;
  }
});

img_send.addEventListener("click", function (e) {
  e.preventDefault();

  const reponse = document.getElementById("reponse").value;

  if (reponse) {
    socket.emit("user_message", pseudoJoueur, reponse);
    socket.emit("send_response", name, reponse);
    document.getElementById("reponse").value = "";
  }
});

pseudo.addEventListener("submit", function (evt) {
  evt.preventDefault();
  name = evt.target["name"].value;

  //si le pseudo n'est pas vide
  if (name) {
    //On se connecte à la socket
    socket = window.io();

    //on indique le pseudo du joueur qui vient de se connecter
    socket.emit("user_join", name);

    StartGame();
  }
});

submission.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const reponse = evt.target["reponse"].value;

  if (reponse) {
    socket.emit("user_message", pseudoJoueur, reponse);
    socket.emit("send_response", name, reponse);
    evt.target["reponse"].value = "";
  }
});

submission_pm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const reponse = evt.target["reponse_pv"].value;

  if (reponse) {
    socket.emit("messagePrivate", pseudoJoueur, pseudoJoueurRecu, reponse);
    evt.target["reponse_pv"].value = "";
  }
});

document.getElementById("mpChat").addEventListener(
  "mouseenter",
  function (event) {
    document.getElementById("mpChat").style.cursor = "pointer";
    // on met l'accent sur la cible de mouseenter
    event.target.style.color = "purple";

    // on réinitialise la couleur après quelques instants
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);

// Ce gestionnaire sera exécuté à chaque fois que le curseur
// se déplacera sur un autre élément de la liste
document.getElementById("mpChat").addEventListener(
  "mouseover",
  function (event) {
    // on met l'accent sur la cible de mouseover
    event.target.style.color = "orange";

    // on réinitialise la couleur après quelques instants
    setTimeout(function () {
      event.target.style.color = "";
    }, 500);
  },
  false
);

document.getElementById("mpChat").addEventListener("click", function (e) {
  const collection = document
    .getElementById("mpChat")
    .getElementsByTagName("li");
  for (let i = 0; i < collection.length; i++) {
    collection[i].style.color = "white";
  }
  if (e.target && e.target.matches("li")) {
    //on supprime le chat general
    game.classList.add("hidden");
    //on affiche les dm du mec e.target.innerText
    pseudoJoueurRecu = e.target.innerText;
    private_message.classList.remove("hidden");
  }
});

//timer en secondes
const departMinutes = 3;
let temps = 30;
//departMinutes * 60

//lancement timer
function start() {
  var self = this;
  this.interval = setInterval(() => {
    let minutes = parseInt(temps / 60, 10);
    let secondes = parseInt(temps % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    counterStyle();
    CheckTemps();
    timer.value = `${minutes}:${secondes}`;
    temps = temps <= 0 ? 0 : temps - 1;
  }, 1000);
}

//si le temps tombe a zero on donne la reponse et on passe a une image suivante
function CheckTemps() {
  if (temps == 0) {
    if (envoi_boolean == false) {
      let reponses = [];
      reponses[0] = document.getElementById("pseudo-select").value;
      reponses[1] = document.getElementById("pseudo-select2").value;
      reponses[2] = document.getElementById("pseudo-select3").value;
      reponses[3] = document.getElementById("pseudo-select4").value;
      reponses[4] = document.getElementById("pseudo-select5").value;
      socket.emit("reponse_relier", name, reponses);
    }
    socket.emit("reponse_afficher_final", "Quelle etait la reponse ?");
    clearInterval(this.interval);
    delete this.interval;
  }
}

function refresh() {
  temps = 10;
  clearInterval(this.interval);
  delete this.interval;
  if (!this.interval) this.start();
}

function Play() {
  if (!this.interval) this.start();
}

//changement de couleur du timer
function counterStyle() {
  if (temps < 90) {
    timer.classList.remove("text-green-400");
    timer.classList.add("text-orange-400");
  } else if (temps > 90) {
    timer.classList.remove("text-orange-400");
    timer.classList.add("text-green-400");
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function AfficherRep(prenom, pseudo) {
  let j = 0;
  let k = prenom.length;
  do {
    for (let i = 0; i < 5; i++) {
      document.getElementById("vrai_pseudo").innerHTML =
        pseudo[j] + " était ...";
      document.getElementById("vrai_prenom").innerHTML = prenom[j];
      if (i == 3) {
        document.getElementById("vrai_prenom").classList.remove("hidden");
      }
      await sleep(i * 1000);
    }
    document.getElementById("vrai_prenom").classList.add("hidden");
    j += 1;
  } while (j < k);
  outro_finale.classList.add("hidden");
  socket.emit("VoirPoints", "voir les points");
}

function StartGame() {
  //on supprime le champs de texte pseudo
  intro.classList.add("hidden");
  //on affiche les questions
  game.classList.remove("hidden");

  socket.on("send_question", (questionnaire) => {
    const node1 = document.createElement("li");
    const node2 = document.createElement("li");
    const textnode1 = document.createTextNode(questionnaire.question);
    const textnode2 = document.createTextNode(questionnaire.numero);

    node1.appendChild(textnode1);
    node1.style.fontSize = "x-large";
    node1.style["margin"] = "auto";
    node1.style.marginTop = "10px";
    node1.setAttribute("id", "titre2");
    node1.innerHTML = questionnaire.question;
    
    //////////////////////
    node2.appendChild(textnode2);
    node2.style.fontSize = "small";
    node2.style.width = "max-content";
    node2.style["margin"] = "auto";
    document.getElementById("mychat").appendChild(node1);
    document.getElementById("mychat").appendChild(node2);
    $("#all_game").scrollTop($("#all_game")[0].scrollHeight);
  });

  socket.on("delete_chat", function (data) {
    document.getElementById("mychat").innerHTML = "";
  });

  socket.on("AfficherPoints", (leaderboard) => {
    document.getElementById("points_joueur").classList.remove("hidden");
    classement.innerHTML = `
    ${leaderboard
      .map(
        (player) =>
          `<li class="flex justify-between"><strong>${player.name}</strong> ${player.points}</li>`
      )
      .join("")}
    `;
  });

  socket.on("pseudo_joueur", function (data) {
    pseudoJoueur = data;
  });

  socket.on(
    "AfficherReponsesJoueur",
    function (QuestionJoueur, reponseJoueur, nameRecu) {
      if (name == nameRecu) {
        document.getElementById("HistoriqueChat").innerHTML = "";
        for (let i = 0; i < QuestionJoueur.length; i++) {
          const node1 = document.createElement("li");
          const textnode1 = document.createTextNode(
            i + 1 + " - " + QuestionJoueur[i]
          );
          const node2 = document.createElement("li");
          const textnode2 = document.createTextNode(reponseJoueur[i]);
          node1.appendChild(textnode1);
          node2.appendChild(textnode2);
          node1.style.fontSize = "large";
          node1.style.width = "max-content";
          node1.style["margin"] = "auto";
          node1.style.marginTop = "5px";
          node1.style.color = "	#1260CC";
          node2.style.color = "	white";
          node2.style.fontSize = "large";
          node2.style.width = "max-content";
          node2.style["margin"] = "auto";
          node2.style.marginTop = "5px";
          document.getElementById("HistoriqueChat").appendChild(node1);
          document.getElementById("HistoriqueChat").appendChild(node2);
        }
        document.getElementById("historique_joueur").classList.remove("hidden");
        document.getElementById("outro_relier").classList.add("hidden");
      }
    }
  );

  socket.on("reponse_afficher_final_All", function (prenom, pseudo) {
    let prenomRecu = [];
    let pseudoRecu = [];
    for (let i = 0; i < prenom.length; i++) {
      prenomRecu[i] = prenom[i];
      pseudoRecu[i] = pseudo[i];
    }
    outro_relier.classList.add("hidden");
    document.getElementById("historique_joueur").classList.add("hidden");
    outro_finale.classList.remove("hidden");
    AfficherRep(prenomRecu, pseudoRecu);
  });

  socket.on("debutRelier", function (noms) {
    start();
    joueur_1.setAttribute("value", noms[0]);
    joueur_1.style.background = "	#ffb6c1";
    joueur_1.style.borderRadius = "25px";
    joueur_1.style.width = "max-content";
    joueur_1.style.paddingLeft = "5px";
    joueur_1.style.paddingRight = "5px";
    joueur_2.setAttribute("value", noms[1]);
    joueur_2.style.background = "	#ffb6c1";
    joueur_2.style.borderRadius = "25px";
    joueur_2.style.width = "max-content";
    joueur_2.style.paddingLeft = "5px";
    joueur_2.style.paddingRight = "5px";
    joueur_3.setAttribute("value", noms[2]);
    joueur_3.style.background = "	#ffb6c1";
    joueur_3.style.borderRadius = "25px";
    joueur_3.style.width = "max-content";
    joueur_3.style.paddingLeft = "5px";
    joueur_3.style.paddingRight = "5px";
    joueur_4.setAttribute("value", noms[3]);
    joueur_4.style.background = "	#ffb6c1";
    joueur_4.style.borderRadius = "25px";
    joueur_4.style.width = "max-content";
    joueur_4.style.paddingLeft = "5px";
    joueur_4.style.paddingRight = "5px";
    joueur_5.setAttribute("value", noms[4]);
    joueur_5.style.background = "	#ffb6c1";
    joueur_5.style.width = "max-content";
    joueur_5.style.borderRadius = "25px";
    joueur_5.style.paddingLeft = "5px";
    joueur_5.style.paddingRight = "5px";
    //on supprime le jeu
    game.classList.add("hidden");
    //on affiche le jeu de fin (relier)
    outro_relier.classList.remove("hidden");
  });

  socket.on("updateNotif", function (pseudoJoueurEnvoi, pseudoJoueurRecu) {
    if (pseudoJoueur == pseudoJoueurRecu) {
      const collection = document
        .getElementById("mpChat")
        .getElementsByTagName("li");
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].innerHTML == pseudoJoueurEnvoi) {
          collection[i].style.color = "green";
        }
      }
    }
  });

  socket.on("MessagePriveEnvoi", function (PseudoRecu, PseudoEnvoi, Message) {
    if (pseudoJoueur == PseudoEnvoi || pseudoJoueur == PseudoRecu) {
      const node1 = document.createElement("li");
      const node2 = document.createElement("li");
      const node3 = document.createElement("li");
      const textnode3 = document.createTextNode("Nouveau Message");
      const textnode1 = document.createTextNode(PseudoEnvoi);
      const textnode2 = document.createTextNode(Message);
      node1.appendChild(textnode1);
      node1.style.marginTop = "15px";
      node1.style.color = "	#ffb6c1";
      node2.appendChild(textnode2);
      node2.style.color = "black";
      node2.style.background = "	#ffb6c1";
      node2.style.borderRadius = "25px";
      node2.style.width = "max-content";
      node2.style.paddingLeft = "5px";
      node2.style.paddingRight = "5px";
      node2.style["font-size"] = "20px";
      node3.setAttribute("id", "titre");
      node3.style.paddingTop = "5px";
      node3.innerHTML = "Nouveau Message";
      if (PseudoEnvoi == pseudoJoueur) {
        node2.style.background = "	#1260CC";
        node2.style.color = "white";
        node2.style.marginTop = "10px";
        node2.style["float"] = "right";
        //si c'est pas nous
      } else if (PseudoEnvoi != pseudoJoueur) {
        if(pseudoQuiNousDM != PseudoEnvoi){
        document.getElementById("privateChat").appendChild(node3);
        }
        document.getElementById("privateChat").appendChild(node1);
      }
      document.getElementById("privateChat").appendChild(node2);
      $("#pm_game").scrollTop($("#pm_game")[0].scrollHeight);
      pseudoQuiNousDM = PseudoRecu;
    }
  });

  socket.on("update_players", function (data) {
    document.getElementById("mpChat").innerHTML = "";
    data.sort();
    for (let i = 0; i < data.length; i++) {
      if (data[i] == pseudoJoueur) {
        data[i] = "Vous(" + data[i] + ")";
      }
      const node1 = document.createElement("li");
      const textnode1 = document.createTextNode(data[i]);
      node1.appendChild(textnode1);
      node1.style.fontSize = "x-large";
      node1.style.width = "max-content";
      node1.style["margin"] = "auto";
      node1.style.marginTop = "5px";
      document.getElementById("mpChat").appendChild(node1);
    }
  });

  socket.on("updateNewMessage", function (NamePlayer, Message) {
    const node1 = document.createElement("li");
    const node2 = document.createElement("li");
    const textnode1 = document.createTextNode(NamePlayer);
    const textnode2 = document.createTextNode(Message);
    node1.appendChild(textnode1);
    node1.style.marginTop = "10px";
    node1.style.color = "	#ffb6c1";
    node2.appendChild(textnode2);
    node2.style.color = "black";
    node2.style.background = "	#ffb6c1";
    node2.style.borderRadius = "25px";
    node2.style.width = "max-content";
    node2.style.paddingLeft = "5px";
    node2.style.paddingRight = "5px";
    node2.style["font-size"] = "20px";
    if (NamePlayer == pseudoJoueur) {
      node2.style.background = "	#1260CC";
      node2.style.color = "white";
      node2.style.marginTop = "10px";
      node2.style["float"] = "right";
    } else if (NamePlayer != pseudoJoueur) {
      document.getElementById("mychat").appendChild(node1);
    }
    document.getElementById("mychat").appendChild(node2);
    $("#all_game").scrollTop($("#all_game")[0].scrollHeight);
  });
}
