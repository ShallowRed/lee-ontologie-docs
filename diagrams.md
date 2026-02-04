```mermaid
flowchart TD

%% =========================
%% Point de départ
%% =========================
A["Je suis une entreprise prospect (entreprise privée domiciliée en France)"]
A --> B{"Comment mes coordonnées entrent-elles dans les systèmes informatiques Les Entreprises s'Engagent ?"}

%% =========================
%% Parcours 1 : auto-inscription
%% =========================
B -->|"Je m'inscris en autonomie"| C("Je saisis mon SIRET + mon mail contact dans le formulaire d'inscription")
C --> D["Je suis une entreprise inscrite"]
D --> D1((RegistrationCompleted))

%% =========================
%% Parcours 2 : saisie par un animateur
%% =========================
B -->|"Un animateur de club me renseigne"| E("L'animateur saisit mon SIRET + mon mail contact dans son espace club")
E --> E1(("ClubContactCaptured"))

E --> F("Un mail m'est envoyé proposant :<br />- de m'inscrire si possible<br />- sinon, d'être certifiée")
F --> F1(("InvitationSent (inscription + certification)"))

F --> G["Je suis une entreprise en attente de réponse sur l'inscription"]
F --> H["Je suis une entreprise en attente de réponse sur la certification"]

%% =========================
%% Décisions entreprise
%% =========================
G --> I{"Je réponds concernant l'inscription ?"}
H --> J{"Je réponds concernant la certification ?"}

%% ----- Inscription : oui/non/pas encore
I -->|"Oui, j'accepte"| K("Je m'inscris via la webapp")
K --> K1(("RegistrationCompleted"))
K --> L["Je suis une entreprise inscrite (dans la webapp)"]
L --> X(("Conséquence : la certification n'est plus bloquante / prioritaire"))

I -->|"Oui, je refuse"| M("Je refuse explicitement l'inscription")
M --> M1(("RegistrationDeclined"))
M --> N["Je suis une entreprise non inscrite (refus explicite)"]

I -->|"Pas de réponse pour l'instant"| O["Je suis une entreprise en attente de réponse sur l'inscription"]

%% ----- Certification : oui/non/pas encore
J -->|"Oui, j'accepte"| P("J'accepte d'être certifiée")
P --> P1(("CertificationAccepted"))
P --> Q["Je suis une entreprise certifiée"]

J -->|"Oui, je refuse"| R("Je refuse explicitement la certification")
R --> R1(("CertificationDeclined"))
R --> S["Je suis une entreprise non certifiée (refus explicite)"]

J -->|"Pas de réponse pour l'instant"| T["Je suis une entreprise en attente de réponse sur la certification"]

%% =========================
%% Combinaisons métiers utiles (pédagogiques)
%% =========================

%% 1) Inscrite : fin du sujet "inscription"
L --> U["Cas métier : je suis inscrite sur la webapp"]


%% =========================
%% Relances (contrôlées par règles)
%% =========================
O --> AG("Des relances d'inscription peuvent être envoyées dans une limite définie")
AG --> AG1(("ReminderSent(registration)"))
T --> AH("Des relances de certification peuvent être envoyées (dans une limite définie)")
AH --> AH1(("ReminderSent(certification)"))
```

## Table d'états “A”, liés à l’inscription à la webapp

## Diagramme d’états “A”
```mermaid
stateDiagram-v2
    [*] --> NoInvite

    NoInvite --> Invited: proposeInscription / InvitationSent(registration)
    Invited --> Registered: RegistrationCompleted
    Invited --> RegRefused: RegistrationDeclined

    %% Relances (boucle contrôlée par règles: max N, délai, etc.)
    Invited --> Invited: ReminderSent(registration)

    %% Retours arrière (optionnel)
    Registered --> Unregistered: UnsubscribeWebapp
    Unregistered --> Invited: proposeInscription / InvitationSent(registration)

    %% État terminal de refus explicite
    RegRefused --> RegRefused: (no-op)
```

## Table d'états “B”, liés à la “certification”
```mermaid
stateDiagram-v2
    [*] --> NotProposed

    NotProposed --> Proposed: proposeCertification / InvitationSent(certification)
    Proposed --> Certified: CertificationAccepted
    Proposed --> CertRefused: CertificationDeclined

    %% Relances certification si vous le décidez
    Proposed --> Proposed: ReminderSent(certification)

    %% Retrait (recommandé)
    Certified --> Withdrawn: CertificationWithdrawn
    Withdrawn --> Proposed: proposeCertification / InvitationSent(certification)

    CertRefused --> CertRefused: (no-op)
```

## États liés à l'inscription (A)

| Clé état (tech) | Cas métier | Implications principales |
|-----------------|------------|--------------------------|
| NoInvite | L'entreprise n'a pas été invitée à s'inscrire à la webapp | |
| Invited | Un email a été envoyé à l'entreprise lui proposant de s'inscrire sur la webapp. Elle n'a pas encore répondu. | Relances d'inscription possibles. |
| Registered | L'entreprise a créé un compte et est inscrite sur la webapp. | Pas de relances, accès au service. |
| RegRefused | L'entreprise a explicitement refusé de s'inscrire sur la webapp | Ne pas relancer sur l'inscription. |
| Unregistered | L'entreprise était inscrite mais a supprimé ou désactivé son compte. | À cadrer : modalités d'invitations nouvelles |

## États liés à la certification (B)

| Clé état (tech) | Cas métier | Implications principales |
|-----------------|------------|--------------------------|
| NotProposed | La certification n'a pas encore été proposée à l'entreprise. | |
| Proposed | Un email a été envoyé proposant à l'entreprise d'être certifiée. Elle n'a pas encore répondu. | Relances de certification possibles. |
| Certified | L'entreprise a accepté d'être certifiée et reconnue comme membre actif de la communauté. | Comptabilisée comme membre. |
| CertRefused | L'entreprise a explicitement refusé la certification. | Ne plus relancer sur la certification. |
| Withdrawn | L'entreprise était certifiée mais a retiré son accord (ou a été retirée). | Ne plus la compter comme certifiée. |

## Combinaisons des états (inscription × certification)

| État "inscription" | État "certification" | Cas métier |
|-------------------|---------------------|------------|
| A0 NoInvite | B0 NotProposed | Prospect |
| A1 Invited | B1 Proposed | Entreprise invitée, en attente de réponses (inscription + certif). Cas typique "saisie par un animateur de club" |
| A2 Registered | * (n'importe) | Entreprise inscrite (webapp). La certification n'a pas d'importance |
| A3 RegRefused | B2 Certified | Entreprise "certifiée non inscrite", ne pas relancer sur l'inscription |
| A1 Invited | B2 Certified | Entreprise "certifiée", inscription pas encore refusée, relances possibles sur l'inscription |
| A3 RegRefused | B3 CertRefused | Entreprise "en dehors/hermétique", refus des deux, ne plus contacter |
| A1 Invited | B3 CertRefused | Entreprise ayant refusé la certification, inscription pas refusée explicitement mais très probable |
| A0 NoInvite | B2 Certified | Cas pas censé arrivé |

## Événements principaux

| Clé événement (tech) | Libellé | Source principale |
|---------------------|---------|-------------------|
| ClubContactCaptured | Les coordonnées d'une entreprise ont été saisies par un animateur de club | Animateur de club |
| InvitationSent | Un email proposant l'inscription et/ou la certification a été envoyé | Système |
| ReminderSent(registration) | Une relance concernant l'inscription a été envoyée | Système |
| ReminderSent(certification) | Une relance concernant la certification a été envoyée | Système |
| RegistrationCompleted | L'entreprise s'est inscrite sur la webapp | Entreprise |
| RegistrationDeclined | L'entreprise a explicitement refusé l'inscription | Entreprise |
| CertificationAccepted | L'entreprise a accepté d'être certifiée | Entreprise |
| CertificationDeclined | L'entreprise a explicitement refusé la certification | Entreprise |
| UnsubscribeWebapp | L'entreprise s'est désinscrite de la webapp | Entreprise |
| CertificationWithdrawn | La certification de l'entreprise a été retirée ou annulée | Entreprise / Admin |
| ReminderStopped (optionnel) | Les relances ont été arrêtées pour cette entreprise | Système |
