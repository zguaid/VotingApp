# Alyra - Parcours Développeur.se Blockchain

📌  Créer une Dapps de vote construite autour du smart contract voting_contract

## Contributeurs

- [Ayoub ZGUAID](https://github.com/zguaid)

## Guide d'utilisation

Vous trouverez une vidéo de présentation du projet sur l'URL suivant : [Vidéo de démo](https://www.loom.com/share/d7b146006ef745158b6b08a83e629188)

Vous trouverez une version Vercel en ligne [Version en ligne](https://voting-qyck1gxrh-zguaid.vercel.app/)

## Démarrage

Les instructions suivantes vous permettrons d'installer le projet :
- Cloner le projet avec ligne de commande suivante : 
```npm clone https://github.com/zguaid/VotingApp```
- Installer les dépendances de test et de solidity, dans le dossier racince du projet : 
```npm install ```
- Installer les dépendances react, dans le dossier client du projet : 
```npm install```
- Lancer le déploiement de la Dapps, modifiez le fichier truffle-config.js avec le network approprié
- Pour déployer hors ganache, pensez à renseigner dans un fichier .env les variables environnement suivante :
```MNEMONIC```
```INFURA_ID```
- Lancez ensuite la migration avec la commande : 
```truffle migrate --network 'votre network'```
- Lancer le client : 
```npm run start```
- Rendez-vous sur votre http://localhost:3000/ pour interagir avec votre contrat

### Visual Studio Code  🖥️

### Langage : Solidy, JS

### Framework : Truffle unbox React 

### Network : Ganache, Goerli
