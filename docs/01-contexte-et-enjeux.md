# Contexte et enjeux

## État des lieux

### Les acteurs de la plateforme

La plateforme distingue plusieurs types d'acteurs, chacun disposant d'un espace dédié et d'un rôle spécifique (voir **[Glossaire](./03-glossaire.md)** pour les définitions détaillées) :

- **Entreprise membre** : Acteur central, entité légale (SIRET). (Code: `Members`)
- **Organisation professionnelle** : Fédération ou branche représentant un secteur. (Code: `OrgaPro`)
- **Club territorial** : Structure d'animation locale. (Code: `Club`)
- **Équipe nationale** : Administrateurs globaux.
- **Bureau des entreprises** : Structure de mise en relation locale.

### La structure du référentiel

Le référentiel actuel des engagements s'organise selon une hiérarchie à quatre niveaux :

- **Thématique** (ex : Inclusion, Environnement)
- **Sous-thématique** (niveau intermédiaire souvent redondant)
- **Engagement** (l'action unitaire)
- **Objectif** (quantification optionnelle)

Cette structure est gérée conjointement dans Hygraph (contenu éditorial) et Prisma (données relationnelles), avec des nommages différents entre les deux systèmes.

### Les relations entre entreprises

Le système gère des relations de groupe entre entreprises :

- Un **Siège** peut inviter et gérer l'inscription de ses **Filiales**
- Un **Groupe** nomme l'ensemble constitué du siège et de ses filiales
- Ces relations sont modélisées par l'entité `InvitationFiliale`

### Les sources de données

Plusieurs systèmes coexistent et utilisent parfois des vocabulaires différents :

- **Hygraph** : structure des engagements et contenu éditorial
- **Prisma** : données des entreprises, déclarations, bilans
- **API Sirene** : données d'établissement (cache local)
- **Salesforce** : CRM avec son propre vocabulaire (Account, Lead...)
- **Metabase** : reporting analytique avec ses propres conventions

## Tensions identifiées

### Polysémie critique

Le terme **"engagement"** est utilisé dans au moins quatre contextes sémantiques différents, créant une confusion majeure dans les échanges et le code :

- **Comme promesse** : "L'entreprise prend des engagements" (intention future)
- **Comme état** : "Entreprise engagée" (participation présente)
- **Comme entité** : Un enregistrement dans la base de données
- **Comme réalisation** : "Engagement tenu" (accomplissement passé)

D'autres termes présentent des ambiguïtés similaires :

- **"Membre"** peut désigner l'entreprise inscrite, la Personne contact, ou l'adhérent d'un club
- **"Contact"** peut être une personne, une demande, ou un prospect
- **"Action"** est utilisé à la fois pour les catégories Hygraph et le contenu éditorial

### Profondeur excessive du référentiel

La volonté de créer quatre "axes" (Travailler autrement, Recruter autrement, etc.) sans autre ménage créerait un cinquième niveau dans la hiérarchie, rendant la structure trop profonde et difficile à naviguer.

### Statuts implicites

Les états d'une entreprise ne sont pas modélisés explicitement :

- **L'inscription** est déduite de la présence d'une date d'inscription
- **La certification** n'est pas clairement distinguée dans le modèle
- Les transitions d'état ne sont pas traçables

### Absence de versionnement

Le référentiel évolue au fil du temps, mais sans gestion formelle des versions/

## Contraintes à respecter

### Contraintes métier

- **Annualisation** : le système doit permettre de gérer des déclarations et bilans par année civile
- **Continuité de service** : les entreprises inscrites ne doivent pas perdre leurs données
- **Clubs territoriaux** : les animateurs doivent pouvoir continuer à saisir des prospects
- **Certification** : la distinction entre inscription technique et reconnaissance métier doit être claire

### Contraintes techniques

- **Hygraph** reste le CMS pour le contenu éditorial
- **Prisma** reste l'ORM pour les données relationnelles
- **Salesforce** reste le CRM de référence pour la relation entreprise
- Les exports Metabase existants doivent rester fonctionnels

## Points de vigilance externes

L'objectif reste d'unifier le vocabulaire autant que possible. Cependant, certains contextes ont des conventions propres qu'il serait coûteux de modifier :

- **Salesforce** : Account, Lead, Opportunity (vocabulaire CRM standard)
- **Metabase** : FactInscriptionMembre, DimEngagement (conventions analytiques)
- **Clubs territoriaux** : vocabulaire oral des animateurs ("adhérent", "prospect")
- **Communication externe** : le terme "engagé" a une valeur marketing à préserver

### Chantier context mapping

Pour ces cas résiduels, documenter explicitement les correspondances :

1. **Lister les divergences** : quels termes diffèrent selon le contexte
2. **Créer une table de correspondance** : webapp ↔ Salesforce ↔ Metabase
3. **Définir le vocabulaire pivot** : celui utilisé dans les échanges entre équipes

> Voir [Nuance : accepter la polysémie résiduelle](./02-proposition-ontologique.md#nuance--accepter-la-polysémie-résiduelle) pour les principes.

*Suite : [Proposition ontologique](./02-proposition-ontologique.md)*
