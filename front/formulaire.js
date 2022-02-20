function onPern() {
  var formulaire = {
    nom: formu.nom.value,
    adresse: formu.adresse.value,
  };
  var tab = [];
  tab.push(formulaire.nom);
  tab.push(formulaire.adresse);
  alert(tab);
  return tab;
}
