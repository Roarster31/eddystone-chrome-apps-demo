(() => {
  'use strict';

  let current_adv;
  let updateCurrentAdvertisement = (id) => {
    if (id.length == 0 && current_adv) {
      console.log('unregistering');
      current_adv.unregisterAdvertisement().then(() => {
        console.log('Advertisement unregistered successfully.');
      }).catch(error => console.log(error.message));
      current_adv = undefined;
    } else {
      console.log('updating id to', id);
      let new_adv = {
        type: 'url',
        url: ('jeeves://'+id),
        advertisedTxPower: -100
      };
      if (eddystone.advertisements.length === 0) {
        eddystone.registerAdvertisement(new_adv)
          .then(adv => current_adv = adv);
        return;
      }
      // unregister existing ads
      if (current_adv) {
        current_adv.unregisterAdvertisement()
          .then(() => eddystone.registerAdvertisement(new_adv))
          .then(adv => current_adv = adv);
      }
    }
  };

  let idInput  = document.getElementById("id_input");
  idInput.addEventListener("input", function () {
      updateCurrentAdvertisement(idInput.value);
  }, false);
})();
