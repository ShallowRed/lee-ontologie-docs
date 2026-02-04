# Glossaire unifié

> Définitions précises et univoques des termes métier de la plateforme.

Ce glossaire constitue la référence partagée pour tous les échanges concernant la plateforme. Chaque terme y est défini de manière univoque.

**Convention de lecture**

- 🔵 Terme ou concept existant dans le système actuel
- 🟢 Terme ou concept proposé dans le cadre de la refonte


## Types d'acteurs

### 🔵 Entreprise membre

Entité légale identifiée par un SIRET, représentant une entreprise inscrite sur la plateforme. C'est l'acteur central du dispositif.

*Entité Prisma : `Members`*
*Espace dédié : `/espace-membre/`*

Ne pas utiliser "membre" seul (terme réservé aux Organisations Professionnelles).


### 🔵 Organisation professionnelle

Fédération, branche professionnelle, réseau ou association représentant un groupement d'entreprises d'un même secteur.

*Entité Prisma : `OrgaPro`*
*Espace dédié : `/espace-organisation-professionnelle/`*

Ne pas utiliser "organisation" seul.


### 🔵 Club territorial

Structure départementale animant la communauté localement. Chaque club est animé par un ou plusieurs Animateurs Club.

*Entité Prisma : `Club`*
*Espace dédié : `/espace-club/`*


### 🔵 Animateur club

Personne physique responsable de l'animation d'un Club territorial. Dispose d'un accès à l'espace club pour saisir des prospects et suivre les entreprises du territoire.

*Entité Prisma : `ClubCompte`*


### 🔵 Équipe nationale

Administrateurs de la plateforme disposant d'un accès aux outils de pilotage, synchronisation et gestion globale.

*Espace dédié : `/espace-equipe-nationale/`*


### 🔵 Bureau des entreprises

Structure de mise en relation entre demandeurs d'emploi et entreprises, basée sur des codes métiers (ROME) et des localisations géographiques.

*Entité Prisma : `BureauDesEntreprises`*
*Espace dédié : `/espace-bde/`*


## Personnes et comptes

### 🔵 Compte utilisateur

Utilisateur authentifié de la plateforme, identifié par son adresse email. Un même compte peut être lié à plusieurs entités (entreprise, Organisation professionnelle, club).

*Entité Prisma : `Compte`*


### 🔵 Personne contact

Lien entre un Compte utilisateur et une Entreprise membre. Représente le rôle d'une personne physique au sein d'une entreprise.

*Entité Prisma : `Contact`*

Ne pas utiliser "contact" seul, qui est ambigu (personne, demande, prospect).


## Structures de groupe

### 🔵 Groupe d'entreprises

Ensemble nommé regroupant une Entreprise siège et ses Entreprises filiales sous une même entité de gestion.

*Entité Prisma : `Groupe`*


### 🔵 Entreprise siège

Entreprise membre tête de groupe, ayant la capacité d'inviter et de gérer l'inscription de ses filiales.


### 🔵 Entreprise filiale

Entreprise membre rattachée à une Entreprise siège, ayant accepté une invitation de rattachement.

*Relation modélisée par : `InvitationFiliale`*


## Hiérarchie du référentiel

### 🟢 Référentiel annuel

Ensemble structuré et versionné des Items qu'une entreprise peut promettre pour une année donnée. Chaque année dispose de son propre référentiel.

*Concept proposé, n'existe pas explicitement dans le système actuel*


### 🟢 Axe

Orientation stratégique de premier niveau regroupant plusieurs Thématiques selon une vision commune. Correspond aux "quatre axes" en cours de définition.

*Exemples : "Travailler autrement", "Recruter autrement", "Former autrement", "Entreprendre autrement"*


### 🔵 Thématique

Catégorie regroupant des Items liés à un même domaine d'action. Concept existant, conservé dans la nouvelle structure.

*Entité Prisma : `Thematique`*
*Entité Hygraph : `ActionsCategory`*

*Exemples : "Sobriété énergétique", "Inclusion des jeunes", "Égalité professionnelle"*


### 🔵 Sous-thématique

Niveau intermédiaire entre Thématique et Item. Concept existant, supprimé dans la nouvelle ontologie (fusion ou promotion en Thématique).

*Entité Prisma : `SousThematique`*
*Entité Hygraph : `SubActionsCategory`*


### 🟢 Item

Élément atomique du référentiel qu'une Entreprise membre peut choisir de promettre. Remplace les termes "Engagement" (Prisma) et "SubCommitment" (Hygraph).

*Exemples : "Accueillir des stagiaires de 3ème", "Réduire la consommation énergétique de 20%", "Atteindre 6% de BOETH"*

Ne pas confondre avec Promesse (la déclaration d'une entreprise) ou Réalisation (l'accomplissement).


## Cycle promesse-réalisation

### 🟢 Promesse

Déclaration d'intention d'une Entreprise membre sur un Item du référentiel pour une année donnée. Peut être accompagnée d'un Objectif chiffré.

Remplace la notion actuelle d'"engagement pris" ou de "déclaration d'engagement".

*Actuel : stocké dans `MemberCommitment.engagementIds`*


### 🔵 Objectif chiffré

Valeur quantitative associée à une Promesse, représentant l'ambition mesurable de l'entreprise sur cet Item.

*Entité Hygraph : `Objective`*

*Exemple : "Recruter 50 alternants", "Réduire de 20% la consommation"*


### 🟢 Réalisation

Accomplissement effectif d'une Promesse, déclaré lors du bilan annuel. Peut inclure une valeur réalisée si un Objectif chiffré était défini.

Remplace la notion actuelle d'"engagement réalisé".


### 🔵 Bilan Annuel

Déclaration annuelle regroupant les Réalisations d'une Entreprise membre pour une année donnée.

*Entité Prisma : `Bilan`*


## États d'appartenance

### 🟢 Statut d'Inscription

État de présence d'une Entreprise membre sur la webapp. Cinq valeurs possibles :

- **Non invitée** : l'entreprise n'a jamais été invitée
- **Invitée** : une invitation a été envoyée, en attente de réponse
- **Inscrite** : l'entreprise a créé un compte et accède à la webapp
- **Refusée** : l'entreprise a explicitement décliné l'inscription
- **Désinscrite** : l'entreprise était inscrite mais a supprimé son compte

*Actuellement déduit implicitement de la présence de certaines données*


### 🟢 Statut de Certification

Reconnaissance officielle d'une Entreprise membre comme membre actif de la communauté. Cinq valeurs possibles :

- **Non proposée** : la certification n'a pas été proposée
- **Proposée** : une proposition de certification a été envoyée
- **Certifiée** : l'entreprise est reconnue comme membre actif
- **Refusée** : l'entreprise a décliné la certification
- **Retirée** : la certification a été retirée

*Concept non explicite dans le modèle actuel*


### 🔵 Adhésion Club

Lien entre une Entreprise membre et un Club territorial, matérialisant l'appartenance de l'entreprise au réseau local.

*Entité Prisma : `MembreClub`*


## Termes à éviter

### ❌ "Engagement" (utilisé seul)

**Problème** : terme polysémique désignant au moins quatre concepts différents.

**Utiliser à la place** :

- **Item** pour l'entrée du catalogue
- **Promesse** pour la déclaration d'intention
- **Réalisation** pour l'accomplissement
- **Certification** pour l'état de participation


### ❌ "Membre" (utilisé seul)

**Problème** : ambigu entre l'entreprise et la personne.

**Utiliser à la place** :

- **Entreprise membre** pour l'entité `Members`
- **Entreprise inscrite** pour le statut technique
- **Entreprise certifiée** pour le statut métier
- **Personne contact** pour la personne physique


### ❌ "Contact" (utilisé seul)

**Problème** : ambigu entre personne, demande ou prospect.

**Utiliser à la place** :

- **Personne contact** pour un individu représentant une entité
- **Demande de contact** pour une sollicitation entrante


### ❌ "Action" (utilisé seul)

**Problème** : confondu avec `ActionsCategory` (Hygraph) et `ActionEngagement` (Prisma).

**Utiliser à la place** :

- **Item** pour l'élément du référentiel
- **Thématique** pour la catégorie
- **Contenu éditorial** pour les informations associées


## Correspondances terminologiques

### Prisma actuel → Nouvelle terminologie

- `Members` → Entreprise membre
- `MemberCommitment` → Promesse (relation)
- `Thematique` → Thématique (conservé)
- `SousThematique` → (supprimé, fusionné)
- `Engagement` → Item
- `Bilan` → Bilan Annuel

### Hygraph actuel → Nouvelle terminologie

- `ActionsCategory` → Thématique
- `SubActionsCategory` → (supprimé, fusionné)
- `SubCommitment` → Item
- `Objective` → Objectif chiffré

### Interface actuelle → Nouvelle formulation

- "Les entreprises engagées" → "Les entreprises de la Communauté"
- "Prenez vos engagements" → "Déclarez vos promesses"
- "Engagement tenu" → "Promesse réalisée"
- "Vous êtes membre" → "Votre entreprise est inscrite"


*Suite : [Cycles de vie](./04-cycles-de-vie.md)*
