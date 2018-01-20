# partie FRONTEND

## Ce programme en vue.js est composé de 5 components

* Accueil
* CreationTache
* DetailTache
* EnsembleTache
* Tache

Chacun de ces composants sera expliqué séparément, j'expliquerai comment je les ai pensés et réalisés, et quelles difficultés j'ai rencontré.
Mais d'abord je vais parler du rooting dans le fichier rooter/index.js, c'est grâce à lui qu'on va organiser le programme et passer d'une page à l'autre.

### Le rooting

Le rooting va être composé de 4 routes :
* la route de base '/' qui est lancée lorsqu'on lance l'application sur le localhost, elle utilise le component accueil dont on parlera plus tard
* la route '/create' qui mène vers la fenêtre de création d'une tâche, elle utilise le component CreationTache
* la route '/create/:id/:title/:message' c'est la même que la route de création sauf qu'elle n'est pas utilisée dans le même cas puisqu'il s'agit de la modification d'une tâche. Les paramètres vont servir à préremplir le formulaire de création et à indiquer qu'il s'agit bien d'une modification pour le lancement des requêtes axios
* la route '/view/:title/:message' permet de visualiser une tâche en particulier, ses paramètres sont les informations qu'il faudra afficher.

### Les composants

#### Accueil

Le composant accueil va être le premier composant que va voir l'utilisateur.
Il est composé de quelque champs texte de base est aussi du composant ensembleTache qui va permettre d'énumérer toutes les tâches de l'application.
Il contient également un bouton créé avec une balise rooter-link qui va utiliser le rooting vu précédemment pour créer une nouvelle tâche.

#### CréationTâche

Le composant création tâche, va servir à créer des tâches mais aussi à les modifier.
Il est le composant le plus complexe, il a été pour moi le plus difficile à créer.
C'est un mini-formulaire composé de 2 champs <input> avec un bouton submit et un bouton de retour au menu.
Une difficulté que j'ai rencontré a été de différencier une simple création d'une modification. Il est primordial de bien les différencier puisque les requêtes axios ne sont pas les mêmes et si une mauvaise requête est faite, cela pourrait fausser la base de données.
Pour faire la différence j'ai décidé de lancer une fonction à la création du component. Comme la modification prévoit des paramètres et pas la création, j'analyse simplement si un des paramètres essentiels à la modification est défini ou pas. Le résultat est stocké dans data.action.
Autre difficulté : la fonction de submit du formulaire, la plus grosse fonction du programme. Elle contient 2 requêtes axios modification, création. Maintenant grâce à la variable this.action on peut faire la différence entre les 2.
Il faut cependant faire quelques vérifications avant le lancement d'une requête axios :
* aucune variable message/title undefined
* aucune variable message/title avec 0 caractères
* aucune variable message/title avec seulement des espaces
Si une de ces contraintes n'est pas respectée, l'utilisateur reçoit un message d'erreur grâce à la fonction alert()

#### DétailTâche

Le composant le plus simple du programme, son rôle est seulement d'afficher les données qu'on lui envoie via l'url : le titre et le message.
Une requête axios aurait peut être été plus propre que de passer les informations directement via le rooting.

#### EnsembleTâche

Le composant qui va rassembler la liste des tâches pour les envoyer vers l'accueil.
C'est lui qui fait l'appel vers l'API pour récupérer toutes les tâches disponibles, cette requête se fait directement lors de la création du component.
Une fois les informations récupérées, il les stocke dans sa data puis fait un appel au component Tâche pour le rendu.

#### Tâche

Le composant tâche est constitué d'un id, d'un titre et d'un message qu'il prend via des props.
Il contient également 3 boutons, 2 qui vont faire jouer le rooting pour amener l'utilisateur vers d'autres fenêtres (voir et modifier)
Le troisième lance une fonction interne au component. La fonction supprimer est plutôt simple, elle fait une requête axios vers l'API pour la supprimer grâce à l'id.
Elle se supprime aussi dynamiquement du component parent Ensembletâche
