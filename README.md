# incognito

Inspiré du jeu de la cacabox, c'est un jeu à plusieurs où l'on doit deviner les personnes derrière les pseudo anonyme à travers 30 questions.
[![Glitch](https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&logo=glitch&logoColor=white)]()
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)]()

## 📌 Présentation

### ▶️ Lancer une partie

Pour lancer le jeu, il faut l'héberger, perso j'utilise [glitch](https://glitch.com/) c'est gratuit et simple d'utilisation. Je me souviens plus si il est nécessaire 
de se créer un compte, je suppose que si moi je me co avec github mais google devrait suffire.

![capture1](https://github.com/Nerfez/incognito/blob/main/demonstration/Capture1.PNG "capture1")

Appuyez sur ```New project``` en haut à droite puis ```import from github``` et saississez le lien adéquat (ici : https://github.com/Nerfez/incognito )

![capture2](https://github.com/Nerfez/incognito/blob/main/demonstration/Capture2.PNG "capture2")

Pour lancer le jeu il faut ouvrir le terminal et éxecuter la commande suivante :

```nodejs
npm start
```

![capture3](https://github.com/Nerfez/incognito/blob/main/demonstration/Capture3.PNG "capture3")

Et enfin, la page sur laquelle vous et vos amis devez vous connecter se trouve ici (preview in a new window) :

![capture4](https://github.com/Nerfez/incognito/blob/main/demonstration/Capture4.PNG "capture4")

---

### :interrobang: Changer les questions

Pour changer les questions, il suffit de se rendre dans le fichier ```server.js``` et de changer manuellement les questions. Si vous n'êtes pas à l'aise avec javascript, évitez de rajouter des questions ou d'en retirer sous peine de faire planter le jeu (d'autant plus que j'ai pas coder de la manière la plus lisible et simple)

![capture5](https://github.com/Nerfez/incognito/blob/main/demonstration/Capture5.PNG "capture5")

---

### ▶️ Relancer une nouvelle partie

Si vous lancez ça depuis une invite de commande un ctrl + c devrait suffire mais si comme moi vous utiliser glitch pour héberger le site alors dans ce cas un truc assez simple : vous écrivez un caractère au hasard dans le fichier ```server.js``` :heavy_exclamation_mark: uniquement ce fichier :heavy_exclamation_mark:, puis supprimer le caractère, le site va se relancer automatiquement avec 0 modification. Pensez bien à enregistrer après avoir supprimer le caractère (ctrl + s)

![capture6](https://github.com/Nerfez/incognito/blob/main/demonstration/server.js%20%E2%80%93%20zefren-incognito.gif)

---

## 🆘 Problèmes

En cas d'erreur, n'hésitez pas à [créer une demande](https://github.com/Nerfez/incognito/issues) avec les détails qui conviennent pour que je puisse le corriger.
Ou à me contacter sur twitter : @Zefren_

En ce qui concerne le projet en lui-même, vous pouvez tout reprendre pour l'améliorer et en faire ce que vous voulez.

