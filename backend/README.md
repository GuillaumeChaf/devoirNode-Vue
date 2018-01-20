# partie BACKEND

## Cette API backend est constitutée de 4 routes :

* '/getTaches'
* '/delete/:id'
* '/add/:title/:message'
* '/update/:id/:title/:message'

## pour réaliser cette API, 4 modules ont été nécéssaire :

* cors
* express
* session
* contentType

Pour chacune des routes, je vais expliquer comment je les ai pensées et réalisées et quelles difficultés j'ai rencontré,
tout en montrant quelle place jouent les différents modules exportés. Toutes ces routes ont beaucoup de spécifités communes
qui sont expliquées uniquement dans la route getTâches, donc il vaut mieux commencer par celle-ci.

### /getTâches

Chacune de ces routes a été réalisée grâce au module express, la route /getTâches est la plus importante,
c'est elle qui charge toutes les tâches pour les renvoyer au front.
J'ai décidé de renvoyer ces tâches sous forme d'un tableau, tableau composé d'objets tâche(id,titre,message)
l'id va surtout servir coté back au niveau de la modification et de la suppression des données, même s'il est renvoyé côté front,
il ne sera jamais montré à l'utilisateur. A chaque tâche créée il va s'incrémenter de 1 pour ne pas que 2 tâches aient le même id.
Le titre et le message sont les 2 champs affichés côté front.
Pour que les données soient persistantes, il fallait utiliser un cookie de session, c'est là que le module session et le module cors entrent en jeu.
Le module session va nous permettre d'utiliser la variable req.session dans laquelle nous allons pouvoir stocker nos données puis les lire lorsque l'utilisateur se connectera à l'appli. Si le cookie de session change ou que l'utilisateur utilise l'appli pour la première fois,
il faudra créer les variables tâches et index (variables pour créer l'id des tâches, c'est lui qui va s'incrémenter)
Pour ne pas que ce cookie de session change à chaque fois que la page se rafraichit, il faut utiliser le module cors, l'initialiser et ne pas oublier d'ajouter le paramètre
withCredentials = true dans les requêtes côté front.
L'utilisation de ce module a été pour moi la plus grosse difficulté, puisqu'il n'est pas très intuitif et nécessite l'utilisation de certains paramètres qu'on ne connait pas forcément.
Enfin le module contentType va servir à spécifier au résultat de la requête quel type de données nous lui envoyons grâce à la fonction res.setHeader.
Ici ce sera du application/json puisqu'il s'agit d'un tableau d'objet.

### /delete/:id

Route destinée à supprimer un élément de la liste.
Elle effectue un parcours partiel sur la liste des tâches dans req.session.tâches grâce à la fonction "some" jusqu'à tomber sur une tâche avec l'id en paramètre (:id)
Cette tâche est supprimée grâce à la fonction tâche, et on arrête le parcours puisqu'il n'existe qu'une tâche avec cette id. L'id supprimé est renvoyé au front, donc on utilise un type application/json dans le header.

### /add/:title/:message

Route destinée à ajouter une tâche à la liste req.session.tâches
Dans un premier temps, on vérifie que les variables tâches et index de la session sont créées, si ce n'est pas le cas, on le fait.
Puis on créé un objet tâche composé des 2 paramètres(:title,:message). Pour l'index, on utilise la variable req.session.index qui va s'auto-incrémenter après création de la tâche pour la prochaine tâche que l'on enregistrera.
On push l'objet créé à la variable tâches et on renvoie true pour signifier au front que l'ajout s'est fait.

### /update/:id/:title/:message
Route destinée à modifier une tâche de la liste req.session.taches
Cette route est un mélange des 2 précédentes. Dans un premier temps on cherche la tâche avec l'id en paramètre grâce à un parcours partiel.
Une fois trouvée, les 2 variables title et message vont être remplacées par celles en paramètre.
Une fois la liste mise à jour, on renvoie true, comme lors de la route précédente.
